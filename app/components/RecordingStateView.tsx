import { useEffect } from "react"
import RecordButton from "./RecordButton"
import useRecorder from "../context/recorderContext"
import { RecordingState } from "../context/recorderContext"
import SmallLogo from "./SmallLogo"

interface RecordStateViewInput {
    handleCancel:     () => void
}

export default function RecordingStateView({handleCancel}: RecordStateViewInput){

    const {startRecording,setRecordingState,stopRecording,refresh} = useRecorder();

    useEffect(()=>{
            startRecording();
    },[]);


    const processRecording = () => {
        setRecordingState(RecordingState.PROCESSING);
        stopRecording();
        refresh();
    }

 
    
    return <div className={`w-[90vw] md:w-[60vw] lg:w-[40vw]  border-[1px] shadow-md rounded-xl h-[50vh] flex justify-center bg-zinc-800`}>
 
        <div className="flex flex-col justify-evenly">
            <SmallLogo/>
            <div className="text-xl font-roboto  flex justify-center opacity-80 text-white ">
                 <h3 className="">
                    <span className="opacity-50">Speak up!</span><span className="animate-pulse font-semibold "> I'm listening.</span> 
                </h3>
            </div>

            <p className="text-sm md:text-base flex justify-center font-roboto text-white opacity-40">
                  Press to summarize
            </p>

            <div className="flex justify-center animate-bounce">    
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="gray" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                    </svg>
            </div>
            
            <div className="flex justify-center">
                <RecordButton onClick={processRecording}/>
            </div>
            
            <div className="flex justify-center">
                <button onClick={handleCancel} className=" px-6 py-2 text-sm font-medium text-gray-200 bg-zinc-700 hover:bg-zinc-500 rounded-lg transition-colors duration-200 ease-in">Cancel</button>
            </div>
        </div>
</div> 

}