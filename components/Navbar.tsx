import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  // temporarily ignoring.
  // @ts-ignore
  const { user, username } = { user: true, username: true };

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button>FEED</button>
          </Link>
        </li>

        {username && (
          <>
            <li>
              <Link href="/admin">
                <button>
                  WRITE POSTS
                </button>
              </Link>
            </li>
            <li>
              <Link href="{`/${username}`}">
                <Image alt="Your user profile" src={user?.photoURL} />
              </Link>
            </li>
          </>
        )}

        {!username && (
          <>
            <li>
              <Link href="/enter">
                <button>log in</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default Navbar;