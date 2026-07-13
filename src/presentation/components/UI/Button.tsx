import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";

interface SharedProps {
  variant?: ButtonVariant;
  size?: "md" | "sm";
  pill?: boolean;
  block?: boolean;
  icon?: ReactNode;
  className?: string;
  children?: ReactNode;
}

type ButtonProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { href: string };

function buildClassName({
  variant = "primary",
  size = "md",
  pill = false,
  block = false,
  className,
}: SharedProps) {
  return [
    styles.btn,
    styles[variant],
    size === "sm" && styles.sm,
    pill && styles.pill,
    block && styles.block,
    className,
  ]
    .filter(Boolean)
    .join(" ");
}

export default function Button({ icon, children, href, ...rest }: ButtonProps | ButtonLinkProps) {
  if (href) {
    const { variant, size, pill, block, className, ...anchorRest } = rest as Omit<
      ButtonLinkProps,
      "icon" | "children" | "href"
    >;
    return (
      <Link
        href={href}
        className={buildClassName({ variant, size, pill, block, className })}
        {...anchorRest}
      >
        {icon}
        {children}
      </Link>
    );
  }

  const { variant, size, pill, block, className, ...buttonRest } = rest as Omit<
    ButtonProps,
    "icon" | "children" | "href"
  >;

  return (
    <button className={buildClassName({ variant, size, pill, block, className })} {...buttonRest}>
      {icon}
      {children}
    </button>
  );
}
