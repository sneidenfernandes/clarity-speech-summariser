"use client";

import FullCard from "./FullCard";
import { useEffect, useState } from "react";
import useRecorder from "../context/recorderContext";

interface SummaryViewInput{
    loginPage: boolean;
}

export default function SummaryView({loginPage}:SummaryViewInput){
        const [title, setTitle] = useState("");
        const [summary, setSummary] = useState("");
        const {state} = useRecorder();

        useEffect(()=> {
        
          
            const transcriptArray   =     state.response?.split("\n");
            const transcriptTitle   =     transcriptArray?.[0].split(":::")[1] || "Oops!";
            const transcriptSummary =     transcriptArray?.[1].split(":::")[1] || "Something went wrong.Please try again.";
            const title             =     transcriptTitle; 
            const summary           =     transcriptSummary; 

            setTitle(title);
            setSummary(summary);

            

        },[]);

        
        const date = String(new Date);

   

    return <div className={`flex flex-col items-center`} >
                {   <div className="flex flex-col items-">
                        <FullCard title={title} summary={summary} date={date} login={loginPage}/>
                  </div> 
                }
            </div>
}