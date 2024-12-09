import { useEffect } from 'react'
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
import { useForm } from 'react-hook-form'
import { IoMdClose } from 'react-icons/io'
import { useUpdateHistoryMutation } from '@/features/history/historyThunk'
import { useAppSelector } from '@/hooks/use-redux'

function ModalHistory({
  handleEdit,
  edit,
  idHistory,
  historyData,
}: {
  handleEdit: (edit: boolean, id?: string) => void
  edit: boolean
  idHistory: string | null
  historyData: { id_history: string; title: string } | null
}) {
  const form = useForm({
    defaultValues: {
      title: '',
    },
  })
  const [updateHistory, { isLoading }] = useUpdateHistoryMutation()
  const { accessToken } = useAppSelector((store) => store.user)

  useEffect(() => {
    if (historyData) {
      form.reset({ title: historyData.title })
    }
  }, [historyData])

  const onSubmit = async (data: { title: string }) => {
    await updateHistory({
      accessToken,
      title: data.title,
      history_id: idHistory,
    })
    handleEdit(false)
  }

  return (
    <>
      <div
        className={`fixed left-0 right-0 top-0 z-50 h-[calc(100%-1rem)] max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-white/10 backdrop-blur-sm md:inset-0 ${edit ? 'flex' : 'hidden'}`}
      >
        <div className='relative max-h-full w-full max-w-2xl p-4'>
          <div className='relative rounded-lg bg-white shadow dark:bg-gray-700'>
            <div className='flex items-center justify-between rounded-t border-b p-4 dark:border-gray-600 md:p-5'>
              <h3 className='text-xl font-semibold text-gray-900 dark:text-white'>
                Update History
              </h3>

              <Button
                type='button'
                className='bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900'
                onClick={() => handleEdit(false)}
              >
                <IoMdClose className='h-5 w-5' />
                <span className='sr-only'>Close modal</span>
              </Button>
            </div>
            <div className='space-y-4 p-4 md:p-5 md:pt-2'>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FormField
                    control={form.control}
                    name='title'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input placeholder='Title' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className='mt-5 flex gap-5'>
                    <Button
                      type='submit'
                      className='bg-colorPrimary text-white hover:bg-white hover:text-colorSecondary'
                      disabled={isLoading}
                    >
                      {isLoading ? 'Loading...' : 'Update'}
                    </Button>

                    <Button
                      type='button'
                      className='bg-red-500 text-white hover:bg-red-700'
                      onClick={() => handleEdit(false)}
                      disabled={isLoading}
                    >
                      Decline
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default ModalHistory
