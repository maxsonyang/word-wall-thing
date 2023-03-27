// INTERNAL LIBRARIES
import Navbar from '@/components/Navbar'
import '@/styles/globals.scss'
import { UserContext } from '@/lib/context';
import { firestore } from '@/lib/firebase';
import { useUserData } from '@/lib/hooks';

// EXTERNAL LIBRARIES
import type { AppProps } from 'next/app'

import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {

  const { user, username } = useUserData()

  // @ts-ignore
  return <UserContext.Provider value={{ user, username }}>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
  </UserContext.Provider>
}
