import { auth, googleAuthProvider } from '../lib/firebase'

const Enter = ({ user, username }) => {

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
    await auth.signInWith
  }

  return <></>;
};

const SignOutButton = () => {
  return <></>;
};

const UserNameForm = () => {
  return <></>;
};

export default Enter;
