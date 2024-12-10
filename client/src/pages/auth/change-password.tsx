import { Card } from '@/components/ui/card'
import { Link } from 'react-router-dom'
import { imagetextIL } from '@/components/assets/images'
import FormPassword from './components/form-password'
import { Button } from '@/components/ui/button'

function ChangePassword() {
  return (
    <div className='container grid h-svh flex-col items-center justify-center bg-primary-foreground md:max-w-none md:px-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[480px] md:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <img src={imagetextIL} alt='Infinite Learning' />
        </div>
        <Card className='p-6'>
          <Button
            asChild
            type='button'
            className='mb-3 bg-secondary text-white hover:text-secondary'
          >
            <Link to='/forgot-password'>Back</Link>
          </Button>

          <div className='mb-2 flex flex-col space-y-2 text-left'>
            <h1 className='text-md font-semibold tracking-tight'>
              Secure Your Account
            </h1>
            <p className='text-justify text-sm text-muted-foreground'>
              Update your password to ensure the safety of your personal
              information. Enter your new password below and confirm it to make
              the changes.
            </p>
          </div>
          <FormPassword />
          <p className='mt-4 px-8 text-center text-sm text-muted-foreground'>
            Don't have an account?{' '}
            <Link
              to='/sign-up'
              className='underline underline-offset-4 hover:text-primary'
            >
              Sign up
            </Link>
            .
          </p>
        </Card>
      </div>
    </div>
  )
}
export default ChangePassword
