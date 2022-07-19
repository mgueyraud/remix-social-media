import { ActionArgs, json, redirect, LoaderArgs } from "@remix-run/node";
// import type { LoaderArgs } from "@remix-run/node";
import { createPost, getPosts } from "../../services/posts.server";
import { useActionData, useLoaderData } from "@remix-run/react";
import Post from "~/components/Post";
import PostForm from "~/components/PostForm";
import { CreatePost } from "~/services/validations";
import { authenticator } from "../../services/auth.server";

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  const data = { posts: await getPosts() };
  return json(data);
}

export async function action({ request }: ActionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  const form = await request.formData();
  const rawTitle = form.get("title") as string;
  const rawBody = form.get("body") as string;

  const result = CreatePost.safeParse({ title: rawTitle, body: rawBody });

  if (!result.success) {
    return json(
      {
        error: result.error.flatten(),
        fields: {
          title: rawTitle,
          body: rawBody,
        },
      },
      { status: 400 }
    );
  }

  await createPost({
    title: result.data.title ?? null,
    body: result.data.body,
    userId: user.id,
  });

  return redirect("/");
}

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();
  const formData = useActionData<typeof action>();

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8">
        <PostForm
          action="/?index"
          error={formData?.error}
          fields={formData?.fields}
        />
      </div>
      <ul>
        {posts.map((post) => (
          <Post
            key={post.id}
            header={post.title ?? undefined}
            userName={post.User?.email ?? undefined}
          >
            {post.body}
          </Post>
        ))}
      </ul>
    </div>
  );
}
