"use client";

import { useEffect, useState} from "react";
import CancelView from "./CancelView";
import useRecorder from "../context/recorderContext";
import { RecordingState } from "../context/recorderContext";
import PermissionPopUp from "./PermissionPopUp";
import RecordingStateView from "./RecordingStateView";
import { get } from "http";
import SmallLogo from "./SmallLogo";

interface RecordingViewInputs {
    login: boolean
}




export default function RecordingView({login}:RecordingViewInputs){

    const [cancelPopUp, setCancelPopUp] = useState<boolean>(false);

    const {setRecordingState, getMicrophonePermission, permission, stopRecording, recordingState} = useRecorder();
    

    useEffect(()=>{
        getMicrophonePermission();
        setTimeout(()=>{
            if(recordingState !== RecordingState.RECORDING){
                stopRecording();
            }
        },3000);
    },[]);
   
    
    const handleCancel = () => {
        setCancelPopUp(true);
    }
    
    const handleYesButton = () => {
        stopRecording();
        setRecordingState(RecordingState.IDLE);
        setCancelPopUp(false);
    }

    const handleNoButton = () => {
        setCancelPopUp(false);
    }


    return  <div className={`flex flex-col items-center ${login && "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`} >

                {!permission && <PermissionPopUp/>}
                {(permission &&  RecordingState.RECORDING && !cancelPopUp) &&  <RecordingStateView handleCancel={handleCancel}/>}
                {(permission &&  RecordingState.RECORDING &&  cancelPopUp)  && <CancelView handleNoButton={handleNoButton} handleYesButton={handleYesButton} /> }   
            </div>
}