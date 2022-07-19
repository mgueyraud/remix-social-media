import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import UserForm from "~/components/UserForm";
import { authenticator, USER_LOGIN } from "~/services/auth.server";
import { getSession } from "~/services/session.server";
import { useLoaderData } from "@remix-run/react";

export const action: ActionFunction = async ({ request }) => {
  return await authenticator.authenticate(USER_LOGIN, request, {
    successRedirect: "/",
    throwOnError: true,
    failureRedirect: "/login",
  });
};

type LoaderData = {
  error?: {
    formError: string[];
  };
};

export let loader: LoaderFunction = async ({ request }) => {
  await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });

  let session = await getSession(request.headers.get("cookie"));
  let error = session.get(authenticator.sessionErrorKey) as Error[] | Error;

  if (error) {
    return json({
      error: {
        formError: [
          "Unable to login with those credentials, please try again!",
        ],
      },
    });
  } else {
    return {};
  }
};

export default function Login() {
  const { error } = useLoaderData<typeof loader>();

  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Login</h1>
      <UserForm error={error} />
    </div>
  );
}
