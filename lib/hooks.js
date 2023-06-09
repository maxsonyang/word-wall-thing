import { auth, firestore } from '@/lib/firebase';
import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        let data = doc.data();
        if (data) {
          setUsername(data.username);
        } else {
          setUsername(null);
        }
      });
    }

    return unsubscribe;
  }, [user]);
  
  return { user, username }
};
