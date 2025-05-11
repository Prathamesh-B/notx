import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { useState, useEffect } from 'react'
import type { AppProps } from 'next/app'
import Head from 'next/head';
import Navbar from '../components/Navbar'
import { Notifications } from '@mantine/notifications';
import '../styles/globals.css'
import { useRouter } from 'next/router';
import { MantineProvider } from '@mantine/core';


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

  return (
    <MantineProvider >
      <Head>
        <title>Notx</title>
      </Head>
      <Notifications />
      <Navbar token={token} />
      <Component {...pageProps} />
    </MantineProvider>
  )
}

export default MyApp
