
import { useEffect, useState } from "react";
import Card from "./Card";



interface data {
    id: number,
    summary: string, 
    title: string, 
    createdAt: string
}

export default function NoteList({list} : {list: data[] | undefined}){

    useEffect(()=>{
        
    },[list])
    
    if(list?.length === 0){

                return <div className="flex justify-center mt-20 ">
                            <p className="text-md  md:text-xl mt-20 font-roboto font-semibold opacity-40 italic text-shadow-xl flex justify-start  ">
                              You have no saved reflections
                            </p>
                      </div>
                
                    
    }
   

    return <div className="flex justify-center mt-20 ">
                <ul className="grid grid-cols-1 gap-y-6 justify-center gap-4 md:grid-cols-2 w-auto lg:grid-cols-3 p-10  lg:px-20 inset-shadow-sm inset-shadow-zinc-600/20 rounded-4xl">
                    { 
                        list?.map((note)=> <div key={note.id}>
                                <Card noteId={note.id} title={note.title} summary={note.summary} date={note.createdAt} />
                        </div>)
                    }
                </ul>
            </div>  
}