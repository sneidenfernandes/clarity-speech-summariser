import React from 'react';
import useDelete from '../context/deleteContext';
import SmallLogo from './SmallLogo';

interface DeletePopUpInput {
 fetchNotes: () => Promise<void>;
}

const DeletePopUp = ({ fetchNotes }: DeletePopUpInput) => {
    const { handleDelete, closePopUp } = useDelete();

    const handleDeleteRequest = async () => {
        handleDelete();
        await fetchNotes();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-70 backdrop-blur-sm z-50">
            <div className="w-full max-w-md mx-4 bg-zinc-700 border border-zinc-600 rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col items-center p-6 space-y-6">
                    <div className="-mt-2">
                        <SmallLogo />
                    </div>
                    
                    <div className="text-center">
                        <p className="text-gray-200 font-medium text-lg">
                            Are you sure you want to delete this note?
                        </p>
                        <p className="text-gray-200 mt-2 text-sm">
                            This action cannot be undone.
                        </p>
                    </div>

                    <div className="flex justify-center space-x-4 w-full">
                        <button 
                            onClick={closePopUp}
                            className="px-6 py-2 text-sm font-medium text-gray-200 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors duration-200"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={handleDeleteRequest}
                            className="px-6 py-2 text-sm font-medium text-white bg-red-900 hover:bg-red-800 rounded-lg transition-colors duration-200"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeletePopUp;