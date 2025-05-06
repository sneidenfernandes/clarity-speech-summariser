"use client"
import { useSession } from "next-auth/react"
import { useEffect, useState, useRef } from "react";
import { signOut } from "next-auth/react";
import SmallLogo from "./SmallLogo";
import Illustration from "./Illustration";

const altpfp = "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"

export default function Navbar(){
 
    const [dropdown, setDropdown] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const {data: session, status} = useSession();

    const image = session?.user?.image || altpfp
    const name = session?.user?.name
    console.log(image);

    useEffect(()=>{

    },[status, session]);

    useEffect(()=>{
        const handleClickOutside = (event : MouseEvent) => {
                if((dropdownRef.current && !dropdownRef.current.contains(event.target as Node))&&(buttonRef.current && !buttonRef.current.contains(event.target as Node))){
                    setDropdown(false);
                }
        }

        if(dropdown){
            document.addEventListener("mousedown", handleClickOutside);
        }        


        return () => document.removeEventListener("mousedown", handleClickOutside)
    },[dropdown]);
    


    return (


<nav className="bg-zinc-600 shadow-md/10 border-gray-200 fixed w-full z-500">
  <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto px-4">
        <div>
            <svg width="180" height="80" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,100 Q30,50 50,100 T90,100 T130,100 T170,100 T210,100 T250,100" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M10,110 Q30,70 50,110 T90,110 T130,110 T170,110 T210,110 T250,110" stroke="white" fill="transparent" strokeWidth="2" />
            <path d="M10,90 Q30,40 50,90 T90,90 T130,90 T170,90 T210,90 T250,90" stroke="white" fill="transparent" strokeWidth="2" />
            <line x1="250" y1="90" x2="300" y2="95" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="250" y1="100" x2="300" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="250" y1="110" x2="300" y2="105" stroke="white" strokeWidth="2" strokeDasharray="5,5"/>
            <line x1="300" y1="100" x2="490" y2="100" stroke="white" strokeWidth="3"/>
            </svg>
        </div>
        <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
            {
                <button ref={buttonRef} onClick={()=>{setDropdown(!dropdown)}} className="w-12  h-12 mr-3">
                        <img className="rounded-xl object-fit " src={image} />
                </button >
            }
            <div  
                ref={dropdownRef} 
                className={`
                absolute 
                ${!dropdown ? "hidden " : " block  "} 
                transition-all duration-200 ease-out
                flex flex-col 
                py-3 px-3 
                border border-gray-500 shadow-lg
                top-12 right-4 
                w-48 
                rounded-lg bg-zinc-700/100`}>
                    <div className={`flex flex-col items-center transition-all duration-300`}>
                <h2 className="text-white font-roboto text-md font-semibold opacity-90 mb-2">
                    Clarity.
                </h2>
                <div className="opacity-80 -mt-4 md:-mt-5 transition-all duration-300 ">
                    <svg width="100" height="40" viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10,100 Q30,50 50,100 T90,100 T130,100 T170,100 T210,100 T250,100" stroke="white" fill="transparent" strokeWidth="2" />
                        <path d="M10,110 Q30,70 50,110 T90,110 T130,110 T170,110 T210,110 T250,110" stroke="white" fill="transparent" strokeWidth="2" />
                        <path d="M10,90 Q30,40 50,90 T90,90 T130,90 T170,90 T210,90 T250,90" stroke="white" fill="transparent" strokeWidth="2" />
                        <line x1="250" y1="90" x2="300" y2="95" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="100" x2="300" y2="100" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="250" y1="110" x2="300" y2="105" stroke="white" strokeWidth="2" strokeDasharray="5,5" />
                        <line x1="300" y1="100" x2="490" y2="100" stroke="white" strokeWidth="3" />
                    </svg>
                </div>
            </div>
                    <div className="text-xs font-roboto font-light text-zinc-200 pb-2 mb-2 border-b border-gray-500/60 w-full text-center font-semibold">
                        {`Hi, ${name}!` }
                    </div>
                    <div className="w-full px-20  border-gray-600/50"></div>

                    <button onClick={async ()=> { await signOut({callbackUrl:"/"})}} className="font-roboto rounded-md border-[1px] border-zinc-500 mt-2 py-2 text-xs font-light bg-zinc-700 text-white hover:bg-zinc-800  transition-all duration-150 ease-out">
                        Sign out
                    </button>
            </div>
        </div>
  </div>
</nav>

    )
}





