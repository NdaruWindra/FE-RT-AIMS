import { createBrowserRouter } from 'react-router-dom'
import GeneralError from './pages/errors/general-error'
import NotFoundError from './pages/errors/not-found-error'
import MaintenanceError from './pages/errors/maintenance-error'
import UnauthorisedError from './pages/errors/unauthorised-error.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    lazy: async () => ({
      Component: (await import('./pages/landing/landing-page')).default,
    }),
  },
  // Auth routes
  {
    path: '/sign-in',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-in')).default,
    }),
  },
  {
    path: '/sign-up',
    lazy: async () => ({
      Component: (await import('./pages/auth/sign-up')).default,
    }),
  },
  {
    path: '/forgot-password',
    lazy: async () => ({
      Component: (await import('./pages/auth/forgot-password')).default,
    }),
  },

  // Main routes
  {
    path: '/dashboard',
    lazy: async () => {
      const AppShell = await import('./components/app-shell')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'history',
        lazy: async () => ({
          Component: (await import('@/pages/history')).default,
        }),
      },
      {
        path: 'summarize',
        lazy: async () => ({
          Component: (await import('@/pages/summarize')).default,
        }),
      },
      {
        path: 'settings',
        lazy: async () => ({
          Component: (await import('./pages/settings')).default,
        }),
      },
    ],
  },

  // Admin routes
  {
    path: '/dashboard-admin',
    lazy: async () => {
      const AppShell = await import('./components/app-shell-admin')
      return { Component: AppShell.default }
    },
    errorElement: <GeneralError />,
    children: [
      {
        index: true,
        lazy: async () => ({
          Component: (await import('./pages/dashboard')).default,
        }),
      },
      {
        path: 'history-admin',
        lazy: async () => ({
          Component: (await import('@/pages_admin/history')).default,
        }),
      },
      {
        path: 'history-detail-admin',
        lazy: async () => ({
          Component: (await import('@/pages_admin/history/detail.tsx')).default,
        }),
      },
      {
        path: 'settings-admin',
        lazy: async () => ({
          Component: (await import('./pages_admin/settings')).default,
        }),
      },
    ],
  },

  // Error routes
  { path: '/500', Component: GeneralError },
  { path: '/404', Component: NotFoundError },
  { path: '/503', Component: MaintenanceError },
  { path: '/401', Component: UnauthorisedError },

  // Fallback 404 route
  { path: '*', Component: NotFoundError },
])

export default router
