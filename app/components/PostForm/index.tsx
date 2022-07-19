import type { ComponentPropsWithoutRef } from "react";
import Button from "../Button";

type PostFormProps = ComponentPropsWithoutRef<"form"> & {
  error?: {
    formErrors: string[];
    fieldErrors: {
      body?: string[] | undefined;
      title?: string[] | undefined;
    };
  };
  fields?: {
    title: string;
    body: string;
  };
};

export default function PostForm({
  method = "post",
  error,
  fields,
  ...rest
}: PostFormProps) {
  return (
    <form method={method} className="flex flex-col gap-4" {...rest}>
      <div className="mb-4 flex flex-col">
        <label htmlFor="title" className="mb-2 text-gray-600">
          Title
        </label>
        <input
          className="p-4"
          name="title"
          placeholder="Title of your post"
          defaultValue={fields?.title}
        />
        {error?.fieldErrors?.title && (
          <p className="text-red-500">{error?.fieldErrors?.title}</p>
        )}
      </div>
      <div className="mb-8 flex flex-col">
        <label htmlFor="body" className="mb-2 text-gray-600">
          Body
        </label>
        <textarea
          className="p-4"
          name="body"
          placeholder="Write something amazing"
          defaultValue={fields?.body}
        />
        {error?.fieldErrors?.body && (
          <p className="text-red-500">{error?.fieldErrors?.body}</p>
        )}
      </div>
      <Button type="submit">Create Post</Button>
    </form>
  );
}
