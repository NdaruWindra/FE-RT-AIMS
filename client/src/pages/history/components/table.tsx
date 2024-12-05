import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
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

export function TableHistory() {
  const {
    isLoading,
    showedHistory,
    paginationHistory: { pageSize, currentPage },
  } = useAppSelector(function (store) {
    return store.history
  })
  const { accessToken } = useAppSelector(function (store) {
    return store.user
  })

  const [deleteHistory] = useDeleteHistoryMutation()

  const handleEdit = async (id: string) => {
    console.log(id)
  }
  const handleDelete = async (id: string) => {
    await deleteHistory({ accessToken, history_id: id })
  }
  const handleDownload = (id: string) => {
    console.log(id)
  }

  if (isLoading) {
    return (
      <div className='mt-5 '>
        <h1>Loading...</h1>
      </div>
    )
  }

  if (showedHistory.length === 0) {
    return (
      <div className='mt-5'>
        <h1>History is empty</h1>
      </div>
    )
  }

  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full '>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='px-4 py-2'>
              <Checkbox />
            </TableHead>
            <TableHead className='text-center'>No</TableHead>
            <TableHead className='w-[100px]  px-4 py-2'>File Name</TableHead>

            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='py-2  text-center'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {showedHistory?.map(function (history: TSingleHistory, index) {
            const dynamicNumber = (currentPage - 1) * pageSize + index + 1

            return (
              <TableRow
                key={history.id_history}
                className='h-14 hover:cursor-pointer'
              >
                <TableCell className='px-4 py-2'>
                  <Checkbox />
                </TableCell>
                <TableCell className='py-2 text-center font-medium'>
                  {dynamicNumber}
                </TableCell>
                <TableCell className='px-4 py-2 font-medium'>
                  {history.title}
                </TableCell>

                <TableCell className='px-4 py-2'>{history.createdAt}</TableCell>
                <TableCell className=' py-2 text-center'>
                  <Button
                    disabled={isLoading}
                    onClick={() => handleEdit(history.id_history)}
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
