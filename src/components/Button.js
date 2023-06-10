import React from "react";
import className from "classnames";
export default function Buttonn({
  children,
  onClick,
  primary,
  secondary,
  success,
  warning,
  danger,
  outline,
  rounded,
}) {
  const classes = className("px-3 py-1.5 border", {
    "border-gray-500 bg-gray-300 text-gray": primary,
    "border-gray-400 bg-gray-200 text-gray": secondary,
    "border-green-500 bg-green-500 text-white": success,
    "border-yellow-400 bg-yellow-400 text-white": warning,
    "border-red-500 bg-red-500 text-white": danger,
    "rounded-full": rounded,
    "bg-white": outline,
  });
  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
