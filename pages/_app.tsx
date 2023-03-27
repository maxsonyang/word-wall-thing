import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast';
import { UserContext } from '@/lib/context';

export default function App({ Component, pageProps }: AppProps) {
  // @ts-ignore
  return <UserContext.Provider value={{
    user: {},
    username: 'maxson'
  }}>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
  </UserContext.Provider>
}
