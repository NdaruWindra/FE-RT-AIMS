import { useState } from 'react'
import { PiUploadBold } from 'react-icons/pi'

import 'flag-icons/css/flag-icons.min.css'
import { Upload } from './components/upload'
import { Summarize } from './components/summarize'
import { Button } from '@/components/ui/button'
import { useAppSelector } from '@/hooks/use-redux'
import { Separator } from '@/components/ui/separator'

function Index() {
  const [selectedLanguage, setSelectedLanguage] = useState('id')
  const [showUpload, setShowUpload] = useState(false)
  const history = useAppSelector((state) => state.history)

  function handleLanguageChange(e: any) {
    setSelectedLanguage(e.currentTarget.value)
  }

  function handleCloseUpload() {
    setShowUpload(false)
  }

  function handleUploadClick() {
    setShowUpload(true)
  }

  return (
    <div className='container mt-5 space-y-5'>
      <section className='flex justify-between'>
        <h1 className='text-2xl font-bold md:text-3xl'>Summarize Meeting AI</h1>
        <Button
          className=' bg-colorPrimary font-semibold text-white dark:hover:text-textPrimary md:flex'
          onClick={handleUploadClick}
          disabled={history.isLoading}
        >
          Upload File
          <PiUploadBold />
        </Button>
      </section>

      <Separator />
      {showUpload && <Upload onClose={handleCloseUpload} />}

      <h1>Record your meeting, get instant transcribe and summary by AI</h1>

      {/* Header */}
      {/* <section className='space-y-5 lg:w-1/2'>
        <div className='flex space-x-4'>
          <span className={`fi fi-${selectedLanguage} text-2xl`} />
          <select
            className='w-full rounded-lg p-3 font-semibold text-textPrimary hover:bg-colorPrimary hover:text-primary md:w-auto'
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            <option value='gb'>English Language</option>
            <option value='id'>Indonesia Language</option>
            <option value='other'>Other Languages Soon</option>
          </select>
        </div>
      </section> */}

      {/* Record Audio */}
      <section>
        <Summarize />
      </section>
    </div>
  )
}

export default Index
