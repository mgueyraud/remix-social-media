import type { ComponentPropsWithoutRef } from "react";

type PostProps = ComponentPropsWithoutRef<"div"> & {
  header?: string;
  children: React.ReactNode;
  userName?: string;
};

export default function Post({ header, children, userName }: PostProps) {
  return (
    <div className="flex flex-col p-6 max-w-md border rounded">
      {header && <h2 className="font-bold text-3xl text-gray-900">{header}</h2>}
      {userName && <p className="text-gray-700 italic">{userName}</p>}
      <p className="mt-4 text-lg text-gray-900">{children}</p>
    </div>
  );
}
