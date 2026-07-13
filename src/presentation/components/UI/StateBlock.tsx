import type { ReactNode } from "react";
import styles from "./StateBlock.module.scss";

interface StateBlockProps {
  icon: ReactNode;
  title: string;
  description?: string;
  variant?: "default" | "error";
  action?: ReactNode;
}

export default function StateBlock({
  icon,
  title,
  description,
  variant = "default",
  action,
}: StateBlockProps) {
  return (
    <div className={styles.block}>
      <div className={[styles.icon, variant === "error" && styles.err].filter(Boolean).join(" ")}>
        {icon}
      </div>
      <h3 className={styles.title}>{title}</h3>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
