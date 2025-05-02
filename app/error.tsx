"use client";

import SmallLogo from "./components/SmallLogo";


export default function ErrorPage() {
  
  return (
    <div className="bg-zinc-600 w-full min-h-screen flex justify-center items-center">
      <div className="flex flex-col justify-center">
          <div className="opacity-50">
            <SmallLogo/>
          </div>
          <p className="text-xl font-bold w-full flex justify-center mb-[5vh] text-zinc-300 opacity-40">
              Oops! Something went wrong.
          </p>
          <button onClick={() => {window.location.href = "/home"}} className=" px-6 py-2 text-sm font-medium text-gray-200 bg-zinc-700 hover:bg-zinc-500 rounded-lg transition-colors duration-20">Home</button> 
      </div>
    </div>
  );
}