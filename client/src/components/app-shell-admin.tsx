import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './sidebar-admin'
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
  BreadcrumbSeparator,
} from './ui/breadcrumb'
import { ProtectedRoutes } from '@/pages/auth/protected-routes'

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

const AppShell = () => {
  const [isCollapsed] = useIsCollapsed()
  const location = useLocation()

  function generateBreadcrumbs(): React.ReactNode[] {
    const paths = location.pathname.split('/').filter((path) => path)

    const breadcrumbItems: React.ReactNode[] = paths.map((segment, index) => {
      const routeTo = `/${paths.slice(0, index + 1).join('/')}`
      const isLast = index === paths.length - 1

      return (
        <BreadcrumbItem key={routeTo}>
          {isLast ? (
            <span className='text-gray-500'>{capitalize(segment)}</span>
          ) : (
            <BreadcrumbLink href={routeTo} className='capitalize'>
              {capitalize(segment)}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      )
    })

    return breadcrumbItems.reduce((acc: React.ReactNode[], curr, index) => {
      if (index < paths.length - 1) {
        return acc.concat(
          curr,
          <BreadcrumbSeparator key={`separator-${index}`} />
        )
      }
      return acc.concat(curr)
    }, [])
  }

  return (
    <ProtectedRoutes>
      <div className='relative flex h-full bg-background'>
        <SkipToMain />

        <main
          id='content'
          className={`flex w-full flex-col overflow-x-hidden pt-16 transition-[margin] ${
            isCollapsed ? 'md:ml-14' : 'md:ml-64'
          } h-full`}
        >
          <Layout>
            <Layout.Header className='fixed left-0 top-0 z-10 w-full bg-background shadow-md'>
              <Sidebar />
              <Breadcrumb className='md:ml-[17rem]'>
                <BreadcrumbList>{generateBreadcrumbs()}</BreadcrumbList>
              </Breadcrumb>

              <div className='ml-auto flex items-center space-x-4 p-4'>
                <ThemeSwitch />
                <UserNav />
              </div>
            </Layout.Header>

            <div className='ml-auto flex items-center space-x-4 px-8 md:px-12'>
              <Outlet />
            </div>
          </Layout>
        </main>
      </div>
    </ProtectedRoutes>
  )
}

export default AppShell
