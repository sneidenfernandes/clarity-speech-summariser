"use client";
import {createContext, ReactNode, useState, useRef, useContext, Dispatch, SetStateAction, useCallback} from "react";

import transcript from "../actions/transcript/transcript";
import { useActionState } from "react";
interface ContextValue {
    recordingState: RecordingState,
    setRecordingState: Dispatch<SetStateAction<RecordingState>>,
    getMicrophonePermission: () => void,
    permission: boolean,
    startRecording: () => void,
    stopRecording:  () => void,
    state: {sender: string | null , response: string | null},
    isPending: boolean,
    refresh: () => void;
}

const RecorderContext = createContext<ContextValue | undefined>(undefined);


const mimeType = "audio/webm";

export enum RecordingState {
    IDLE,
    RECORDING,
    PROCESSING,
    COMPLETE
}

interface stateType {
    sender: string,
    response: string | null, 
    date?: string | null
}


const initialState = {
    sender: "",
    response: "",
    date: ""

}




export function RecorderContextProvider({children}: {children: ReactNode}){

    const [recordingState, setRecordingState] = useState<RecordingState>(RecordingState.IDLE);
    const [permission, setPermission] = useState<boolean>(false);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[] | []>()
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);
    const fileRef = useRef<HTMLInputElement | null>(null);
    const [state, formAction,isPending] = useActionState(transcript, initialState);



    // Uploads audio from the hidden input to the tag 
    const uploadAudio = (blob: Blob) => {
        
        const file = new File([blob], mimeType, {type: "audio/webm"});
        if(fileRef.current){
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            fileRef.current.files = dataTransfer.files;
        }

        if(buttonRef.current){
            buttonRef.current.click(); 
        }
    }

    const refresh = () => {
        setPermission(false);
        setAudioChunks([]);
        mediaRecorderRef.current = null;
        setStream(null);

    }

   // Gets microphone permission and sets permission to true
    const getMicrophonePermission = async () => {


        if("MediaRecorder" in window){
            try{
                const streamData = await window.navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: false,
                })
                setPermission(true);
                setStream(streamData);
                console.log("Microphone permission function reached.")

            }catch(e: any){
                alert(e.message)
            }

        }else {
            alert("Your browser does not support the MediaRecorder API")
        }
    };    

    
    // Start recording functionality
    const startRecording = () => {
        if(stream === null) return;

        const media = new MediaRecorder(stream, {mimeType});
        mediaRecorderRef.current = media;
        
        mediaRecorderRef.current.start();

        let localAudioChunks : Blob[] = [];
        mediaRecorderRef.current.ondataavailable = (e) => {
            localAudioChunks.push(e.data);
        }
        setAudioChunks(localAudioChunks);
        console.log("Recording Started.");

    }


    // Stop recording functionality
    const stopRecording = () => {

        if (mediaRecorderRef.current === null || stream === null) return;
        mediaRecorderRef.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, {type: mimeType})
            uploadAudio(audioBlob); 
            stream.getTracks().forEach(track => {
                track.stop()
                track.enabled = false
              })
              
        }
        mediaRecorderRef.current.stop();
        stream.getTracks().forEach(track => {
            track.stop()
            track.enabled = false
          })
            const audioContext = new AudioContext()
            audioContext.close
            const microphone = audioContext.createMediaStreamSource(stream)
            microphone.disconnect
        console.log("Stop end reached.")
        setStream(null);
        setAudioChunks([]);
    }

    
    const value  = {
        recordingState,
        setRecordingState,
        getMicrophonePermission,
        permission,
        startRecording,
        stopRecording,
        state,
        isPending,
        refresh
    }

   



    return (<RecorderContext.Provider value={value}>
            <div>
                <form action={formAction}>
                    <input type="file" hidden name="audio" ref={fileRef}/>
                    <button type="submit" hidden ref={buttonRef}></button>
                </form>
                {children}
            </div>
        </RecorderContext.Provider>)
}



export default function useRecorder(){

    const context = useContext(RecorderContext);

    if (context === undefined){
        throw new Error("Context is null")
    }

    return context;
}

