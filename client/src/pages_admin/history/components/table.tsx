import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface UserData {
  userName: string;
  history: string;
  createdAt: string;
}

interface TableHistoryProps {
  sortOrder?: string;
  onEdit: () => void;
}

const user: UserData[] = [
  { userName: 'I Nyoman Karma', history: '2', createdAt: '2023-01-15' },
  { userName: 'Ndaru Windra', history: '3', createdAt: '2023-02-10' },
  { userName: 'Virgonita', history: '1', createdAt: '2023-03-05' },
  { userName: 'Selta Jaya Putra', history: '4', createdAt: '2023-04-20' },
  { userName: 'Sutri', history: '30', createdAt: '2023-05-12' },
  { userName: 'M.Ilyas', history: '15', createdAt: '2023-06-18' },
  { userName: 'Marco', history: '4', createdAt: '2023-07-21' },
];

export function TableHistory({ sortOrder, onEdit }: TableHistoryProps) {
  // Logika pengurutan dapat ditambahkan di sini berdasarkan sortOrder
  const sortedUser = [...user].sort((a, b) => {
    if (sortOrder === 'a-z') return a.userName.localeCompare(b.userName);
    if (sortOrder === 'z-a') return b.userName.localeCompare(a.userName);
    if (sortOrder === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sortOrder === 'latest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    return 0;
  });

  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full md:w-full'>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='px-4 py-2'>
              <Checkbox />
            </TableHead>
            <TableHead className='w-[100px] px-4 py-2'>Username</TableHead>
            <TableHead className='px-4 py-2'>History</TableHead>
            <TableHead className='px-4 py-2'>Created At</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedUser.map((user) => (
            <TableRow key={user.userName}>
              <TableCell className='px-4 py-2'>
                <Checkbox />
              </TableCell>
              <TableCell className='px-4 py-2 font-medium'>
              <a href="/dashboard-admin/history-detail-admin">{user.userName}</a>
              </TableCell>
              <TableCell className='px-4 py-2'>{user.history}</TableCell>
              <TableCell className='px-4 py-2'>{user.createdAt}</TableCell>
              <TableCell className='space-x-2 px-4 py-2 text-right'>
              <button
                  onClick={onEdit}
                  className='text-blue-600 hover:underline'
                >
                  Edit
                </button>
                <button className='text-red-600 hover:underline'>
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
