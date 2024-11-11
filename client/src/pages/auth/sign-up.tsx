import { SignUpForm } from './components/sign-up-form'
import { imageIL } from '@/components/assets/images'
import Banner from './components/banner'

export default function SignUp() {
  return (
    <>
      <div className='container flex justify-between md:gap-10'>
        {/* Header */}
        <div className='mx-auto flex flex-col justify-center space-y-4'>
          <div className='mt-5 flex justify-center '>
            <div className='h-20 w-52 overflow-hidden rounded-full'>
              <img src={imageIL} alt='imageIL' className='-mt-10 w-full' />
            </div>
          </div>
          <div className='space-y-2 text-center'>
            <h1 className='text-2xl font-medium tracking-tight text-textPrimary'>
              Create an account
            </h1>
            <p className='text-sm text-muted-foreground'>
              Create account now and get 30 minutes credit for free
            </p>
          </div>

          {/* Form */}
          <SignUpForm />
        </div>

        {/* Banner */}
        <Banner />
      </div>
    </>
  )
}
