import { Input } from '@/components/ui/input'
import { setSearch } from '@/features/user/userSlice' // sesuaikan dengan path file userSlice
import { useAppDispatch } from '@/hooks/use-redux'
import { ChangeEvent } from 'react'
import { IoSearchOutline } from 'react-icons/io5'

export function Search() {
  const dispatch = useAppDispatch()

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value))
  }

  return (
    <div className='relative'>
      <Input type='search' placeholder='Search...' onChange={handleSearch} />
      <IoSearchOutline className='absolute right-4 top-2.5 ' />
    </div>
  )
}
