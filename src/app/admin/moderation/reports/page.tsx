import { redirect } from "next/navigation";
import Link from "next/link";
import { getStaffUser } from "@/infrastructure/auth/session";
import ModerationReport from "@/models/ModerationReport";
import mongo from "@/services/mongoDB";

export default async function ModerationReportsPage() {
  const staff = await getStaffUser();
  if (!staff) redirect("/login");
  await mongo();
  const reports = await ModerationReport.find({ status: { $in: ["open", "in_review"] } }).sort({ priority: -1, createdAt: 1 }).limit(50).lean();
  return (
    <main style={{ maxWidth: 1100, margin: "40px auto", padding: "0 24px" }}>
      <h1>Moderación</h1>
      <p><Link href="/admin/moderation/support">Abrir bandeja de soporte</Link></p>
      <p>Cola de denuncias pendientes</p>
      {reports.length === 0 ? <p>No hay denuncias pendientes.</p> : <ul>{reports.map((report) => <li key={String(report._id)} style={{ margin: "16px 0" }}><strong>{report.priority === "critical" ? "CRÍTICO · " : ""}{report.reason}</strong>{" "}<span>{report.targetType} · {report.status}</span>{" "}<small>{new Date(report.createdAt).toLocaleString("es-AR")}</small></li>)}</ul>}
    </main>
  );
}
