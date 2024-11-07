<<<<<<< HEAD
import { Outlet } from 'react-router-dom'
import {
  FiUser,
  FiTool,
  FiLayers,
  FiBell,
  FiMonitor,
  FiAlertCircle,
} from 'react-icons/fi'
=======
import { Button } from '@/components/custom/button'
>>>>>>> 472fa567487578daf6c3acf798ad16490a1923e9
import { Layout } from '@/components/custom/layout'
import { Form } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { IoPersonCircle } from 'react-icons/io5'
import { MdEmail } from 'react-icons/md'
import { FormSettings } from './components/form-settings'
import {
  dataFormSettingsSelectLeft,
  dataFormSettingsSelectRight,
} from '@/utils/constant'

export default function Settings() {
  const form = useForm()
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
          <div className='items-center justify-between space-y-2 lg:flex lg:space-y-0 '>
            <div className='flex items-center space-x-4'>
              <IoPersonCircle className='h-16 w-16' />
              <div>
                <p className='font-medium dark:text-primary'>Marco</p>
                <p className='text-muted-foreground'>marcoganteng@gmail.com</p>
              </div>
            </div>
            <div className='space-x-2'>
              <Button className='w-28 bg-colorPrimary text-primary hover:text-textPrimary '>
                Change Picture
              </Button>
              <Button className='w-28 bg-primary text-red-500'>
                Remove Picture
              </Button>
            </div>
          </div>
          <div></div>
        </section>

        {/* Form */}
        <section className='5 grid grid-cols-2 gap-4'>
          <Form {...form}>
            <FormSettings
              data={dataFormSettingsSelectLeft}
              name='settings'
              label='Fullname'
              placeholder='Your Fullname'
            />
            <FormSettings
              data={dataFormSettingsSelectRight}
              name='settings'
              label='Nickname'
              placeholder='Your Nickname'
            />
          </Form>
          <Button className='w-28 bg-colorPrimary text-primary hover:text-textPrimary '>
            Confirm
          </Button>
        </section>

        {/* Email */}
        <section>
          <h2 className='light:text-textPrimary mb-2 font-bold'>
            My email Address
          </h2>
          <div className='flex items-center space-x-3'>
            <MdEmail
              fill='#8A3DFF'
              className='h-8 w-8 rounded-full p-1 dark:bg-muted-foreground'
            />
            <div>
              <p className='text-sm dark:text-primary'>
                marcoganteng@gmail.com
              </p>
              <p className='text-sm text-muted-foreground'>1 month ago</p>
            </div>
          </div>
        </section>
      </Layout.Body>
    </Layout>
  )
}
<<<<<<< HEAD

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <FiUser size={18} />,
    href: '/settings',
  },
  {
    title: 'Account',
    icon: <FiTool size={18} />,
    href: '/settings/account',
  },
  {
    title: 'Appearance',
    icon: <FiLayers size={18} />,
    href: '/settings/appearance',
  },
  {
    title: 'Notifications',
    icon: <FiBell size={18} />,
    href: '/settings/notifications',
  },
  {
    title: 'Display',
    icon: <FiMonitor size={18} />,
    href: '/settings/display',
  },
  {
    title: 'Error Example',
    icon: <FiAlertCircle size={18} />,
    href: '/settings/error-example',
  },
]
=======
>>>>>>> 472fa567487578daf6c3acf798ad16490a1923e9
