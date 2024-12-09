import { HTMLAttributes, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { FcGoogle } from 'react-icons/fc'
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
import { useAppSelector } from '@/hooks/use-redux'
import {
  useFetchRefreshTokenMutation,
  useFetchSignUpMutation,
} from '@/features/user/userThunk'

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  name: z.string().min(1, { message: 'Please enter your name' }),
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

export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const { isLoading, isAuthenticated, refreshToken } = useAppSelector(
    function (state) {
      return state.user
    }
  )
  const [fetchRefreshToken] = useFetchRefreshTokenMutation()
  const [fetchSignUp] = useFetchSignUpMutation()

  const navigate = useNavigate()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function initialRender() {
    if (refreshToken) {
      const result = await fetchRefreshToken(refreshToken).unwrap()

      if (result.status === 'success') {
        if (result.data.role?.toLowerCase() === 'user')
          return navigate('/dashboard')
        if (result.data.role?.toLowerCase() === 'admin')
          return navigate('/dashboard-admin')
      }
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await fetchSignUp(data).unwrap()

    if (result.status === 'success') return navigate('/sign-in')
  }

  // ! INITIAL RENDER
  useEffect(function () {
    if (!isAuthenticated && refreshToken) {
      initialRender()
    }
  }, [])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            {/* Input Name */}
            <FormField
              control={form.control}
              disabled={isLoading}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-3 text-background'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Enter your name'
                      {...field}
                      className='bg-inputField text-textPrimary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Input Email */}
            <FormField
              control={form.control}
              disabled={isLoading}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-2 text-background'>
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
              disabled={isLoading}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-2 text-background'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      placeholder='Enter your password'
                      {...field}
                      className='bg-inputField text-textPrimary'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Button SignUp */}
            <Button
              className='mt-5 bg-colorPrimary text-primary hover:text-textPrimary'
              loading={isLoading}
            >
              Sign Up
            </Button>

            <div className='relative my-2'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs'>
                <span className='bg-gray-500 px-2 text-white'>
                  Or login with
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              {/* Google */}
              <Button
                disabled={isLoading}
                className='w-full border hover:border-transparent hover:bg-colorPrimary hover:text-white'
                leftSection={<FcGoogle className='h-4 w-4' />}
              >
                Google
              </Button>
            </div>

            {/* to Login */}
            <div className='flex justify-center space-x-2'>
              <p className='text-muted-foreground'>Already have an account?</p>
              <Link
                to={'/sign-in'}
                className='font-medium text-background underline'
              >
                Login
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
