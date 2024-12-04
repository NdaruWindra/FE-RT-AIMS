import { useState, useEffect } from 'react';
import { Search } from '@/components/search';
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { TableHistory } from './components/table';

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { getAllUser, deleteUser } from '@/features/user/userSlice';
import { PaginationHistory } from './components/pagination-history';
import { Edit } from './components/edit';
import { useNavigate } from 'react-router-dom';

export default function ProductTable() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingData, setEditingData] = useState<{ username: string; email: string } | null>(null);
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const history = useAppSelector((state) => state.history);

  // Mengambil data pengguna saat komponen dimuat
  useEffect(() => {
    dispatch(getAllUser(user.accessToken));
  }, [dispatch, user.accessToken]);

  // Mengatur urutan sort
  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  // Mengatur data pengguna yang akan diedit dan membuka modal
  const handleEditClick = (data: { username: string; email: string }) => {
    setEditingData(data);
    setIsEditOpen(true);
  };

  // Menutup modal edit
  const handleCloseEdit = () => {
    setIsEditOpen(false);
    setEditingData(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      navigate('/dashboard-admin');
    } catch (error: any) {
      console.error(error || 'Failed to delete user');
    }
  };

  return (
    <div className='relative w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>My History</h1>

      <Separator className='my-4' />

      <div className='grid grid-cols-2 items-end justify-between'>
        <Select onValueChange={handleSortChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter By' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='a-z'>A-Z</SelectItem>
              <SelectItem value='z-a'>Z-A</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Search />
      </div>

      {/* Tabel pengguna */}
      <TableHistory data={user.allUser} onEdit={handleEditClick} sortOrder={sortOrder} onDelete={handleDelete} />

      {/* Modal Edit */}
      {isEditOpen && editingData && (
        <Edit onClose={handleCloseEdit} initialData={editingData} />
      )}

      {/* Pagination */}
      <PaginationHistory data={history.allHistory} />
    </div>
  );
}
