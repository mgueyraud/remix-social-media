import { Link } from "@remix-run/react";
import Button from "../Button";
import { SessionUser } from "../../services/auth.server";

function Nav({ user }: { user: SessionUser | null }) {
  return (
    <nav className="mb-10 flex items-center justify-between">
      <Link to="/">
        <h1 className="text-slate-800 text-2xl">Remix Social</h1>
      </Link>
      <ul className="flex items-center">
        {!user ? (
          <>
            <li className="flex">
              <Button as={Link} to="/login" className="flex">
                Login
              </Button>
            </li>
            <li className="flex">
              <Button as={Link} to="/signup" className="flex">
                Create an Account
              </Button>
            </li>
          </>
        ) : (
          <>
            <li className="flex">
              <p className="text-slate-600">{user.email}</p>
            </li>
            <li className="flex ml-2">
              <form method="post" action="/logout">
                <Button>Log Out</Button>
              </form>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
