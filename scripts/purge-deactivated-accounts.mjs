const baseUrl = (process.env.NEXTAUTH_URL || "").replace(/\/$/, "");
const token = process.env.ACCOUNT_PURGE_JOB_TOKEN;
if (!baseUrl) throw new Error("NEXTAUTH_URL is required");
if (!token || token.length < 32) throw new Error("ACCOUNT_PURGE_JOB_TOKEN must contain at least 32 characters");
const response = await fetch(`${baseUrl}/api/admin/account-purge`, { method: "POST", headers: { authorization: `Bearer ${token}`, accept: "application/json" } });
const body = await response.json().catch(() => ({}));
if (!response.ok) throw new Error(`Account purge failed (${response.status}): ${body.message || body.code || "unknown error"}`);
console.log(JSON.stringify({ job: "account-purge", ...body }));
