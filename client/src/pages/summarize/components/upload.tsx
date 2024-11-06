import React, { useState } from 'react';
import { RiFolderUploadFill } from "react-icons/ri";

interface UploadProps {
    onClose: () => void;
}

export function Upload({ onClose }: UploadProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsDragging(false);
        const droppedFiles = event.dataTransfer.files;
        if (droppedFiles && droppedFiles.length > 0) {
            setFile(droppedFiles[0]);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files ? event.target.files[0] : null;
        setFile(selectedFile);
    };

    return (
        <div className='fixed inset-0 bg-gray-800 bg-opacity-85 flex items-center justify-center z-50'>
            <div className='bg-white rounded-lg p-8 max-w-md mx-auto shadow-lg relative w-full md:max-w-lg'>
                <button 
                    onClick={onClose}
                    className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
                >
                    ✕
                </button>
                <h2 className='text-lg text-textPrimary font-bold mb-0'>Media Upload</h2>
                <h3 className='text-gray-300 font-semibold mb-4 mt-0'>Add your documents here</h3>
                <div
                    className={`border-2 rounded-lg p-4 flex flex-col items-center justify-center ${
                        isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                    }`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    <RiFolderUploadFill className='h-8 w-8 text-colorPrimary mb-2' /> 
                    {file ? (
                        <p className='text-center text-gray-700'>{file.name}</p>
                    ) : (
                        <p className='text-center text-gray-400'>Drag your file(s) to start uploading</p>
                    )}
                    
                    <div className='flex items-center my-4 w-full'>
                        <hr className='border-gray-300 flex-grow' />
                        <span className='mx-2 text-gray-500'>OR</span>
                        <hr className='border-gray-300 flex-grow' />
                    </div>

                    <input
                        type='file'
                        accept='audio/*'
                        onChange={handleFileChange}
                        className='hidden' 
                        id='file-upload' 
                    />
                    <label
                        htmlFor='file-upload' 
                        className='mt-4 px-3 py-1 border-2 border-colorPrimary bg-primary text-colorPrimary rounded hover:bg-colorPrimary hover:text-primary cursor-pointer'
                    >
                        Browser File
                    </label>
                </div>
                <div className='flex justify-end'>
                    <button className='mt-6 px-4 py-2 bg-colorPrimary text-white rounded hover:bg-primary hover:text-colorPrimary hover:border hover:border-colorPrimary'>
                        Upload
                    </button>
                </div>
            </div>
        </div>
    );
}
