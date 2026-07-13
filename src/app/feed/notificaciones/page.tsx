import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import NotificationCenter from "./NotificationCenter";
export default async function NotificationsPage() { if (!await getAuthenticatedUser()) redirect("/login"); return <main style={{ maxWidth: 760, margin: "40px auto", padding: "0 24px" }}><h1>Notificaciones</h1><NotificationCenter /></main>; }
