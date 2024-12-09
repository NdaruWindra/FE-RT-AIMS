import { useEffect, useRef, useState } from 'react'
import { FaMicrophone, FaSquare, FaSpinner } from 'react-icons/fa6'
import { setResults } from '@/features/history/historySlice'
import { IoMdDownload } from 'react-icons/io'
import { GrPowerReset } from 'react-icons/gr'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { Button } from '@/components/ui/button'
import {
  usePostHistoryMutation,
  useUploadAudioMutation,
} from '@/features/history/historyThunk'
import { toast } from '@/components/ui/use-toast'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

export function Summarize() {
  const [isRecording, setIsRecording] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)

  const audioChunksRef = useRef<Blob[]>([])
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)

  const history = useAppSelector((state) => state.history)
  const user = useAppSelector((state) => state.user)

  const [postHistory] = usePostHistoryMutation()
  const [uploadAudio] = useUploadAudioMutation()

  const dispatch = useAppDispatch()

  async function handleStartRecording() {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorderRef.current = new MediaRecorder(stream)

      mediaRecorderRef.current.ondataavailable = function (event) {
        audioChunksRef.current.push(event.data)
      }

      mediaRecorderRef.current.onstop = function () {
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

  function handleStopRecording() {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  function handleDownload() {
    if (audioUrl) {
      const link = document.createElement('a')
      link.href = audioUrl
      link.download = 'recording.wav'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  function handleClearResult() {
    dispatch(setResults({ transcript: '', summary: '' }))
  }

  function handleResetAudio() {
    audioChunksRef.current = []
    setAudioUrl(null)
  }

  async function handleSummarize(e: any) {
    e.preventDefault()

    try {
      if (file) {
        const { data } = await uploadAudio(file)

        const transcripts = data.transcript.segments
          ?.map((data: any) => data['text'].trim())
          .join('-')

        await postHistory({
          token: user?.accessToken,
          summary: data.summary,
          transcript: transcripts,
          title: `${Date.now()}${file.name}`,
        })
      }

      setFile(null)
    } catch (error: any) {
      toast({
        description: 'Error creating new history',
        title: 'Error',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    return function cleanup() {
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stream?.getTracks().forEach(function (track) {
          track.stop()
        })
      }
    }
  }, [])

  useEffect(() => {
    const unloadCallback = (event: any) => {
      event.preventDefault()
      event.returnValue = ''
      return ''
    }

    window.addEventListener('beforeunload', unloadCallback)
    return () => window.removeEventListener('beforeunload', unloadCallback)
  }, [])

  return (
    <section>
      <div className='flex flex-col gap-3'>
        <div className='flex flex-col items-center gap-5 lg:flex-row'>
          <div className='flex h-fit w-96 flex-col items-center space-y-4 overflow-y-auto rounded-lg bg-colorPrimary p-3  dark:bg-primary'>
            <h2 className='font-bold text-white dark:text-colorPrimary md:text-lg lg:text-xl'>
              Record Audio
            </h2>
            {[
              {
                onClick: isRecording
                  ? handleStopRecording
                  : handleStartRecording,
                className: `rounded-full p-5 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'dark:bg-colorPrimary dark:hover:bg-colorPrimary-dark'}`,
                content: isRecording ? <FaSquare /> : <FaMicrophone />,
                disabled: history.isLoading,
              },
            ].map(function renderButton(buttonData, index) {
              const { onClick, className, content, disabled } = buttonData

              return (
                <Button
                  key={index}
                  onClick={onClick}
                  className={className}
                  disabled={disabled}
                >
                  {content}
                </Button>
              )
            })}

            {audioUrl && (
              <div className='flex w-full flex-col items-center space-y-4'>
                <h2 className='text-xl font-bold text-colorPrimary md:text-2xl'>
                  Recording Result
                </h2>
                <audio controls src={audioUrl} className='w-3/4' />

                <div className='flex space-x-3'>
                  {[
                    {
                      onClick: handleDownload,
                      bgColor: 'bg-blue-500 hover:bg-blue-600',
                      Icon: IoMdDownload,
                    },
                    {
                      onClick: handleResetAudio,
                      bgColor: 'bg-red-500 hover:bg-red-600',
                      Icon: GrPowerReset,
                      disabled: history.isLoading,
                    },
                  ].map(function (buttonData, index) {
                    const { onClick, bgColor, Icon, disabled } = buttonData
                    return (
                      <Button
                        key={index}
                        onClick={onClick}
                        className={`rounded-full p-3  text-white ${bgColor}`}
                        disabled={disabled}
                      >
                        <Icon />
                      </Button>
                    )
                  })}
                </div>
                <Button
                  onClick={handleSummarize}
                  disabled={history.isLoading}
                  className='bg-blue-500 font-semibold text-white hover:bg-blue-600'
                >
                  Summarize
                </Button>
              </div>
            )}
          </div>
          {history.isLoading && (
            <div className='mx-auto mt-5 flex flex-col items-center space-y-2'>
              <FaSpinner className='animate-spin text-4xl text-colorSecondary dark:text-white' />
              <p className='text-lg text-colorSecondary dark:text-white'>
                Process Summarize...
              </p>
            </div>
          )}
        </div>

        <div className='mb-5 flex h-fit flex-col items-start overflow-y-auto rounded-lg'>
          {history.result?.summary ? (
            <div className='flex flex-col gap-5 lg:flex-row-reverse'>
              {/* TRANSCRIPT */}

              <div className='flex flex-col  lg:w-1/2'>
                <h1 className='text-start text-xl font-bold text-white dark:text-colorPrimary md:text-2xl'>
                  Transcript
                </h1>
                <div className=' h-96 overflow-auto rounded-2xl border border-gray-300 '>
                  <Table>
                    <TableHeader className=' bg-gray-800'>
                      <TableRow>
                        <TableHead className='text-center'>No</TableHead>
                        <TableHead className='py-2 text-center'>
                          Transcript
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.result?.transcript.map(
                        (data: any, index: number) => (
                          <TableRow key={index} className='h-14'>
                            <TableCell className='py-2 text-center'>
                              {index + 1}.
                            </TableCell>
                            <TableCell className='py-2 text-justify'>
                              {data.text}
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
              {/* SUMMARY */}

              <div className='flex flex-col lg:w-1/2'>
                <h1 className=' text-xl font-bold text-white dark:text-colorPrimary md:text-2xl'>
                  Summary
                </h1>
                <p className='text-justify text-base  text-colorSecondary dark:text-white'>
                  {history.result?.summary}
                </p>

                <Button
                  onClick={handleClearResult}
                  className='my-5 w-fit bg-red-500 font-semibold text-white hover:bg-red-600'
                >
                  Clear Result
                </Button>
              </div>
            </div>
          ) : (
            ''
          )}
        </div>
      </div>
    </section>
  )
}
