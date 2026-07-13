export const CRITICAL_REPORT_REASONS = new Set(["violence_threats", "child_safety", "self_harm"]);
export const MODERATOR_SUSPENSION_DAYS = [1, 7, 30] as const;

export function getModerationRetentionDays(value = process.env.MODERATION_RETENTION_DAYS): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 30 && parsed <= 3650 ? parsed : 730;
}

export function getReportLimit(value = process.env.MAX_REPORTS_PER_HOUR): number {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed >= 1 && parsed <= 100 ? parsed : 10;
}

export function getBootstrapAdminEmail(value = process.env.MODERATION_BOOTSTRAP_ADMIN_EMAIL): string | null {
  const email = value?.trim().toLowerCase();
  return email || null;
}
