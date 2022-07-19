import React from "react";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<any> & {
  as?: React.ElementType<any>;
};

export default function Button({ as = "button", ...rest }: ButtonProps) {
  const Component = as;

  return (
    <Component
      {...rest}
      className="transition rounded text-blue-700 font-bold py-4 px-6 transparent hover:bg-gray-100"
    />
  );
}
