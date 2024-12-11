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
import { useFetchUpdatePasswordMutation } from '@/features/user/userThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z
  .object({
    NewPassword: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
    ConfirmPassword: z.string(),
  })
  .refine((data) => data.NewPassword === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ['ConfirmPassword'],
  })

function FormPassword() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [fetchUpdatePassword] = useFetchUpdatePasswordMutation()
  const { isLoading } = useAppSelector(function (state) {
    return state.user
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { NewPassword: '', ConfirmPassword: '' },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await fetchUpdatePassword({ ...data, token })

    navigate('/sign-in')
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className='grid gap-2'>
          <FormField
            control={form.control}
            name='NewPassword'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='New Password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='ConfirmPassword'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Confirm Password'
                    type='password'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type='submit'
            className='mt-2 bg-colorPrimary text-primary hover:text-textPrimary'
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Save Password'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default FormPassword
