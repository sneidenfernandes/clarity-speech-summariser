
import useView from "../context/viewContext";
import { useRouter } from "next/navigation";
import SmallLogo from "./SmallLogo";
import useRecorder,{RecordingState} from "../context/recorderContext";
import { useSession } from "next-auth/react";
import {motion} from "motion/react";


interface FullCardInputs {
    title: string, 
    summary: string,
    date: string
    login: boolean
}



export default function FullCard({title, summary, date, login}: FullCardInputs) {
    const router = useRouter();
    const session = useSession();
    
    const {closeViewPopUp} = useView();
    const {setRecordingState} = useRecorder();

    


    const handleClose = () => {

        setRecordingState(RecordingState.IDLE);
        closeViewPopUp?.();
       
    }

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        
             <div className={`fixed inset-0 flex items-center justify-center bg-opacity-70 backdrop-blur-sm z-50 h-full`}>
            
            <div className={`w-[90vw] md:w-[60vw] lg:w-[40vw] bg-zinc-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden`}>
            {login && <SmallLogo/>}
                <div className="flex flex-col items-center p-6 space-y-6">
                    {/* Header with close button */}
                    <div className="flex justify-between w-full items-start">
                        <h2 className="text-md md:text-xl font-bold flex justify-center w-full px-4 text-gray-200 font-serif">
                            {title}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="w-full h-[50vh] text-sm md:text-md lg:text-lg overflow-y-auto text-gray-300 font-serif font-light px-8">
                        {summary}
                    </div>

                    {/* Footer */}
                    <div className="w-full flex justify-between items-center pt-4 border-t border-gray-700">
                        <span className="text-sm text-gray-400">
                            {formattedDate}
                        </span>
                        <button 
                            onClick={handleClose}
                            className="px-4 py-2 text-sm bg-zinc-500 hover:bg-zinc-700 text-gray-200 rounded-lg transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
       
    );
}