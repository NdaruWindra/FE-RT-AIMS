import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TSingleHistory } from '@/utils/type';

interface TableHistoryProps {
  data: TSingleHistory[];
  sortOrder: string;
}

export function TableHistory({ data, sortOrder }: TableHistoryProps) {
  // Fungsi untuk mengurutkan data
  const sortedData = [...data].sort((a, b) => {
    if (sortOrder === 'a-z') {
      return a.title.localeCompare(b.title);
    } else if (sortOrder === 'z-a') {
      return b.title.localeCompare(a.title);
    } else if (sortOrder === 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else if (sortOrder === 'latest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    }
    return 0;
  });

  if (sortedData.length === 0) {
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
            <TableHead className='w-[100px] px-4 py-2'>File Name</TableHead>
            <TableHead className='px-4 py-2 text-center'>Duration</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((history) => (
            <TableRow key={history.id_history} className='h-14 hover:cursor-pointer'>
              <TableCell className='px-4 py-2'>
                <Checkbox />
              </TableCell>
              <TableCell className='px-4 py-2 font-medium'>{history.title}</TableCell>
              <TableCell className='px-4 py-2 text-center'>00:20</TableCell>
              <TableCell className='px-4 py-2'>{history.date}</TableCell>
              <TableCell className='space-x-2 px-4 py-2 text-right'>
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
