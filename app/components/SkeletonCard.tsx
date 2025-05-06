import Divider from "./Divider"
import Illustration from "./Illustration"

export default function SkeletonCard(){

    

    return <li className="col-span-1 flex flex-col justify-center min-w-xs min-h-[30vh] inset-shadow-xs inset-shadow-zinc-600/5  z-1 lg:min-w-sm text-center bg-zinc-500 rounded-lg shadow p-5 hover:bg-slate-100 transition-all duration-200 ease-in overflow-hidden">
            <div className="opacity-20 flex justify-center">
                <Illustration/>
            </div>
        </li>   
}