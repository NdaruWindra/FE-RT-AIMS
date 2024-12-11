import { useEffect } from 'react'
import { Button } from '@/components/custom/button'
import { useForm } from 'react-hook-form'
import { Form } from '@/components/ui/form'
import { FormSettings } from './form-settings'
import { useAppSelector } from '@/hooks/use-redux'
import { useFetchUpdateUserMutation } from '@/features/user/userThunk'

interface EditProps {
  onClose: () => void
  initialData: { username: string; email: string }
}

export function Edit({ onClose, initialData }: EditProps) {
  const user = useAppSelector((state) => state.user)

  const [fetchUpdateUser] = useFetchUpdateUserMutation()

  const form = useForm({
    defaultValues: {
      username: initialData.username,
      newEmail: '',
    },
  })

  const handleSaveChanges = async (data: any) => {
    await fetchUpdateUser({
      accessToken: user.accessToken,
      data: {
        username: data.username,
        email: data.email,
        targetEmail: data.targetEmail,
      },
    })

    onClose()
  }

  useEffect(() => {
    form.reset({
      username: initialData.username,
      newEmail: initialData.email,
    })
  }, [initialData, form])

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-85'>
      <div className='relative mx-auto w-full max-w-md rounded-lg bg-black p-8 shadow-lg md:max-w-lg'>
        <button
          onClick={onClose}
          className='absolute right-2 top-2 text-gray-500 hover:text-gray-700'
        >
          ✕
        </button>
        <h2 className='mb-4 text-lg font-bold text-white'>
          Edit User Settings
        </h2>

        <Form {...form}>
          <div className='space-y-4'>
            <FormSettings
              control={form.control}
              name='username'
              label='Username'
              placeholder='Your Username'
            />
            <FormSettings
              control={form.control}
              name='newEmail'
              label='Email'
              placeholder='Your Email'
            />
          </div>
          <div className='mt-6 flex justify-end'>
            <Button
              type='submit'
              onClick={form.handleSubmit(handleSaveChanges)}
              className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'
            >
              {user.isLoading ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
