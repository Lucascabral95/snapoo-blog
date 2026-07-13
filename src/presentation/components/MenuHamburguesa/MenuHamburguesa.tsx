"use client";
import type { Dispatch, SetStateAction } from "react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { X } from "lucide-react";
import { BRAND_INFO, NAV_LINKS } from "@/infrastructure/constants/navigation.constants";
import styles from "./MenuHamburguesa.module.scss";
interface MenuHamburguesaProps { setIsOpenMenu: Dispatch<SetStateAction<boolean>>; }
const DRAWER_ANIMATION = { initial: { opacity: 0, x: 40 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: 40 }, transition: { duration: 0.25 } };
export default function MenuHamburguesa({ setIsOpenMenu }: MenuHamburguesaProps) {
  const { data: session } = useSession(); const [unread, setUnread] = useState(0);
  useEffect(() => { if (session?.user) fetch("/api/notifications", { cache: "no-store" }).then((response) => response.ok ? response.json() : null).then((data) => setUnread(data?.unread ?? 0)).catch(() => undefined); }, [session?.user]);
  const handleClose = () => setIsOpenMenu(false);
  return <motion.div {...DRAWER_ANIMATION} className={styles.drawer}><div className={styles.top}><span className={styles.logo}>{BRAND_INFO.name}</span><button type="button" className={styles.close} onClick={handleClose} aria-label="Cerrar menú"><X size={18} /></button></div>{session?.user && <Link href="/feed/notificaciones" className={styles.link} onClick={handleClose}>Notificaciones {unread > 0 && <span aria-label="notificaciones no leídas">({unread > 99 ? "99+" : unread})</span>}</Link>}{NAV_LINKS.map((link) => <Link key={link.href} href={link.href} className={styles.link} onClick={handleClose}>{link.label}</Link>)}{session?.user && <Link href={`/usuario/perfil/${session.user.userName ?? ""}`} className={styles.link} onClick={handleClose}>Perfil</Link>}<Link href="/feed/ajustes" className={styles.link} onClick={handleClose}>Ajustes</Link>{session?.user ? <button type="button" className={`${styles.link} ${styles.logout}`} onClick={() => signOut()}>Cerrar sesión</button> : <button type="button" className={styles.link} onClick={() => signIn()}>Iniciar sesión</button>}</motion.div>;
}
