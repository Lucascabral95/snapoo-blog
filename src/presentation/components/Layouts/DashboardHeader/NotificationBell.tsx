"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Bell } from "lucide-react";
import styles from "./DashboardHeader.module.scss";

export default function NotificationBell() {
  const [unread, setUnread] = useState(0);
  useEffect(() => { fetch("/api/notifications", { cache: "no-store" }).then((r) => r.ok ? r.json() : null).then((data) => setUnread(data?.unread ?? 0)).catch(() => undefined); }, []);
  return <Link href="/feed/notificaciones" className={styles.notificationBell} aria-label="Notificaciones"><Bell size={17} />{unread > 0 && <span className={styles.notificationBadge}>{unread > 99 ? "99+" : unread}</span>}</Link>;
}
