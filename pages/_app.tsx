// INTERNAL LIBRARIES
import Navbar from '@/components/Navbar'
import '@/styles/globals.scss'
import { UserContext } from '@/lib/context';
import { auth, firestore } from '@/lib/firebase';

// EXTERNAL LIBRARIES
import type { AppProps } from 'next/app'
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }: AppProps) {

  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        let data = doc.data()
        if (data) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      });
    }

    return unsubscribe;
  }, [user])

  // @ts-ignore
  return <UserContext.Provider value={{ user, username }}>
    <Navbar />
    <Component {...pageProps} />
    <Toaster />
  </UserContext.Provider>
}
