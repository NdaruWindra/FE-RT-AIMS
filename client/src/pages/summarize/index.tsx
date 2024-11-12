import { useState, useRef, useEffect } from 'react'
import { PiUploadBold } from 'react-icons/pi'
import { FaMicrophone, FaSquare, FaSpinner } from 'react-icons/fa6'
import { IoMdDownload } from 'react-icons/io'
import { GrPowerReset } from 'react-icons/gr'
import 'flag-icons/css/flag-icons.min.css'
import { Upload } from './components/upload'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { uploadAudio } from '@/features/history/historySlice'

function Index() {
  const [selectedLanguage, setSelectedLanguage] = useState('id')
  const [showUpload, setShowUpload] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isSummarizing, setIsSummarizing] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const history = useAppSelector((state) => state.history)
  const dispatch = useAppDispatch()

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream
          ?.getTracks()
          .forEach((track) => track.stop())
      }
    }
  }, [])

  const handleLanguageChange = (event: React.FormEvent<HTMLSelectElement>) => {
    setSelectedLanguage(event.currentTarget.value)
  }

  const handleStartRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/wav',
        })
        const audioFile = new File([audioBlob], `${Date.now()}.wav`, {
          type: 'audio/wav',
          lastModified: Date.now(),
        })

        const url = URL.createObjectURL(audioBlob)
        setFile(audioFile)
        setAudioUrl(url)
        audioChunksRef.current = []
      }

      mediaRecorderRef.current.start()
      setIsRecording(true)
    }
  }

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const handleDownload = () => {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = 'recording.wav'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleReset = () => {
    setAudioUrl(null)
    audioChunksRef.current = []
    setIsSummarizing(false)
  }

  const handleCloseUpload = () => {
    setShowUpload(false)
  }

  function handleSummarize(e: any) {
    e.preventDefault()
    if (file) {
      dispatch(uploadAudio(file))
    }
  }

  return (
    <div className='container mt-10 space-y-10'>
      <section className='flex justify-between'>
        <h1 className='text-2xl font-bold md:text-3xl'>Summarize Meeting AI</h1>
        <Button
          className='hidden bg-colorPrimary font-semibold text-white dark:hover:text-textPrimary md:flex'
          onClick={() => setShowUpload(true)}
          disabled={history.isLoading}
        >
          Upload File
          <PiUploadBold className='h-6 w-6' />
        </Button>
      </section>
      {showUpload && <Upload onClose={handleCloseUpload} />}

      <section className='space-y-5 lg:w-1/2'>
        <h2 className='md:text-xl lg:text-2xl'>
          Record your meeting, get instant transcribe and summary by AI
        </h2>

        <div className='flex items-center space-x-4'>
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
      </section>

      <section>
        <div className='h-auto space-y-5 overflow-hidden rounded-lg shadow-lg md:flex md:h-80 md:flex-row md:space-x-5 md:space-y-0'>
          <div className='flex flex-col items-center space-y-4 rounded-lg bg-primary p-6 md:w-1/2'>
            <h2 className='text-center text-xl font-bold text-colorPrimary md:text-2xl'>
              Record Audio
            </h2>
            {[
              {
                onClick: isRecording
                  ? handleStopRecording
                  : handleStartRecording,
                className: `rounded-full p-5 font-semibold ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'dark:bg-colorPrimary dark:hover:bg-colorPrimary-dark'}`,
                content: isRecording ? <FaSquare /> : <FaMicrophone />,
              },
              {
                onClick: () => setShowUpload(true),
                className:
                  'bg-colorPrimary text-white font-semibold hover:bg-colorPrimary-dark md:hidden',
                content: (
                  <>
                    <PiUploadBold className='ml-2 h-6 w-6' /> Upload File
                  </>
                ),
              },
            ].map(({ onClick, className, content }, index) => (
              <Button key={index} onClick={onClick} className={className}>
                {content}
              </Button>
            ))}

            {audioUrl && (
              <div className='mt-6 flex w-full flex-col items-center space-y-4'>
                <h2 className='text-center text-xl font-bold text-colorPrimary md:text-2xl'>
                  Recording Result
                </h2>
                <audio controls src={audioUrl} className='w-3/4 md:w-1/2' />

                <div className='flex space-x-3'>
                  {[
                    {
                      onClick: handleDownload,
                      bgColor: 'bg-blue-500 hover:bg-blue-600',
                      Icon: IoMdDownload,
                    },
                    {
                      onClick: handleReset,
                      bgColor: 'bg-red-500 hover:bg-red-600',
                      Icon: GrPowerReset,
                    },
                  ].map(({ onClick, bgColor, Icon }, index) => (
                    <Button
                      key={index}
                      onClick={onClick}
                      className={`rounded-full p-3 font-semibold text-white ${bgColor}`}
                    >
                      <Icon className='h-5 w-5' />
                    </Button>
                  ))}
                </div>
                <Button
                  onClick={handleSummarize}
                  className='bg-blue-500 font-semibold text-white hover:bg-blue-600'
                >
                  Summarize
                </Button>
              </div>
            )}
          </div>

          <div className='flex flex-col space-y-4 rounded-lg bg-primary p-6 md:w-1/2'>
            <h1 className='text-center text-xl font-bold text-colorPrimary md:text-2xl'>
              Result
            </h1>
            {history.isLoading ? (
              <div className='flex flex-col items-center justify-center space-y-2'>
                <FaSpinner
                  className='animate-spin text-4xl'
                  fill='colorPrimary'
                />
                <p className='text-lg'>Process Summarize...</p>
              </div>
            ) : history.result?.transcript && history.result?.summary ? (
              <div className='scrollbar-custom max-h-[400px] space-y-6 overflow-y-auto p-2 text-left'>
                <div>
                  <h2 className='text-lg font-semibold text-colorPrimary'>
                    Transcript:
                  </h2>
                  <p className='text-justify'>{history.result.transcript}</p>
                </div>
                <div>
                  <h2 className='text-lg font-semibold text-colorPrimary'>
                    Summary:
                  </h2>
                  <p className='text-justify'>{history.result.summary}</p>
                </div>
              </div>
            ) : (
              <div>
                <h2 className='text-center text-xl font-bold text-muted-foreground'>
                  No results to display
                </h2>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Index
