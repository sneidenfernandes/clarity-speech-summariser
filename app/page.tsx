"use client"
import { useEffect } from "react";
import LandingView from "./components/LandingView";
import RecordingView from "./components/RecordingView";
import SummaryView from "./components/SummaryView";
import useRecorder from "./context/recorderContext"
import { RecordingState } from "./context/recorderContext";
import ProcessingView from "./components/ProcessingView";
import { useSession } from "next-auth/react";


export default function Landing() {


  const {recordingState} = useRecorder();
  const {status} = useSession();

  useEffect(()=>{
    if(status === "authenticated"){
      window.location.href = "/home";
    }
  },[]);

  return (
    <div className="w-full min-h-screen overflow-x-auto overflow-auto bg-zinc-600 flex justify-center items-center">
        <div className="flex justify-center max-w-[90w] md:max-w-[60vw] lg:max-w-[50vw]">
            <div className="flex flex-col items-center">
              {recordingState === RecordingState.IDLE        &&   <LandingView/> }
              {recordingState === RecordingState.RECORDING   &&   <RecordingView  login={true}/>}
              {recordingState === RecordingState.PROCESSING  &&   <ProcessingView loginPage={true}/>}
              {recordingState === RecordingState.COMPLETE    &&   <SummaryView loginPage={true}/>}       
            </div>
        </div>
    </div>
  );
}
