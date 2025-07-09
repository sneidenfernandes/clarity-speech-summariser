import useRecorder from "../context/recorderContext"
import RecordButton from "./RecordButton"
import { useEffect } from "react";
import { RecordingState } from "../context/recorderContext"

interface CancelStateViewInput {
    handleYesButton:  ()  => void,
    handleNoButton:   ()  => void,
    
}

export default function CancelView({handleYesButton, handleNoButton}:CancelStateViewInput){



    const {startRecording,setRecordingState,stopRecording} = useRecorder();

    useEffect(()=>{
            startRecording();
    },[]);


    const processRecording = () => {
        stopRecording();
        setRecordingState(RecordingState.PROCESSING);
    }

 
    
    
    return <div className={`w-[90vw] md:w-[60vw] lg:w-[40vw]  border-[1px] shadow-md border-neutral-800 shadow-black/50 rounded-xl h-[50vh] flex justify-center bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950`}>
                <div className="flex flex-col justify-evenly">
                    
                    <div className="text-sm sm:text-sm md:text-lg font-roboto flex justify-center mx-[15%] text-center opacity-70 text-white font-semibold">
                        <p >
                            Are you sure you want to cancel your recording?
                        </p>
                    </div>

                    <div className="flex justify-center mt-3">
                                <RecordButton onClick={processRecording}/>
                    </div>

                    <div className="flex justify-evenly">
                    <button onClick={handleYesButton} className="px-6 py-1 bg-neutral-900 border flex gap-2 border-zinc-600  rounded-lg text-neutral-400 hover:border-zinc-600 hover:text-zinc-200 hover:shadow hover:shadow-white/10 transition-all duration-150 ease-out">Yes</button>
                    <button onClick={handleNoButton} className="px-6 py-1 bg-neutral-900 border flex gap-2 border-zinc-600  rounded-lg text-neutral-400 hover:border-zinc-600 hover:text-zinc-200 hover:shadow hover:shadow-white/10 transition-all duration-150 ease-out">No</button> 
                    </div> 
                </div>
        </div> 

}