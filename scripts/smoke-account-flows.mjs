import nodemailer from "nodemailer";

const baseUrl = (process.env.NEXTAUTH_URL || "").replace(/\/$/, "");
const required = ["NEXTAUTH_SECRET", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "NODEMAILER_EMAIL", "NODEMAILER_TOKEN"];
const missing = required.filter((name) => !process.env[name]);
if (!baseUrl) throw new Error("NEXTAUTH_URL is required");
if (missing.length) throw new Error(`Missing account flow variables: ${missing.join(", ")}`);

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: process.env.NODEMAILER_EMAIL, pass: process.env.NODEMAILER_TOKEN } });
await transporter.verify();
console.log(JSON.stringify({ check: "smtp-credentials", ok: true }));

const recoveryEmail = process.env.SMOKE_ACCOUNT_EMAIL || "smoke-test@example.invalid";
const recoveryResponse = await fetch(`${baseUrl}/api/auth/forgot-password`, {
  method: "POST",
  body: JSON.stringify({ email: recoveryEmail }),
  headers: { "content-type": "application/json" },
});
if (recoveryResponse.status !== 202) throw new Error(`forgot-password returned ${recoveryResponse.status}`);
console.log(JSON.stringify({ check: "forgot-password", status: recoveryResponse.status, emailConfigured: Boolean(process.env.SMOKE_ACCOUNT_EMAIL), ok: true }));

const googleResponse = await fetch(`${baseUrl}/api/auth/signin/google`, { method: "GET", redirect: "manual" });
if (![200, 302, 303, 307].includes(googleResponse.status)) throw new Error(`google-provider returned ${googleResponse.status}`);
console.log(JSON.stringify({ check: "google-provider", status: googleResponse.status, ok: true }));
console.log("SMTP y OAuth están accesibles. Completá el callback de Google manualmente con una cuenta real.");
