import { ActionArgs, json, redirect } from "@remix-run/node";
import UserForm from "~/components/UserForm";
import { userSignUp } from "~/services/user.server";
import { SignUp as SignUpValidation } from "~/services/validations";
import { useActionData } from "@remix-run/react";
import { checkUserExists } from "../../../services/user.server";

export function badRequest<TActionData>(data: TActionData, status = 400) {
  return json<TActionData>(data, { status });
}

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const rawEmail = form.get("email");
  const rawPassword = form.get("password");

  if (typeof rawEmail !== "string" || typeof rawPassword !== "string") {
    return badRequest({
      error: { formError: ["Form not submitted correclty"] },
      fields: {},
    });
  }

  if (await checkUserExists(rawEmail)) {
    return badRequest({
      error: { formError: ["User already exists"] },
      fields: {},
    });
  }

  const fields = { email: rawEmail, password: rawPassword };

  const result = SignUpValidation.safeParse(fields);

  if (!result.success) {
    const error = result.error.flatten();

    return badRequest({ fields, error });
  }

  await userSignUp(rawEmail, rawPassword);

  return redirect("/login");
}

export default function SignUp() {
  const { error, fields } = useActionData<typeof action>() ?? {};

  return (
    <div>
      <h1 className="text-xl text-slate-800 mb-8">Sign up</h1>
      <UserForm error={error} fields={fields} />
    </div>
  );
}
