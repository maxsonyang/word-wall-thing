import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import { UserContext } from "@/lib/context";

const Navbar = () => {
  // temporarily ignoring.
  // @ts-ignore
  const { user, username } = useContext(UserContext);

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
              <Link href={`/${username}`}>
                <Image width={50} height={50} alt="Your user profile" src={user?.photoURL} />
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