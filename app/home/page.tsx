"use client";
import { useState, useEffect, useRef } from "react";
import NoteList from "../components/NoteList";
import RecordingView from "../components/RecordingView";
import RecordButton from "../components/RecordButton";
import ProcessingView from "../components/ProcessingView";
import SkeletonView from "../components/SkeletonView";
import useDelete from "../context/deleteContext";
import DeletePopUp from "../components/DeletePopUp";
import useView from "../context/viewContext";
import FullCard from "../components/FullCard";
import SmallLogo from "../components/SmallLogo";
import useRecorder, { RecordingState } from "../context/recorderContext";
import { getSession, useSession } from "next-auth/react";





type data =  {
    id: number,
    summary: string, 
    title: string, 
    createdAt: string
} 

export default function Home(){

    const [notes, setNotes] = useState<data[]>();
  
    const {deletePopUp} = useDelete();
    const {viewPopUp, viewData} = useView();
    const {recordingState, setRecordingState} = useRecorder(); 
    const {status} = useSession();

    useEffect(() => {
      if(status !== "authenticated"){
        window.location.href = "/";
      }

      if(recordingState !== RecordingState.IDLE){
        setRecordingState(RecordingState.IDLE)
      }
      const loadData = async () => {
          await fetchNotes();
      };
      loadData();
    },[]);

     
    
      
    const fetchNotes = async () => {
      fetch("api/user")
      .then(res => res.json())
      .then(notes => setNotes(notes))
    }

    const StartRecord = () => {
        setRecordingState(RecordingState.RECORDING)
    }
    
  
    
    return <div className={`bg-zinc-500 w-full min-h-screen flex-flex-col `}>
        <div className="mt-[20vh] md:mt-[15vh] lg:mt-[10vh] -mb-15"><SmallLogo/></div>
        <div className={`${deletePopUp ? "opacity-40": ""}`}>
            {recordingState === RecordingState.IDLE         &&  <NoteList list={notes}/>}
            {recordingState === RecordingState.RECORDING    &&  <div className="mt-[20vh]"><RecordingView login={false} /></div>}
            {recordingState === RecordingState.PROCESSING   &&  <ProcessingView loginPage={false} fetchNotes={fetchNotes}/>}
           
        </div>
        {deletePopUp && <DeletePopUp fetchNotes={fetchNotes}/>}
        {viewPopUp   && <FullCard title={viewData.title} summary={viewData.summary} date={String(viewData.date)} login={false}/>}
        <div className={`${!(recordingState === RecordingState.IDLE)? 'hidden' : ''} fixed bottom-20 left-0 right-0 flex justify-center`}>
           <RecordButton  onClick={StartRecord}/>
        </div>
      
    </div>
}           