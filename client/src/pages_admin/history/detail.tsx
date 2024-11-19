import { useNavigate } from 'react-router-dom';
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
import { TableHistory } from './components/table-detail';

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux';
import { getAllHistory } from '@/features/history/historySlice';
import { PaginationHistory } from './components/pagination-history';

export default function ProductTable() {
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const history = useAppSelector((state) => state.history);

  useEffect(() => {
    dispatch(getAllHistory(user.accessToken));
  }, [dispatch, user.accessToken]);

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };

  const handleBackClick = () => {
    navigate('/dashboard-admin/history-admin');
  };

  return (
    <div className='relative w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>My History</h1>

      <Separator className='my-4' />

      <div className='flex items-center justify-between'>
        <div className='flex items-center space-x-4'>
          <Select onValueChange={handleSortChange}>
            <SelectTrigger className='w-[180px]'>
              <SelectValue placeholder='Filter By' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='a-z'>A-Z</SelectItem>
                <SelectItem value='z-a'>Z-A</SelectItem>
                <SelectItem value='newest'>Date (Newest)</SelectItem>
                <SelectItem value='latest'>Date (Latest)</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <button
            onClick={handleBackClick}
            className='px-4 py-2 bg-darkPrimary text-primary rounded-lg hover:dark:bg-colorPrimary hover:text-primary border border-primary transition-colors dark:bg-darkPrimary dark:text-primary dark:hover:bg-primary dark:hover:text-white'
          >
            Kembali
          </button>
        </div>

        <Search />
      </div>

      <TableHistory data={history.allHistory} sortOrder={sortOrder} />

      <PaginationHistory data={history.allHistory} />
    </div>
  );
}
