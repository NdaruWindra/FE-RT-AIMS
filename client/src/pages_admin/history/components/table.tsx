import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAppSelector } from '@/hooks/use-redux';
import { TSingleUser } from '@/utils/type';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

interface TableHistoryProps {
  data: TSingleUser[];
  onEdit: (user: { username: string; email: string }) => void;
  onDelete: (id: string) => void;
  sortOrder: string;
}

export function TableHistory({ data, onEdit, onDelete, sortOrder }: TableHistoryProps) {
  const {
    isLoading,
    displayedUsers,
    allUser,
    paginationUser: { pageSize, currentPage },
    filterBy,
  } = useAppSelector((store) => store.user);

  const [edit, setEdit] = useState(false);
  const [idUser, setIdUser] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleEdit = (edit: boolean, id?: string) => {
    setEdit(edit);
    setIdUser(id || null);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
  };

  const handleNameClick = (user_id: string) => {
    navigate(`/dashboard-admin/history-detail-admin?userid=${user_id}`);
  };

  // Sorting the displayed data based on sortOrder
  const sortedData = [...displayedUsers].sort((a, b) => {
    if (sortOrder === 'a-z') {
      return a.username.localeCompare(b.username);
    }
    if (sortOrder === 'z-a') {
      return b.username.localeCompare(a.username);
    }
    return 0;
  });

  if (isLoading) {
    return (
      <div className='mt-5'>
        <h1>Loading...</h1>
      </div>
    );
  }

  if (displayedUsers.length === 0) {
    return (
      <div className='mt-5'>
        <h1>Users not found</h1>
      </div>
    );
  }

  return (
    <div className='mt-5 overflow-hidden rounded-2xl border border-gray-300'>
      <Table className='w-full'>
        <TableHeader className='bg-gray-700'>
          <TableRow>
            <TableHead className='w-[100px] px-4 py-2'>User</TableHead>
            <TableHead className='px-4 py-2 text-center'>History</TableHead>
            <TableHead className='px-4 py-2'>Email</TableHead>
            <TableHead className='px-4 py-2 text-right'>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.length > 0
            ? sortedData.map((user) => {
                const dynamicNumber = (currentPage - 1) * pageSize + 1;

                return (
                  <TableRow key={user.user_id} className='h-14 hover:cursor-pointer'>
                    <TableCell
                      className='cursor-pointer px-4 py-2 font-medium text-blue-600 hover:underline'
                      onClick={() => handleNameClick(user.user_id)}
                    >
                      {user.username}
                    </TableCell>
                    <TableCell className='px-4 py-2 text-center'>
                      {user.history?.length}
                    </TableCell>
                    <TableCell className='px-4 py-2'>{user.email}</TableCell>
                    <TableCell className='space-x-2 px-4 py-2 text-right'>
                      <Button
                        onClick={() => onEdit({ username: user.username, email: user.email })}
                        variant={'ghost'}
                        className='text-blue-600 hover:bg-transparent hover:underline'
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(user.user_id)}
                        variant={'ghost'}
                        className='text-red-600 hover:bg-transparent hover:underline'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            : displayedUsers.map((user) => {
                const dynamicNumber = (currentPage - 1) * pageSize + 1;

                return (
                  <TableRow key={user.id} className='h-14 hover:cursor-pointer'>
                    <TableCell
                      className='cursor-pointer px-4 py-2 font-medium text-blue-600 hover:underline'
                      onClick={() => handleNameClick(user.user_id)}
                    >
                      {user.username}
                    </TableCell>
                    <TableCell className='px-4 py-2 text-center'>
                      {user.history?.length}
                    </TableCell>
                    <TableCell className='px-4 py-2'>{user.email}</TableCell>
                    <TableCell className='space-x-2 px-4 py-2 text-right'>
                      <Button
                        onClick={() => onEdit({ username: user.username, email: user.email })}
                        variant={'ghost'}
                        className='text-blue-600 hover:bg-transparent hover:underline'
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(user.user_id)}
                        variant={'ghost'}
                        className='text-red-600 hover:bg-transparent hover:underline'
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
        </TableBody>
      </Table>
    </div>
  );
}
