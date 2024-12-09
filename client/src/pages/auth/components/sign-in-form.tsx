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
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useAppSelector } from '@/hooks/use-redux'
import {
  useFetchRefreshTokenMutation,
  useFetchSignInGoogleMutation,
  useFetchSignInMutation,
} from '@/features/user/userThunk'
import { useGoogleLogin } from '@react-oauth/google'
import { toast } from '@/components/ui/use-toast'

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
  const { isAuthenticated, refreshToken, isLoading } = useAppSelector(
    (state) => state.user
  )

  const [fetchSignIn] = useFetchSignInMutation()
  const [fetchSignInGoogle] = useFetchSignInGoogleMutation()
  const [fetchRefreshToken] = useFetchRefreshTokenMutation()

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
      const resultData = await fetchRefreshToken(refreshToken).unwrap()

      if (resultData.status === 'success') {
        if (resultData?.data.role?.toLowerCase() === 'user')
          return navigate('/dashboard')
        if (resultData?.data.role?.toLowerCase() === 'admin')
          return navigate('/dashboard-admin')
      }
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const resultData = await fetchSignIn(values).unwrap()

    if (resultData.status === 'success') {
      if (resultData?.data.role?.toLowerCase() === 'user')
        return navigate('/dashboard')
      if (resultData?.data.role?.toLowerCase() === 'admin')
        return navigate('/dashboard-admin')
    }
  }

  // Google Login
  const handleLoginGoogle = useGoogleLogin({
    onSuccess: async (response: any) => {
      // Menggunakan access_token Google
      const { access_token } = response

      const resultData = await fetchSignInGoogle(access_token)

      if (resultData) {
        return navigate('/dashboard')
      }
    },
    onError: () => {
      toast({
        description: 'Failed to login with Google',
        title: 'Error',
        variant: 'destructive',
      })
    },
  })

  useEffect(() => {
    if (!isAuthenticated && refreshToken) {
      initialRender()
    }
  }, [])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          {/* Input Fields */}
          <div className='grid gap-2 space-y-3'>
            <FormField
              control={form.control}
              disabled={isLoading}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-3 text-background'>
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

            <FormField
              control={form.control}
              disabled={isLoading}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-3 text-background'>
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
                      className='text-sm font-medium text-background underline'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

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

      <div className='relative '>
        <div className='absolute inset-0 flex items-center'>
          <span className='w-full border-t' />
        </div>
        <div className='relative flex justify-center text-xs'>
          <span className='bg-gray-500 px-2 text-white'>Or login with</span>
        </div>
      </div>

      <div className='flex items-center gap-2'>
        <Button
          disabled={isLoading}
          className='w-full border hover:border-transparent hover:bg-colorPrimary hover:text-white'
          type='button'
          leftSection={<FcGoogle className='h-4 w-4' />}
          onClick={handleLoginGoogle}
        >
          Google
        </Button>
      </div>

      {/* to Login */}
      <div className='flex justify-center space-x-2'>
        <p className='text-muted-foreground'>Doesnt have an account?</p>
        <Link to={'/sign-up'} className='font-medium text-background underline'>
          Register
        </Link>
      </div>
    </div>
  )
}
