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
  useFetchRefreshTokenMutation,
  useFetchUpdateUserMutation,
} from '@/features/user/userThunk'

import { useForm } from 'react-hook-form'
import { IoPersonCircle } from 'react-icons/io5'

import { useState } from 'react'
import { useAppSelector } from '@/hooks/use-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

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
  const { username, email, accessToken, refreshToken, isLoading } =
    useAppSelector((store) => store.user)
  const [fetchUpdateUser] = useFetchUpdateUserMutation()
  const [fetchRefreshToken] = useFetchRefreshTokenMutation()

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

    await fetchRefreshToken(refreshToken)

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

        <div className='flex items-center justify-between'>
          <h1>Become New </h1>

          <div>
            {!isEditing ? (
              <Button
                type='button'
                onClick={() => setIsEditing(true)}
                disabled={isLoading}
                className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'
              >
                {isLoading ? 'Loading...' : 'Edit'}
              </Button>
            ) : (
              <Button
                disabled={!isEditing}
                onClick={() => setIsEditing(false)}
                className='w-28 bg-gray-500 text-white hover:bg-gray-600'
              >
                Cancel
              </Button>
            )}
          </div>
        </div>

        {/* Profile */}
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
            <Button className='relative inline-block bg-colorPrimary p-0 hover:cursor-pointer'>
              <label className='flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-colorPrimary px-5 text-center text-primary hover:cursor-pointer'>
                Choose File
                <Input
                  type='file'
                  className='absolute inset-0 h-full w-full cursor-pointer opacity-0'
                />
              </label>
            </Button>

            <Button
              className='w-28 bg-primary text-red-500'
              disabled={!isEditing}
            >
              Remove Picture
            </Button>
          </div>
        </div>

        <div className='flex w-full flex-col justify-between gap-5 lg:flex-row'>
          {/* Form Username And Email*/}
          <section className='lg:w-1/2'>
            <h1
              className='mb-4 text-lg font-semibold
            '
            >
              Change Profile
            </h1>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid w-full grid-cols-1 items-center gap-4'
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
              <Button
                disabled={!isEditing}
                type='submit'
                onClick={onSubmit}
                className='w-28 bg-green-500 text-white hover:bg-green-600'
              >
                Save
              </Button>
            </div>
          </section>

          {/* Form Password*/}
          <section className='lg:w-1/2'>
            <h1
              className='mb-4 text-lg font-semibold
            '
            >
              Change Password
            </h1>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className='grid w-full grid-cols-1 items-center gap-4'
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
              <Button
                disabled={!isEditing}
                type='submit'
                onClick={onSubmit}
                className='w-fit bg-green-500 text-white hover:bg-green-600'
              >
                Save Password
              </Button>
            </div>
          </section>
        </div>
      </Layout.Body>
    </Layout>
  )
}
