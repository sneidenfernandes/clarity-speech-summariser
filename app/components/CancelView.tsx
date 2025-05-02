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

 
    
    
    return <div className={`w-[90vw] md:w-[60vw] lg:w-[40vw]  border-[1px] shadow-md border-zinc-800 rounded-xl h-[50vh] flex justify-center bg-zinc-800`}>
                <div className="flex flex-col justify-evenly">
                    
                    <div className="text-xs sm:text-sm md:text-lg font-roboto flex justify-center mx-[15%] text-center opacity-70 text-white font-semibold">
                        <p >
                            Are you sure you want to cancel your recording?
                        </p>
                    </div>

                    <div className="flex justify-center mt-3">
                                <RecordButton onClick={processRecording}/>
                    </div>

                    <div className="flex justify-evenly">
                    <button onClick={handleYesButton} className=" px-6 py-2 text-sm font-medium text-gray-200 bg-zinc-700 hover:bg-zinc-500 rounded-lg transition-colors duration-20">Yes</button>
                    <button onClick={handleNoButton} className=" px-6 py-2 text-sm font-medium text-gray-200 bg-zinc-700 hover:bg-zinc-500 rounded-lg transition-colors duration-20">No</button> 
                    </div> 
                </div>
        </div> 

}