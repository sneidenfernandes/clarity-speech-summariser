import Logo from "./Logo"
import Subheading from "./SubHeading"
import Illustration from "./Illustration"
import GButton from "./GButton"
import Divider from "./Divider"
import RecordButton from "./RecordButton"
import { RecordingState } from "../context/recorderContext"
import useRecorder from "../context/recorderContext"
import {motion} from "motion/react"



export default function LandingView(){

    const { setRecordingState} = useRecorder();

    const StartRecord = () => {
        setRecordingState(RecordingState.RECORDING)
    }


    return <div className="flex flex-col items-center">
            <motion.div 
              initial={{ opacity: 0, y: -50 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,

              }}
            >
              <Logo/>   
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 100 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.5,

              }}
            >
                <Subheading/> 
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -100 }} 
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.7,
                delay: 2,

              }}
            >
               <Illustration/>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0}} 
              animate={{ opacity: 1}}
              transition={{
                duration: 1,
                delay: 3.5,

              }}
              className="flex flex-col items-center"
            >
              <GButton/>
              
            </motion.div>

            <motion.div 
              initial={{ opacity: 0}} 
              animate={{ opacity: 1}}
              transition={{
                duration: 1.5,
                delay: 5,

              }}
              className="flex flex-col items-center"
            >
               <Divider/>
              <div className="relative text-slate-50 text-sm opacity-70 mb-7 italic">
                Get the gist.
              </div>
              <div className=" animate-bounce mb-8 opacity-70">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="white" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                  </svg>
              </div>
            <RecordButton onClick={StartRecord}/>
              
            </motion.div>

           
            


         
            
            
            
          </div>
}