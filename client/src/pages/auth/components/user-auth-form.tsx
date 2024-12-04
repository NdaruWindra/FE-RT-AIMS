import { HTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FcGoogle } from 'react-icons/fc'
import { FaApple, FaGoogle } from 'react-icons/fa'
import { GoogleLogin } from '@react-oauth/google' // Import Google Login
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAppDispatch, useAppSelector } from '@/hooks/use-redux'
import { getRefreshTokenSlice, signin } from '@/features/user/userSlice'

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    })
    .min(7, {
      message: 'Password must be at least 7 characters long',
    }),
})

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const { isLoading, isAuthenticated, refreshToken } = useAppSelector(
    (state) => state.user
  )

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function initialRender() {
    if (refreshToken) {
      const result = await dispatch(getRefreshTokenSlice(refreshToken))

      if (result.payload.status === 'success') {
        if (result.payload.data.role?.toLowerCase() === 'user')
          return navigate('/dashboard')
        if (result.payload.data.role?.toLowerCase() === 'admin')
          return navigate('/dashboard-admin')
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const result = await dispatch(signin(values))

    if (result.payload.status === 'success') {
      return navigate('/dashboard')
    }
  }

  // const onGoogleSignInSuccess = async (response: any) => {
  //   const result = await dispatch(googleSignin(response.credential))
  //   if (result.payload.status === 'success') {
  //     return navigate('/dashboard')
  //   }
  // }

  const onGoogleSignInError = () => {
    console.error('Google Sign-In failed.')
  }

  useEffect(() => {
    if (!isAuthenticated && refreshToken) {
      initialRender()
    }
  }, [isAuthenticated, refreshToken]) // Tambahkan dependensi

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='grid gap-2 space-y-3'>
            {/* Input Email */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-3 text-textPrimary'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your email address'
                      {...field}
                      className='bg-inputField text-textPrimary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Password */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-3 text-textPrimary'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='Enter your password'
                      {...field}
                      className='bg-inputField text-textPrimary'
                    />
                  </FormControl>
                  <div className='flex justify-between'>
                    <div className='flex space-x-2 text-muted-foreground'>
                      <Checkbox className='bg-inputField' />
                      <Label>Remember Me</Label>
                    </div>
                    <Link
                      to='/forgot-password'
                      className='text-sm font-medium text-textPrimary underline'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button Sign In */}
            <Button
              type='submit'
              className='bg-colorPrimary text-primary hover:text-textPrimary'
              loading={isLoading}
            >
              Sign In
            </Button>
          </div>
        </form>
      </Form>

      <div className='relative'>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-foreground px-2 text-muted-foreground'>
            Or login with
          </span>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          className='w-full border hover:border-transparent hover:bg-colorPrimary'
          type='button'
          leftSection={<FaGoogle className='h-4 w-4' />}
        >
          Google
        </Button>


        {/* Apple */}
        <Button
          className='w-full border hover:border-transparent hover:bg-colorPrimary'
          type='button'
          leftSection={<FaApple className='h-4 w-4' />}
        >
          Apple
        </Button>
      </div>

      {/* to Register */}
      <div className='flex justify-center space-x-2'>
        <p className='text-muted-foreground'>Don't have an account?</p>
        <Link
          to={'/sign-up'}
          className='font-medium text-textPrimary underline'
        >
          Register
        </Link>
      </div>
    </div>
  )
}
