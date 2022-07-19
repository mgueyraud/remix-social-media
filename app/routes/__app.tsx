import { json, LoaderFunction, LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import Nav from "~/components/Nav";
import { authenticator, SessionUser } from "../services/auth.server";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await authenticator.isAuthenticated(request);

  return json({ user });
};

export default function App() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="max-w-6xl mx-4 md:mx-10">
      <Nav user={user as SessionUser | null} />
      <Outlet />
    </div>
  );
}
