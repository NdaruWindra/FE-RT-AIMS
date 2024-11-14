import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TSingleUser } from '@/utils/type';

interface TableHistoryProps {
  data: TSingleUser[];
  onEdit: () => void;
}

export function TableHistory({ data, onEdit }: TableHistoryProps) {
  if (data.length === 0) {
    return (
      <div className='mt-5'>
        <h1>History is empty</h1>
      </div>
    );
  }

  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full '>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='px-4 py-2'>
              <Checkbox />
            </TableHead>
            <TableHead className='w-[100px] px-4 py-2'>User</TableHead>
            <TableHead className='px-4 py-2 text-center'>History</TableHead>
            <TableHead className='px-4 py-2'>Email</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user) => (
            <TableRow key={user.id} className='h-14 hover:cursor-pointer'>
              <TableCell className='px-4 py-2'>
                <Checkbox />
              </TableCell>
              <TableCell className='px-4 py-2 font-medium'>{user.username}</TableCell>
              <TableCell className='px-4 py-2 text-center'>{user.history?.length}</TableCell>
              <TableCell className='px-4 py-2'>{user.email}</TableCell>
              <TableCell className='space-x-2 px-4 py-2 text-right'>
                <button onClick={onEdit} className='text-blue-600 hover:underline'>
                  Edit
                </button>
                <a href='#' className='text-red-600 hover:underline'>
                  Delete
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
