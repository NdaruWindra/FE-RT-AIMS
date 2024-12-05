import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Search } from '@/components/search'
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { TableHistory } from './components/table-detail'

import { useAppSelector } from '@/hooks/use-redux'
import { PaginationHistory } from './components/pagination-history'
import { useGetAllHistoryQuery } from '@/features/history/historyThunk'

export default function ProductTable() {
  const [sortOrder, setSortOrder] = useState('')
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.user)
  const history = useAppSelector((state) => state.history)

  const data = useGetAllHistoryQuery(user.accessToken)

  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  const handleBackClick = () => {
    navigate('/dashboard-admin/history-admin')
  }

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
            className='bg-darkPrimary dark:bg-darkPrimary rounded-lg border border-primary px-4 py-2 text-primary transition-colors hover:text-primary dark:text-primary dark:hover:bg-primary hover:dark:bg-colorPrimary dark:hover:text-white'
          >
            Kembali
          </button>
        </div>

        <Search />
      </div>

      <TableHistory data={history.allHistory} sortOrder={sortOrder} />

      <PaginationHistory data={history.allHistory} />
    </div>
  )
}
