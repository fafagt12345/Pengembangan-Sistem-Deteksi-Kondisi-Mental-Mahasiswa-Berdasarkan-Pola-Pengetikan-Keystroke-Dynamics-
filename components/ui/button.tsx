import * as React from "react";
import clsx from "clsx";

type ButtonVariants = "default" | "ghost";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariants;
};

const buttonStyles: Record<ButtonVariants, string> = {
  default:
    "inline-flex items-center justify-center rounded-xl border border-transparent bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none",
  ghost:
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold text-slate-200 transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 disabled:opacity-50 disabled:pointer-events-none",
};

export function Button({ className, variant = "default", ...props }: ButtonProps) {
  return <button className={clsx(buttonStyles[variant], className)} {...props} />;
}
