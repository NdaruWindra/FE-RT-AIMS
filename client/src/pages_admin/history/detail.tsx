import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useState } from 'react';
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
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Button } from '@/components/custom/button'

import { useAppSelector } from '@/hooks/use-redux';
import { PaginationHistory } from './components/pagination-history';
import { useGetAllHistoryQuery } from '@/features/history/historyThunk';

export default function ProductTable() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('userid');
  const [sortOrder, setSortOrder] = useState('');
  const navigate = useNavigate();
  const { accessToken } = useAppSelector((state) => state.user);

  const { data, isLoading, isError, error } = useGetAllHistoryQuery({ id, accessToken });

  const handleSortChange = (value: string) => {
    setSortOrder(value);
  };


  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !data || !Array.isArray(data.data)) {
    console.error('Error:', error);
    return <div>Error loading history data.</div>;
  }

  return (
    <div className='relative w-full shadow-md sm:rounded-lg'>
      
      <h1 className='text-2xl font-bold'>My History</h1>
      <Button asChild variant={'outline'} className='mt-5 bg-colorPrimary'>
            <Link to='/dashboard-admin/history-admin'>
              <IoMdArrowRoundBack />
              Back
            </Link>
          </Button>
      
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

          

          
        </div>


      </div>

      <TableHistory data={data.data} sortOrder={sortOrder} />


    </div>
  );
}
