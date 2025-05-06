"use client";

import { createContext, ReactNode, useContext, useState } from "react";

// context for the delete popup
interface DeleteContextType {
    noteId: number | null;
    deletePopUp: boolean,
    openPopUp: (id: number) => void,
    closePopUp: () => void,
    handleDelete: () => void
    
}

const DeleteContext = createContext<DeleteContextType | undefined>(undefined);


export function DeleteContextProvider({children}:{children: ReactNode}){
    
    const [deletePopUp, setDeletePopUp] = useState<boolean>(false);
    const [noteId, setNoteId] = useState<number | null>(null);

    const openPopUp = (id: number) => {
        setDeletePopUp(true)
        setNoteId(id)
    }

    const closePopUp = () => {
        setDeletePopUp(false)
        setNoteId(null);
    }

    const handleDelete = async () => {
        
        closePopUp();
            
        try{
            
            const response = await fetch(`api/user/notes?id=${noteId}`, {
            method: "DELETE"
       })

    
        }catch(e){
            console.error("API request failed", e)
       }
       finally{
        window.location.reload()
       }
           
    }



    const value = {
        noteId,
        deletePopUp, 
        openPopUp,
        closePopUp,
        handleDelete
    }
    return <DeleteContext.Provider value={value}>{children}</DeleteContext.Provider>
}


export default function useDelete() {
    const context = useContext(DeleteContext);
    if (context === undefined) {
      throw new Error('useDelete must be used within a DeleteContextProvider');
    }
    return context;
  }