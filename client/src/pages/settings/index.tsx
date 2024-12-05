import { Layout } from '@/components/custom/layout'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  useFetchSignOutMutation,
  useFetchUpdateUserMutation,
} from '@/features/user/userThunk'

import { useForm } from 'react-hook-form'
import { IoPersonCircle } from 'react-icons/io5'

import { useState } from 'react'
import { useAppSelector } from '@/hooks/use-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useNavigate } from 'react-router-dom'

const FormSchema = z.object({
  username: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
})

export default function Settings() {
  const { username, email, accessToken, isLoading, refreshToken } =
    useAppSelector((store) => store.user)
  const [fetchUpdateUser] = useFetchUpdateUserMutation()
  const [fetchSignOut] = useFetchSignOutMutation()

  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username,
      email: email,
    },
  })

  const onSubmit = async () => {
    const formValue = form.getValues()

    await fetchUpdateUser({
      username: formValue.username,
      email: formValue.email,
      targetEmail: email,
      accessToken,
    })
    await fetchSignOut(refreshToken)

    navigate('/sign-in')
    setIsEditing(false)
  }

  return (
    <Layout fixed className='w-full overflow-y-auto'>
      <Layout.Body className='flex flex-col space-y-10'>
        {/* Header */}
        <section className='space-y-0.5'>
          <h1 className='text-2xl font-bold tracking-tight md:text-3xl'>
            Settings
          </h1>
          <p className='text-muted-foreground'>
            Manage your account settings and set e-mail preferences.
          </p>
        </section>

        <h1>Become New </h1>
        {/* Profile */}
        <section>
          <div className='items-center justify-between space-y-2 lg:flex lg:space-y-0'>
            <div className='flex items-center space-x-4'>
              <IoPersonCircle className='h-16 w-16' />
              <div>
                <p className='font-medium dark:text-primary'>{username}</p>
                <p className='text-muted-foreground'>
                  {email || 'user@gmail.com'}
                </p>
              </div>
            </div>
            <div className='space-x-2'>
              <Button
                className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'
                disabled={!isEditing}
              >
                Change Picture
              </Button>
              <Button
                className='w-28 bg-primary text-red-500'
                disabled={!isEditing}
              >
                Remove Picture
              </Button>
            </div>
          </div>
        </section>

        {/* Form */}
        <section>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid w-full grid-cols-2 items-center gap-4'
            >
              <FormField
                control={form.control}
                disabled={!isEditing}
                name='username'
                defaultValue={username}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder={username} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                disabled={!isEditing}
                defaultValue={email}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder={email} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <div className='mt-5 space-x-2'>
            {!isEditing ? (
              <Button
                type='button'
                onClick={() => setIsEditing(true)}
                className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  disabled={isLoading}
                  type='submit'
                  onClick={onSubmit}
                  className='w-28 bg-green-500 text-white hover:bg-green-600'
                >
                  Save
                </Button>
                <Button
                  disabled={isLoading}
                  onClick={() => setIsEditing(false)}
                  className='w-28 bg-gray-500 text-white hover:bg-gray-600'
                >
                  Cancel
                </Button>
              </>
            )}
          </div>
        </section>
      </Layout.Body>
    </Layout>
  )
}
