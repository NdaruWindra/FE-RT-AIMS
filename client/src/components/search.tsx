import { Input } from '@/components/ui/input'
import { IoSearchOutline } from 'react-icons/io5'

export function Search() {
  return (
    <div className='relative'>
      <Input type='search' placeholder='Search...' />
      <IoSearchOutline className='absolute right-4 top-2.5 ' />
    </div>
  )
}
