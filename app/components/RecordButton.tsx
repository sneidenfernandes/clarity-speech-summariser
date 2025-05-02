import {MouseEventHandler} from "react";
import useRecorder from "../context/recorderContext";
import { RecordingState } from "../context/recorderContext";


interface RecordButtonInput {
  onClick: () => void
}

export default function RecordButton({onClick}: RecordButtonInput){

    const {recordingState} = useRecorder();

    return <button onClick={onClick} className={`p-5 ${recordingState === RecordingState.RECORDING ? "bg-zinc-700" : "bg-zinc-600"} rounded-full shadow-lg/50  border-[0.5px] border-zinc-800 `}>
            {recordingState === RecordingState.RECORDING 
               ?
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#dee0e0" className="h-6 w-6 animate-pulse">
                    <path
                      fill="#dee0e0"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
                    />
                </svg>
                :
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="size-6">
                      <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
                      <path d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z" />
              </svg>
            }  
            </button>
}