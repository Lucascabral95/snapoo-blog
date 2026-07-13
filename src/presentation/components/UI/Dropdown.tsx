import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Dropdown.module.scss";

export function Dropdown({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={[styles.dropdown, className].filter(Boolean).join(" ")}>{children}</div>;
}

export function DropdownItem({
  href,
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement> &
  Pick<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & { children: ReactNode }) {
  const classes = [styles.item, className].filter(Boolean).join(" ");

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}

export function DropdownDivider() {
  return <div className={styles.divider} />;
}
