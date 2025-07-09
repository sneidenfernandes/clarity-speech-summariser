import React from 'react'
import SmallLogo from './SmallLogo'

const PermissionPopUp = () => {

  return (
    <div className='bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-950 flex flex-col w-[90vw] md:w-[60vw] lg:w-[40vw] h-[50vh] justify-center items-center rounded-xl border-neutral-800 border-[1px]'>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic-icon lucide-mic mb-10 opacity-90"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            <p className='text-sm md:text-md font-semibold text-zinc-300'>Make sure you grant access to your Microphone.</p> 
    </div>
  )
}

export default PermissionPopUp;
