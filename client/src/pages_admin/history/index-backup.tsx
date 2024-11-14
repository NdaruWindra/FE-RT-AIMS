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
import { TableHistory } from './components/table';
import { Edit } from './components/edit';

export default function ProductTable() {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState('')

  const handleEditClick = () => {
    setIsEditOpen(true);
  };

  const handleCloseEdit = () => {
    setIsEditOpen(false);
  };

  return (
    <div className='relative w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>My History</h1>
      <Separator className='my-4' />

      <div className='grid grid-cols-2 items-end justify-between'>
        <Select onValueChange={(value) => setSortOrder(value)}>
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

        <Search />
      </div>
      
      {/* TableHistory with both sortOrder and onEdit props */}
      {/* <TableHistory sortOrder={sortOrder} onEdit={handleEditClick} /> */}

      {/* Render Edit modal if isEditOpen is true */}
      {isEditOpen && <Edit onClose={handleCloseEdit} />}
    </div>
  );
}
