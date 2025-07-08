"use client";
import { signIn } from "next-auth/react";
import {  useRouter } from "next/navigation";

export default function GButton(){

    const router = useRouter();

    const handeSignin = async () => {
        const response = await signIn("google", {callbackUrl: "/home"});
    }
        

    return <div className="flex items-center justify-center bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-950">
            <button onClick={handeSignin} className="px-4 py-2 bg-neutral-900 border flex gap-2 border-neutral-800  rounded-lg text-neutral-400 hover:border-zinc-700 hover:text-zinc-200 hover:shadow transition duration-150">
            <img className="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo"></img>
             <span>Login with Google</span>
            </button>
            </div>
    
}
