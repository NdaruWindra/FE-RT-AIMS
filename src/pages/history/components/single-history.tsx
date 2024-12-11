import { Button } from '@/components/custom/button'
import { useGetSingleHistoryQuery } from '@/features/history/historyThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { IoMdArrowRoundBack } from 'react-icons/io'
import { Link, useParams } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Separator } from '@/components/ui/separator'

function SingleHistory() {
  const { idHistory } = useParams()
  const { accessToken } = useAppSelector((store) => store.user)
  const history = useAppSelector((store) => store.history)

  const { data, isLoading } = useGetSingleHistoryQuery(
    {
      accessToken,
      idHistory,
    },
    { refetchOnMountOrArgChange: true }
  )

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <section className='w-full'>
      <Button asChild variant={'outline'} className='mt-5 bg-colorPrimary'>
        <Link to='/dashboard/history'>
          <IoMdArrowRoundBack />
          Back
        </Link>
      </Button>

      <h1 className='mt-3 text-base font-semibold text-gray-500 dark:text-white '>
        {data.data?.title}
      </h1>
      <Separator className='my-4' />

      <div className='mt-5 flex w-full flex-col gap-5 lg:flex-row-reverse'>
        {/* TRANSCRIPT */}

        <div className='flex flex-col  lg:w-1/2 '>
          <h1 className='text-start text-xl font-bold text-white dark:text-colorPrimary md:text-2xl'>
            Transcript :
          </h1>
          <div className=' h-96 overflow-auto rounded-2xl border border-gray-300 '>
            <Table>
              <TableHeader className=' bg-gray-800'>
                <TableRow>
                  <TableHead>No</TableHead>
                  <TableHead className='py-2 text-center'>Transcript</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {history.singleHistory.result?.transcript?.map(
                  (data: any, index: number) => (
                    <TableRow key={index} className='h-14 text-base'>
                      <TableCell className='py-2 '>-</TableCell>
                      <TableCell className='w-full py-2'>{data}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        {/* SUMMARY */}

        <div className='flex flex-col lg:w-1/2'>
          <h1 className=' text-xl font-bold text-white dark:text-colorPrimary md:text-2xl'>
            Summary
          </h1>
          <p className='text-justify text-base  text-colorSecondary dark:text-white'>
            {history.singleHistory.result?.summary.replaceAll('-', ' ')}
          </p>
        </div>
      </div>
    </section>
  )
}
export default SingleHistory
