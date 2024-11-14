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
import { TableHistory } from './components/table'

import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { getMyHistory } from '@/features/history/historySlice'
import { PaginationHistory } from './components/pagination-history'

export default function ProductTable() {
  const dispatch = useAppDispatch()

  const user = useAppSelector((state) => state.user)
  const history = useAppSelector((state) => state.history)

  useEffect(function () {
    // dispatch(getMyHistory(user.accessToken))
  }, [])

  return (
    <div className='relative mt-10 w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>My History</h1>

      <Separator className='my-4' />

      <div className='grid grid-cols-2 items-end justify-between'>
        <Select>
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

      <TableHistory data={history.allHistory} />

      <PaginationHistory data={history.allHistory} />
    </div>
  )
}
