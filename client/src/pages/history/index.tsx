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

import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { PaginationHistory } from './components/pagination-history'
import { useGetHistoryQuery } from '@/features/history/historyThunk'
import { setFilter } from '@/features/history/historySlice'

export default function ProductTable() {
  const user = useAppSelector((state) => state.user)

  const { data } = useGetHistoryQuery({
    accessToken: user.accessToken,
  })
  const dispatch = useAppDispatch()

  const handleOnChange = (value: string) => {
    dispatch(setFilter(value))
  }

  return (
    <div className='relative mt-5 w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>My History</h1>

      <Separator className='my-4' />

      <div className='grid grid-cols-2 items-end justify-between'>
        <Select onValueChange={handleOnChange}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Filter By' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value='A-Z'>A-Z</SelectItem>
              <SelectItem value='Z-A'>Z-A</SelectItem>
              <SelectItem value='NEWEST'>Date (Newest)</SelectItem>
              <SelectItem value='LATEST'>Date (Latest)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Search />
      </div>

      <TableHistory />

      <PaginationHistory data={data?.data} />
    </div>
  )
}
