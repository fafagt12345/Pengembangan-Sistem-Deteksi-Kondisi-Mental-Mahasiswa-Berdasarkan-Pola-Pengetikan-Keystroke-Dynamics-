import * as React from "react";
import clsx from "clsx";

type CardProps = React.HTMLAttributes<HTMLDivElement>;

type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;

type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;

type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function Card({ className, ...props }: CardProps) {
  return <div className={clsx("rounded-3xl border border-slate-800 bg-slate-900 shadow-lg", className)} {...props} />;
}

export function CardHeader({ className, ...props }: CardHeaderProps) {
  return <div className={clsx("space-y-2 p-6", className)} {...props} />;
}

export function CardTitle({ className, ...props }: CardTitleProps) {
  return <h3 className={clsx("text-lg font-semibold text-white", className)} {...props} />;
}

export function CardContent({ className, ...props }: CardContentProps) {
  return <div className={clsx("p-6", className)} {...props} />;
}
