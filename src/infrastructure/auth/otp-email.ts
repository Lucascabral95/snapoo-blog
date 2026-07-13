import nodemailer from "nodemailer";

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

const transporter = nodemailer.createTransport({ service: "gmail", auth: { user: required("NODEMAILER_EMAIL"), pass: required("NODEMAILER_TOKEN") } });

export async function sendRegistrationOtpEmail(email: string, otp: string): Promise<void> {
  await transporter.sendMail({ from: required("NODEMAILER_EMAIL"), to: email, subject: "Tu código de Snapoo", text: `Tu código de verificación es ${otp}. Vence en 10 minutos.` });
}
