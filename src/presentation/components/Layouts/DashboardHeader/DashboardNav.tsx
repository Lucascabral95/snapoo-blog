"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_LINKS } from "@/infrastructure/constants/navigation.constants";
import styles from "./DashboardHeader.module.scss";

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.href;
        const Icon = link.icon;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={[styles.navItem, isActive && styles.on].filter(Boolean).join(" ")}
          >
            <Icon size={15} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
