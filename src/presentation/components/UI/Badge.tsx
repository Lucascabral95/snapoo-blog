import type { ReactNode } from "react";
import styles from "./Badge.module.scss";

type BadgeVariant = "default" | "accent" | "success" | "danger";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

export default function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span className={[styles.badge, styles[variant], className].filter(Boolean).join(" ")}>
      {children}
    </span>
  );
}
