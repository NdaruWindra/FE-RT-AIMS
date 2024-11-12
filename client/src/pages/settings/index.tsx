import { Button } from '@/components/custom/button'
import { Layout } from '@/components/custom/layout'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IoPersonCircle } from 'react-icons/io5'
import { FormSettings } from './components/form-settings'
import { useAppSelector } from '@/hooks/use-redux'
import {
  dataFormSettingsSelectLeft,
  dataFormSettingsSelectRight,
} from '@/utils/constant'
import { useState } from 'react'

export default function Settings() {
  const { username, email } = useAppSelector((store) => store.user)
  const form = useForm()
  const [isEditing, setIsEditing] = useState(false)

  // Toggle Edit Mode
  const handleEditToggle = () => {
    setIsEditing(!isEditing)
  }

  // Handle Save Changes
  const handleSave = () => {
    console.log('Data disimpan:', form.getValues())
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

        {/* Profile */}
        <section>
          <div className='items-center justify-between space-y-2 lg:flex lg:space-y-0'>
            <div className='flex items-center space-x-4'>
              <IoPersonCircle className='h-16 w-16' />
              <div>
                <p className='font-medium dark:text-primary'>{username}</p>
                <p className='text-muted-foreground'>{email || 'user@gmail.com'}</p>
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
        <section className='grid grid-cols-2 gap-4'>
          <Form {...form}>
            {/* Email Field */}
            <FormSettings
              data={dataFormSettingsSelectLeft}
              name='email'
              label='Email'
              placeholder='Your Email'
              disabled={!isEditing} 
            />
            {/* Username Field */}
            <FormSettings
              data={dataFormSettingsSelectRight}
              name='username'
              label='Username'
              placeholder='Your Username'
              disabled={!isEditing} 
            />
          </Form>

          {/* Edit / Save Button Section */}
          <div className='space-x-2'>
            {!isEditing ? (
              <Button
                onClick={handleEditToggle}
                className='w-28 bg-colorPrimary text-primary hover:text-textPrimary'
              >
                Edit
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleSave}
                  className='w-28 bg-green-500 text-white hover:bg-green-600'
                >
                  Save
                </Button>
                <Button
                  onClick={handleEditToggle}
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
