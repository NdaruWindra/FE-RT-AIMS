import { HTMLAttributes, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useFetchRefreshTokenMutation,
  useFetchSendTokenPasswordMutation,
} from '@/features/user/userThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { useNavigate } from 'react-router-dom'

interface ForgotFormProps extends HTMLAttributes<HTMLDivElement> {}

const formSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
})

export function ForgotForm({ className, ...props }: ForgotFormProps) {
  const { isAuthenticated, refreshToken, isLoading } = useAppSelector(
    (state) => state.user
  )

  const [fetchRefreshToken] = useFetchRefreshTokenMutation()
  const [fetchSendTokenPassword] = useFetchSendTokenPasswordMutation()

  const navigate = useNavigate()

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await fetchSendTokenPassword(data.email)
  }

  useEffect(() => {
    if (!isAuthenticated && refreshToken) {
      initialRender()
    }
  }, [isAuthenticated, refreshToken]) // Tambahkan dependensi

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='name@gmail.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className='mt-2 bg-colorPrimary text-primary hover:text-textPrimary'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Continue'}{' '}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
