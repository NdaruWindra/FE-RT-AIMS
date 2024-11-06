import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import useIsCollapsed from '@/hooks/use-is-collapsed'
import SkipToMain from './skip-to-main'
import { Layout } from './custom/layout'
import ThemeSwitch from './theme-switch'
import { UserNav } from './user-nav'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb'

export default function AppShell() {
  const [isCollapsed] = useIsCollapsed()

  return (
    <div className='relative flex h-full bg-background'>
      <SkipToMain />

      <main
        id='content'
        className={`flex w-full flex-col overflow-x-hidden pt-16 transition-[margin] ${isCollapsed ? 'md:ml-14' : 'md:ml-64'} h-full`}
      >
        <Layout>
          <Layout.Header className='fixed left-0 top-0 z-10 w-full bg-background shadow-md'>
            <Sidebar />
            <Breadcrumb className='md:ml-[17rem]'>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href='/components'>Components</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <div className='ml-auto flex items-center space-x-4 p-4'>
              <ThemeSwitch />
              <UserNav />
            </div>
          </Layout.Header>

          <div className='ml-auto flex items-center space-x-4 px-8 md:px-12 '>
            <Outlet />
          </div>
        </Layout>
      </main>
    </div>
  )
}
