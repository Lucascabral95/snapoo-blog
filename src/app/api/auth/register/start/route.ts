import { NextResponse } from "next/server";
import DAOUsuarios from "@/DAO/UsuarioDAO";
import { checkRateLimit, requestIdentifier } from "@/infrastructure/auth/rate-limit";
import { parseRegistrationInput, startPendingRegistration } from "@/infrastructure/auth/registration-otp";
import { sendRegistrationOtpEmail } from "@/infrastructure/auth/otp-email";

export async function POST(request: Request) {
  if (!(await checkRateLimit("register", requestIdentifier(request)))) return NextResponse.json({ code: "RATE_LIMITED", message: "Demasiados intentos. Probá más tarde." }, { status: 429 });
  const parsed = parseRegistrationInput(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ code: "VALIDATION_ERROR", message: "Los datos enviados no son válidos." }, { status: 400 });

  const { email, userName } = parsed.data;
  if (await DAOUsuarios.getUserByEmail(email) || await DAOUsuarios.getUserByUserName(userName)) return NextResponse.json({ code: "ACCOUNT_EXISTS", message: "No se pudo iniciar el registro con esos datos." }, { status: 409 });

  try {
    const otp = await startPendingRegistration(parsed.data);
    await sendRegistrationOtpEmail(email, otp);
    return NextResponse.json({ email, message: "Te enviamos un código de seis dígitos." }, { status: 202 });
  } catch (error) {
    console.error("Registration OTP delivery failed", error instanceof Error ? error.message : "unknown error");
    return NextResponse.json({ code: "OTP_DELIVERY_ERROR", message: "No se pudo enviar el código." }, { status: 500 });
  }
}
