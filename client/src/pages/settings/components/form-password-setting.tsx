import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  useFetchRefreshTokenMutation,
  useFetchUpdateMyPasswordMutation,
} from '@/features/user/userThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchemaPassword = z
  .object({
    OldPassword: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }),
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

function FormPasswordSetting({
  isEditing,
  setIsEditing,
}: {
  isEditing: boolean
  setIsEditing: (isEditing: boolean) => void
}) {
  const { accessToken, refreshToken, isLoading } = useAppSelector(
    function (store) {
      return store.user
    }
  )
  const [fetchRefreshToken] = useFetchRefreshTokenMutation()
  const [fetchUpdateMyPassword] = useFetchUpdateMyPasswordMutation()

  const formPassword = useForm<z.infer<typeof FormSchemaPassword>>({
    resolver: zodResolver(FormSchemaPassword),
    defaultValues: {
      OldPassword: '',
      NewPassword: '',
      ConfirmPassword: '',
    },
  })

  const onSubmitPassword = async () => {
    const formValue = formPassword.getValues()

    await fetchUpdateMyPassword({
      oldPassword: formValue.OldPassword,
      newPassword: formValue.NewPassword,
      confirmPassword: formValue.ConfirmPassword,
      accessToken,
    })

    await fetchRefreshToken(refreshToken)

    setIsEditing(false)
  }

  return (
    <section className='lg:w-1/2'>
      <h1
        className='mb-4 text-lg font-semibold
  '
      >
        Change Password
      </h1>

      <Form {...formPassword}>
        <form
          onSubmit={formPassword.handleSubmit(onSubmitPassword)}
          className='grid w-full grid-cols-1 items-center gap-4'
        >
          <FormField
            control={formPassword.control}
            disabled={!isEditing}
            name='OldPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Old Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Old Password'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={formPassword.control}
            disabled={!isEditing}
            name='NewPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='New Password'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={formPassword.control}
            disabled={!isEditing}
            name='ConfirmPassword'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Confirm Password'
                    type='password'
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>

      <Button
        disabled={!isEditing || isLoading}
        type='submit'
        onClick={onSubmitPassword}
        className='mt-5 w-fit bg-green-500 text-white hover:bg-green-600'
      >
        Save Password
      </Button>
    </section>
  )
}
export default FormPasswordSetting
