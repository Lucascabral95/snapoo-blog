import nodemailer from "nodemailer";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: required("NODEMAILER_EMAIL"), pass: required("NODEMAILER_TOKEN") },
});

export async function sendVerificationEmail(email: string, token: string): Promise<void> {
  const baseUrl = required("NEXTAUTH_URL").replace(/\/$/, "");
  await transporter.sendMail({
    from: required("NODEMAILER_EMAIL"),
    to: email,
    subject: "Verificá tu cuenta de Snapoo",
    text: `Confirmá tu cuenta desde ${baseUrl}/feed/verify-email?token=${encodeURIComponent(token)}`,
  });
}

export async function sendPasswordResetEmail(email: string, token: string): Promise<void> {
  const baseUrl = required("NEXTAUTH_URL").replace(/\/$/, "");
  await transporter.sendMail({
    from: required("NODEMAILER_EMAIL"),
    to: email,
    subject: "Restablecé tu contraseña de Snapoo",
    text: `Restablecé tu contraseña desde ${baseUrl}/feed/reset-password?token=${encodeURIComponent(token)}`,
  });
}
