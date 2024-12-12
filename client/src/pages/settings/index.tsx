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
  useFetchUpdateMyProfileMutation,
} from '@/features/user/userThunk'

import { useForm } from 'react-hook-form'

import { useState } from 'react'
import { useAppSelector } from '@/hooks/use-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import FormPasswordSetting from './components/form-password-setting'

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
  const {
    username,
    email,
    accessToken,
    refreshToken,
    isLoading,
    imageProfile,
  } = useAppSelector(function (store) {
    return store.user
  })
  const [fetchUpdateMyProfile] = useFetchUpdateMyProfileMutation()
  const [fetchRefreshToken] = useFetchRefreshTokenMutation()

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: username,
      email: email,
    },
  })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png']
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG and PNG formats are allowed.')
        return
      }
      setSelectedFile(file)
      setPreviewImage(URL.createObjectURL(file))
    }
  }

  const handleRemovePicture = () => {
    setSelectedFile(null)
    setPreviewImage(null)
  }

  const onSubmit = async () => {
    const formValue = form.getValues()

    await fetchUpdateMyProfile({
      username: formValue.username,
      email: formValue.email,
      images: selectedFile,
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
          <h1>Edit Profile Settings </h1>

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
            <img
              src={imageProfile || previewImage || ''}
              alt='Profile Preview'
              className='h-16 w-16 rounded-full object-cover'
            />
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
                  disabled={!isEditing || isLoading}
                  type='file'
                  accept='image/png, image/jpeg'
                  className='absolute inset-0 h-full w-full cursor-pointer opacity-0 disabled:bg-background'
                  onChange={handleFileChange}
                />
              </label>
            </Button>
            {selectedFile && (
              <Button
                className='w-28 bg-primary text-red-500'
                onClick={handleRemovePicture}
                disabled={!isEditing || isLoading}
              >
                Remove Picture
              </Button>
            )}
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
                disabled={!isEditing || isLoading}
                type='submit'
                onClick={onSubmit}
                className='w-28 bg-green-500 text-white hover:bg-green-600'
              >
                {isLoading ? 'Loading...' : 'Save'}
              </Button>
            </div>
          </section>

          {/* Form Password*/}
          <FormPasswordSetting
            isEditing={isEditing}
            setIsEditing={setIsEditing}
          />
        </div>
      </Layout.Body>
    </Layout>
  )
}
