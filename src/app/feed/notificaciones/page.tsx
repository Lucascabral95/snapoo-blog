import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "@/infrastructure/auth/session";
import UserNotification from "@/models/UserNotification";
import mongo from "@/services/mongoDB";

export default async function NotificationsPage() {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/login");
  await mongo();
  const notifications = await UserNotification.find({ recipient: user.id }).sort({ createdAt: -1 }).limit(50).lean();
  return <main style={{ maxWidth: 760, margin: "40px auto", padding: "0 24px" }}>
    <h1>Notificaciones</h1>
    {notifications.length === 0 ? <p>No tenés notificaciones nuevas.</p> : <ul>{notifications.map((notification) => <li key={String(notification._id)}><strong>{notification.title}</strong><p>{notification.body}</p></li>)}</ul>}
  </main>;
}
