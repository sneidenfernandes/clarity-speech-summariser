


import React from 'react'
import SmallLogo from './SmallLogo'

const PermissionPopUp = () => {

  return (
    <div className='bg-zinc-800 flex flex-col w-[90vw] md:w-[60vw] lg:w-[40vw] h-[40vh] md:h-[50vh] justify-center items-center rounded-xl'>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mic-icon lucide-mic mb-10 opacity-90"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
            <p className='text-sm font-semibold text-zinc-200'>Make sure you grant access to your Microphone.</p> 
    </div>
  )
}

export default PermissionPopUp
