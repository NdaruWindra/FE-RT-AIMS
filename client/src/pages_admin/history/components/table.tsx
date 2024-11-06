import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

const User = [
  {
    userName: 'I Nyoman Karma',
    history: '2 ',
    createdAt: '2023-01-15',
  },
  {
    userName: 'Ndaru Windra',
    duration: '3 ',
    createdAt: '2023-02-10',
  },
  {
    userName: 'Virgonita',
    duration: '1 ',
    createdAt: '2023-03-05',
  },
  {
    userName: 'Selta Jaya Putra',
    duration: '4 ',
    createdAt: '2023-04-20',
  },
  {
    userName: 'Sutri',
    duration: '30 ',
    createdAt: '2023-05-12',
  },
  {
    userName: 'M.Ilyas',
    duration: '15 ',
    createdAt: '2023-06-18',
  },
  {
    userName: 'Priskilla',
    duration: '4',
    createdAt: '2023-07-21',
  },
]

export function TableHistory() {
  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full md:w-full'>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='px-4 py-2'>
              <Checkbox />
            </TableHead>
            <TableHead className='w-[100px] px-4 py-2'>User</TableHead>
            <TableHead className='px-4 py-2'>History</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {User.map((user) => (
            <TableRow key={user.userName}>
              <TableCell className='px-4 py-2'>
                <Checkbox />
              </TableCell>
              <TableCell className='px-4 py-2 font-medium'>
                <a href="/dashboard/history-detail-admin">{user.userName}</a>
              </TableCell>
              <TableCell className='px-4 py-2'>{user.duration}</TableCell>
              <TableCell className='px-4 py-2'>{user.createdAt}</TableCell>
              <TableCell className='space-x-2 px-4 py-2 text-right'>
                <a href='#' className='text-blue-600 hover:underline'>
                  Edit
                </a>
                <a href='#' className='text-red-600 hover:underline'>
                  Delete
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
