"use client";
import useDelete from "../context/deleteContext";
import useView from "../context/viewContext";
import {motion} from "motion/react";

interface Card {
    title: string;
    summary: string;
    date: string;
    noteId: number;
}

export default function Card({ title, summary, date, noteId }: Card) {
    const { openPopUp } = useDelete();
    const { openViewPopUp, setView } = useView();

    const handleView = () => {
        setView({ title, summary, date });
        openViewPopUp();
    };

    const handleDelete = (e: React.MouseEvent) => {
        e.stopPropagation();
        openPopUp(noteId);
    };

    const formattedDate = new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <motion.div 
        whileHover={
            {scale:1.03,
             transition: {duration:0.1}   
            }
        }

        >
        <li 
            onClick={handleView}
            className="col-span-1 flex flex-col max-w-xs lg:max-w-sm bg-zinc-200 rounded-lg shadow p-5 hover:bg-slate-100 transition-all duration-200 ease-in overflow-hidden cursor-pointer"
        >
            <div className="font-roboto space-y-4 h-full flex flex-col">
                <h3 className="text-lg w-full flex justify-center my-4 font-bold text-gray-900 leading-tight opacity-80 font-serif px-2">
                    {title}
                </h3>

                <div className=" text-left flex-grow overflow-y-auto mb-5   min-h-[60px] opacity-70 px-2">
                    <p className="text-gray-000 text-xs leading-relaxed font-roboto">
                        {summary.slice(0, 185) + (summary.length > 185 ? "..." : "")}
                    </p>
                </div>

                

                <div className="flex items-center justify-between h-5 font-roboto opacity-70 mx-0">
                    <span className="text-xs text-gray-500 ">
                        {formattedDate}
                    </span>
                    <button 
                        onClick={handleDelete}
                        className="text-gray-400 hover:text-red-800 transition-colors -mr-1"
                        aria-label="Delete note"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                    </button>
                </div>
            </div>
        </li>
        </motion.div>
        
    );
}