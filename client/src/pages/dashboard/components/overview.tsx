import { useGetHistoryMonthlyQuery } from '@/features/history/historyThunk'
import { useAppSelector } from '@/hooks/use-redux'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

export function Overview() {
  const user = useAppSelector(function (store) {
    return store.user
  })

  const { data, isLoading } = useGetHistoryMonthlyQuery({
    accessToken: user.accessToken,
    query: 'monthly',
  })

  if (isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <ResponsiveContainer width='100%' height={350}>
      <BarChart data={data?.data}>
        <XAxis
          dataKey='name'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          dataKey='total'
          stroke='#888888'
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey='total'
          fill='currentColor'
          radius={[4, 4, 0, 0]}
          className='fill-primary'
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
