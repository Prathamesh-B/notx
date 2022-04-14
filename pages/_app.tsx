import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '../components/Navbar'
import { NotificationsProvider } from '@mantine/notifications';

function MyApp({ Component, pageProps }: AppProps) {
  return <>
    <NotificationsProvider>
      <Navbar />
      <Component {...pageProps} />
    </NotificationsProvider>
  </>
}

export default MyApp
