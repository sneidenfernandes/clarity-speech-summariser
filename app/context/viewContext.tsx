"use client";
import { Children, createContext, ReactNode, useContext } from "react";
import { useState } from "react";

const ViewContext = createContext<viewContextObject | undefined>(undefined);

interface viewInput {
    title: string,
    summary: string 
    date: Date | string
}

interface viewContextObject {
    viewData: viewInput,
    setView: ({title, summary, date}: viewInput) => void,
    viewPopUp: boolean,
    openViewPopUp: () => void,
    closeViewPopUp: () => void
}

export const VeiwContextProvider = ({children}:{children: ReactNode})  => {
    
   const [viewData, setViewData] = useState<viewInput>({
    title: "",
    summary: "",
    date: ""
   });

   const [viewPopUp, setViewPopUp] = useState(false);

   const openViewPopUp = () => {
        setViewPopUp(true);
   }

   const closeViewPopUp = () => {
        setViewData({
            title: "",
            summary: "",
            date: ""
           })
        setViewPopUp(false);
   }


   const setView = ({title, summary, date} : viewInput) => {
        setViewData({
            title: title,
            summary: summary,
            date: date
        })
   }

   const value = {viewData, setView,viewPopUp, openViewPopUp, closeViewPopUp };

   return <ViewContext.Provider value={value}>
            {children}
        </ViewContext.Provider>

}


export default function useView(){

    const context = useContext(ViewContext);

    if(context === undefined){
        throw new Error("View Context cannot be undefined")
    }

    return context;
}