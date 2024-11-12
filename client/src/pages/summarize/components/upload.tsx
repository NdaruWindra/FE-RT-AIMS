import { uploadAudio } from '@/features/history/historySlice'
import { useAppDispatch } from '@/hooks/use-redux'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5'
import { RiFolderUploadFill } from 'react-icons/ri'

interface UploadProps {
  onClose: () => void
}

export function Upload({ onClose }: UploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const dispatch = useAppDispatch()

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
    const droppedFiles = event.dataTransfer.files
    if (droppedFiles && droppedFiles.length > 0) {
      setFile(droppedFiles[0])
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files ? event.target.files[0] : null
    setFile(selectedFile)
  }


  function handleOnSubmit(e: any) {
    e.preventDefault()
    if (file) {
      onClose()
      setIsLoading(true)
      dispatch(uploadAudio(file)).finally(() => {
        setIsLoading(false)
      })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-85'>
      <form
        onSubmit={handleOnSubmit}
        className='relative mx-4 w-full max-w-xs rounded-lg bg-white p-4 shadow-lg md:mx-auto md:max-w-md md:p-8'
      >
        <button
          onClick={onClose}
          className='absolute right-2 top-2 rounded-full text-gray-500 transition-all hover:bg-gray-800 hover:text-primary'
        >
          <IoClose className='h-7 w-7' />
        </button>
        <h2 className='mb-0 text-base font-bold text-textPrimary md:text-lg'>
          Media Upload
        </h2>
        <h3 className='mb-4 mt-0 text-sm font-semibold md:text-gray-300'>
          Add your documents here
        </h3>
        <div
          className={`flex flex-col items-center justify-center rounded-lg border-2 p-4 ${isDragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <RiFolderUploadFill className='mb-2 h-6 w-6 text-colorPrimary md:h-8 md:w-8' />
          {file ? (
            <p className='text-center text-sm text-gray-700 md:text-base'>
              {file.name}
            </p>
          ) : (
            <p className='text-center text-xs text-gray-400 md:text-sm'>
              Drag your file(s) to start uploading
            </p>
          )}

          <div className='my-4 flex w-full items-center'>
            <hr className='flex-grow border-gray-300' />
            <span className='mx-2 text-xs text-gray-500 md:text-sm'>OR</span>
            <hr className='flex-grow border-gray-300' />
          </div>

          <input
            type='file'
            accept='.mp3, .wav'
            onChange={handleFileChange}
            className='hidden'
            id='file-upload'
          />
          <label
            htmlFor='file-upload'
            className='mt-4 cursor-pointer rounded border-2 border-colorPrimary bg-primary px-2 py-1 text-xs text-colorPrimary hover:bg-colorPrimary hover:text-primary md:px-3 md:py-1 md:text-base'
          >
            Browser File
          </label>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='mt-4 rounded bg-colorPrimary px-3 py-1 text-xs text-white hover:border hover:border-colorPrimary hover:bg-primary hover:text-colorPrimary md:mt-6 md:px-4 md:py-2 md:text-base'
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </form>
    </div>
  )
}
