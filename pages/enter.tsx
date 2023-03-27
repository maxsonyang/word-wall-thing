import { auth, googleAuthProvider } from '../lib/firebase'
import Image from 'next/image';

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
  const getAuthProp = () => {
    if (!user) return <SignInButton />
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
  return <></>;
};

export default Enter;
