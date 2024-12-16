import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Tabs, TabsContent } from '@/components/ui/tabs'
import { Overview } from './components/overview'

export default function Dashboard() {
  return (
    <div className='w-full '>
      {/* ===== Main ===== */}
      <div className='my-5'>
        <h1 className='text-2xl  tracking-tight'>Dashboard</h1>
      </div>
      <Tabs
        orientation='vertical'
        defaultValue='overview'
        className='space-y-4'
      >
        <TabsContent value='overview' className='w-full space-y-4 '>
          <div className='w-full '>
            <Card>
              <CardHeader>
                <CardTitle>Total History</CardTitle>
              </CardHeader>
              <CardContent className='pl-2'>
                <Overview />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
