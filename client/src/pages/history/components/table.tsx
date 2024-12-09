import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useDeleteHistoryMutation } from '@/features/history/historyThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { TSingleHistory } from '@/utils/type'
import { useNavigate } from 'react-router-dom'
import ModalHistory from './modal-history'
import { useState } from 'react'
import { convertDate } from '@/utils/helper'

export function TableHistory() {
  const {
    isLoading,
    showedHistory,
    allHistory,
    paginationHistory: { pageSize, currentPage },
  } = useAppSelector((store) => store.history)
  const { accessToken } = useAppSelector((store) => store.user)

  const [edit, setEdit] = useState(false)
  const [idHistory, setIdHistory] = useState<string | null>(null)

  const navigate = useNavigate()

  const [deleteHistory] = useDeleteHistoryMutation()

  const historyData =
    allHistory.find(
      (history: TSingleHistory) => history.id_history === idHistory
    ) || null

  const handleEdit = (edit: boolean, id?: string) => {
    setEdit(edit)
    setIdHistory(id || null)
  }

  const handleDelete = async (id: string) => {
    await deleteHistory({ accessToken, history_id: id })
  }

  const handleDownload = (id: string) => {
    const resultHistory: any = allHistory.find(
      (history: TSingleHistory) => history.id_history === id
    )

    if (resultHistory) {
      const fileContent = `
      Title: ${resultHistory.title}
      Created At: ${convertDate(resultHistory.createdAt)}
      
      Summary:
      ${resultHistory?.summary}
      
      Transcript:
      ${resultHistory?.transcript}
          `

      const element = document.createElement('a')
      const file = new Blob([fileContent], {
        type: 'text/plain',
      })
      element.href = URL.createObjectURL(file)
      element.download = `${resultHistory.title.replace(/ /g, '_')}.txt`
      document.body.appendChild(element)
      element.click()
    }
  }

  const handleOnClick = (id: string) => {
    navigate(id)
  }

  if (isLoading) {
    return (
      <div className='mt-5'>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (showedHistory.length === 0) {
    return (
      <div className='mt-5'>
        <h1>History is not found</h1>
      </div>
    )
  }

  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <ModalHistory
        handleEdit={handleEdit}
        edit={edit}
        idHistory={idHistory}
        historyData={historyData}
      />

      <Table className='w-full '>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='text-center'>No</TableHead>
            <TableHead className='w-[100px]  px-4 py-2'>File Name</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='py-2 text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showedHistory?.map((history: TSingleHistory, index) => {
            const dynamicNumber = (currentPage - 1) * pageSize + index + 1

            return (
              <TableRow key={history.id_history} className='h-14'>
                <TableCell className='py-2 text-center font-medium'>
                  {dynamicNumber}
                </TableCell>
                <TableCell
                  className='whitespace-nowrap px-4 py-2 font-medium text-blue-600 hover:cursor-pointer hover:bg-transparent hover:underline'
                  onClick={() => handleOnClick(history.id_history)}
                >
                  {history.title}
                </TableCell>

                <TableCell className='px-4 py-2'>
                  {convertDate(history.createdAt)}
                </TableCell>

                <TableCell className='py-2 text-center'>
                  <Button
                    disabled={isLoading}
                    onClick={() => handleEdit(true, history.id_history)}
                    variant={'ghost'}
                    className='text-blue-600 hover:bg-transparent hover:underline'
                  >
                    Edit
                  </Button>

                  <Button
                    disabled={isLoading}
                    onClick={() => handleDelete(history.id_history)}
                    variant={'ghost'}
                    className='text-red-600 hover:bg-transparent hover:underline'
                  >
                    Delete
                  </Button>

                  <Button
                    disabled={isLoading}
                    onClick={() => handleDownload(history.id_history)}
                    variant={'ghost'}
                    className='text-green-600 hover:bg-transparent hover:underline'
                  >
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
