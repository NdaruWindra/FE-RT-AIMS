import { UserAuthForm } from './components/user-auth-form'
import Banner from './components/banner'
import { imageIL } from '@/components/assets/images'

export default function SignIn() {
  return (
    <>
      <div className='container flex justify-between h-screen md:gap-10'>
        {/* Banner */}
        <Banner />

        {/* Header */}
        <div className='mx-auto flex flex-col justify-center space-y-4'>
          <div className='mt-8 flex justify-center '>
            <div className='h-20 w-52 overflow-hidden rounded-full'>
              <img src={imageIL} alt='imageIL' className='-mt-10 w-full' />
            </div>
          </div>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight text-textPrimary'>
              Welcome Back to Infinite Learning
            </h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email and password to continue
            </p>
          </div>

          {/* Form */}
          <UserAuthForm />
        </div>
      </div>
    </>
  )
}
