import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { ThemeProvider } from '@/components/theme-provider'
import router from '@/router'
import '@/index.css'
import { store } from '../store'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Provider } from 'react-redux'

// Ganti dengan Client ID Google OAuth Anda
const GOOGLE_CLIENT_ID =
  '446822179575-cjj1fttvud5k33k88e4d2uv8alhjp1kf.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
)
