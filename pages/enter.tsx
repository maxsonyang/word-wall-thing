import { useState, useContext, useEffect, useCallback } from 'react';
import { auth, firestore, googleAuthProvider } from '../lib/firebase';
import { UserContext } from '@/lib/context';
import Image from 'next/image';
import { debounce } from 'lodash';

type EntryProps = {
  user: 'string',
  username: 'string'
}

const Enter = ({ user, username }: EntryProps) => {

  /**
   * Shows components depending on three cases:
   * 1. if user is signed out, show the sign-in button.
   * 2. If the user is signed in but does not have a username, show username form
   * 3. Otherwise show the signout button.
   */

  useEffect(() => {
    console.log('user + name', { user, username })
  })

  const getAuthProp = () => {
    if (user) return <SignInButton />
    if (!username) return <UserNameForm />
    return <SignOutButton />
  };

  return <main>
    {getAuthProp()}
  </main>;
};

const SignInButton = () => {

  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  }

  return <button onClick={signInWithGoogle}>
    <Image width="50" height="50" alt="sign in with google" src="/google.png" />
  </button>
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>
    Sign Out
  </button>
};

const UserNameForm = () => {

  const [formValue, setFormValue] = useState('');
  const [isValid, toggleIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, username } = useContext(UserContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUserName = useCallback(debounce(async (username: string) => {
    if (username.length >= 3) {
      // Do something with db.
      const ref = firestore.doc(`usernames/${username}`);
      const { exists } = await ref.get();
      console.log('read from firestore')
      toggleIsValid(!exists);
      setLoading(false);
    }
  }, 500), []);

  useEffect(() => {
    checkUserName(formValue)
  }, [formValue, checkUserName])

  const onSubmit = () => { };

  const onChange = (e) => {
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    setFormValue(val);
    if (val.length < 3) {
      setLoading(false);
      toggleIsValid(false);
    }
    if (re.test(val)) {
      setLoading(true);
      toggleIsValid(false);
    }
  };

  return (
    <section>
      <h3>
        Choose Username
      </h3>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          Username
        </label>
        <input
          type="text"
          name='username'
          id='username'
          placeholder='username'
          value={formValue}
          onChange={onChange} />

        <button type="submit" disabled={!isValid}>
        </button>
        <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
      </form>
    </section>
  )
};

export default Enter;
