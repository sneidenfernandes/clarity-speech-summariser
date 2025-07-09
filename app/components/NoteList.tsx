
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

                return <div className="flex justify-center  mt-20 ">
                            <div className="flex flex-col">
                                <EmptyStateIcon/>
                                <p className="text-md  md:text-xl  font-roboto font-light opacity-40 text-shadow-xl flex text-neutral-300 justify-start  ">
                                You have no saved reflections
                                </p>
                            </div>
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




const EmptyStateIcon = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="md:ml-5 text-neutral-600"
  >
    <rect x="60" y="70" width="80" height="60" rx="8" fill="#E0E0E0" />
    <rect x="70" y="85" width="60" height="8" rx="4" fill="#FFFFFF" opacity="0.7" />
    <rect x="70" y="100" width="40" height="8" rx="4" fill="#FFFFFF" opacity="0.7" />
  </svg>
);