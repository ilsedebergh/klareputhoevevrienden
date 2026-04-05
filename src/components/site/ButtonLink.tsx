import type { ReactNode } from "react";
import Link from "next/link";

import { cn, isExternalHref, normalizeHref } from "@/lib/utils";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function ButtonLink({
  href,
  children,
  variant = "primary",
  className
}: ButtonLinkProps) {
  const normalizedHref = normalizeHref(href);
  const classes = cn(variant === "primary" ? "button" : "button-secondary", className);

  if (isExternalHref(normalizedHref)) {
    return (
      <a className={classes} href={normalizedHref} rel="noreferrer" target="_blank">
        {children}
      </a>
    );
  }

  return (
    <Link className={classes} href={normalizedHref}>
      {children}
    </Link>
  );
}
