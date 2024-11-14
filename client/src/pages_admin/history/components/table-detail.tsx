import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TSingleHistory } from '@/utils/type'

export function TableHistory({ data }: { data: TSingleHistory[] }) {
  if (data.length === 0) {
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
            <TableHead className='w-[100px] px-4 py-2'>File Name</TableHead>
            <TableHead className='px-4 py-2'>Duration</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map(function (history: TSingleHistory) {
            console.log(history);
            return (
              
              
              <TableRow
                key={history.id_history}
                className='h-14 hover:cursor-pointer'
              >
                <TableCell className='px-4 py-2'>
                  <Checkbox />
                </TableCell>
                <TableCell className='px-4 py-2 font-medium'>
                  {history.title}
                </TableCell>
                <TableCell className='px-4 py-2 text-center'>00:20</TableCell>
                <TableCell className='px-4 py-2'>{history.date}</TableCell>
                <TableCell className='space-x-2 px-4 py-2 text-right'>
                  <a href='#' className='text-red-600 hover:underline'>
                    Delete
                  </a>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
