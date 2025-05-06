"use client";
import { signIn } from "next-auth/react";
import {  useRouter } from "next/navigation";

export default function GButton(){

    const router = useRouter();

    const handeSignin = async () => {
        const response = await signIn("google", {callbackUrl: "/home"});
    }
        

    return <div className="flex items-center justify-center bg-zinc-600 ">
            <button onClick={handeSignin} className="px-4 py-2 bg-zinc-400 border flex gap-2 border-zinc-400  rounded-lg text-zinc-800 hover:border-zinc-700 hover:text-zinc-900 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"></img>
             <span>Login with Google</span>
            </button>
            </div>
    
}
