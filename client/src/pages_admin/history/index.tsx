import { useState } from 'react'
import { Search } from '@/components/search-admin'
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

import { useAppSelector } from '@/hooks/use-redux'
import { PaginationUser } from './components/pagination-users'
import { Edit } from './components/edit'
import { useFetchAllUsersQuery, useFetchDeleteUserMutation } from '@/features/user/userThunk'

export default function ProductTable() {
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingData, setEditingData] = useState<{
    username: string
    email: string
  } | null>(null)
  const [sortOrder, setSortOrder] = useState('')

  const user = useAppSelector((state) => state.user)
  const { data, refetch } = useFetchAllUsersQuery(user.accessToken) 
  const [deleteUser] = useFetchDeleteUserMutation()


  const handleDeleteClick = async (id: string) => {
    try {
      await deleteUser({ id, accessToken: user.accessToken }).unwrap()
      alert('User deleted successfully')
      refetch()
    } catch (error) {
      console.error('Failed to delete user:', error)
      alert('Failed to delete user')
    }
  }

  const handleSortChange = (value: string) => {
    setSortOrder(value)
  }

  const handleEditClick = (data: { username: string; email: string }) => {
    setEditingData(data)
    setIsEditOpen(true)
  }

  // Menutup modal edit
  const handleCloseEdit = () => {
    setIsEditOpen(false)
    setEditingData(null)
  }

  return (
    <div className='relative mt-10 w-full shadow-md sm:rounded-lg'>
      <h1 className='text-2xl font-bold'>User Management</h1>

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
              <SelectItem value='newest'>Date (Newest)</SelectItem>
              <SelectItem value='latest'>Date (Latest)</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Search />
      </div>

      <TableHistory
        data={user.allUser}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick} 
        sortOrder={sortOrder}
      />

      {/* Modal Edit */}
      {isEditOpen && editingData && (
        <Edit
          onClose={handleCloseEdit}
          initialData={editingData}
        />
      )}

      <PaginationUser
        data={data?.data}
      />
    </div>
  )
}
