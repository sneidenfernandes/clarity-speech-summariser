"use client";

import { useEffect, useState } from "react";
import SmallLogo from "./SmallLogo";
import useRecorder,{RecordingState} from "../context/recorderContext";



interface LoadingInput {
    loginPage: boolean,
    fetchNotes?: () => Promise<void>
}



export default function ProcessingView({loginPage,fetchNotes}: LoadingInput){
    const [size, setSize] = useState<number>(200)

    const {setRecordingState, state, isPending} = useRecorder();

    useEffect(()=> {
        const updateSize = () => {
            
            if(window.matchMedia(("min-width:640px")).matches){
                setSize(80);
            }
            if(window.matchMedia(("min-width:768px")).matches){
                setSize(150);
            }
            if(window.matchMedia(("min-width:1024px")).matches){
                setSize(200);
            } 
        }

        window.addEventListener("resize", updateSize)
        return window.removeEventListener("resize", updateSize);

    });


    useEffect(()=>{


       
       if(!isPending){
            if(loginPage){
                setTimeout(()=>{
                    setRecordingState(RecordingState.COMPLETE);
                },8000)
            }else{
                setTimeout(()=>{
                    setRecordingState(RecordingState.IDLE);
                },8000) 
                fetchNotes?.();
            }
            

       }
       
    },[isPending]);
    
    
    const centerPosition = size * 0.45; // 36/80 ratio from original
    const initialSize = size * 0.1;
    const color = "white";

    return <div className={` flex flex-col items-center  ${loginPage ? "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2": "mt-[20vh]"}`} >
                {<div className={`h-[60vh] md:h-[50vh] w-[90vw] md:w-[60vw] lg:w-[40vw] flex flex-col  shadow-md border-gray-700 rounded-xl bg-zinc-800`}>
                    <SmallLogo />
                    <div className="text-xs text-zinc-400 w-full flex justify-center ">
                        This will take a few seconds
                    </div>
                    <div className="text-4xl text-zinc-400   w-full flex justify-center ">
                        . . . 
                    </div>
                    <div className="w-full flex justify-center py-4 object-fit">
                    <div className="lds-ripple lg:mt-8">
                        <div></div>
                        <div></div>

                        <style jsx>{`
                            .lds-ripple,
                            .lds-ripple div {
                            box-sizing: border-box;
                            }
                            .lds-ripple {
                            display: inline-block;
                            position: relative;
                            width: ${size}px;
                            height: ${size}px;
                            }
                            .lds-ripple div {
                            position: absolute;
                            border: 4px solid ${color};
                            opacity: 1;
                            border-radius: 50%;
                            animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
                            }
                            .lds-ripple div:nth-child(2) {
                            animation-delay: 0.70s;
                            }
                            @keyframes lds-ripple {
                            0% {
                                top: ${centerPosition}px;
                                left: ${centerPosition}px;
                                width: ${initialSize}px;
                                height: ${initialSize}px;
                                opacity: 0;
                            }
                            4.9% {
                                top: ${centerPosition}px;
                                left: ${centerPosition}px;
                                width: ${initialSize}px;
                                height: ${initialSize}px;
                                opacity: 0;
                            }
                            5% {
                                top: ${centerPosition}px;
                                left: ${centerPosition}px;
                                width: ${initialSize}px;
                                height: ${initialSize}px;
                                opacity: 1;
                            }
                            100% {
                                top: 0;
                                left: 0;
                                width: ${size}px;
                                height: ${size}px;
                                opacity: 0;
                            }
                            }
                        `}</style>
                    </div>
                    </div>
                    </div> 
                        }
            </div>
}