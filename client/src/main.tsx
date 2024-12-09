import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import '@/index.css'
import { store } from '../store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='85771341242-40sru29s7bf80pa9b0dsugbc3nh2n2r2.apps.googleusercontent.com'>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
)
