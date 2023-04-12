import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Navbar from '../components/Navbar'
import { NotificationsProvider } from '@mantine/notifications';
import '../styles/globals.css'
import { useRouter } from 'next/router';

interface TokenType {
  value: any;
}

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const [token, setToken] = useState<TokenType>({ value: null })
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setToken({ value: token })
    } else {
      setToken({ value: null })
    }
  }, [router.query])

  return <>
    <Head>
      <title>Notx</title>
    </Head>
    <NotificationsProvider>
      <Navbar token={token} />
      <Component {...pageProps} />
    </NotificationsProvider>
  </>
}

export default MyApp
