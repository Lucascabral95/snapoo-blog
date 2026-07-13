import { z } from "zod";

export const RegisterSchema = z.object({
  email: z.string().trim().toLowerCase().email("Ingresá un email válido.").max(254),
  userName: z.string().trim().min(3, "Usá al menos 3 caracteres.").max(30).regex(/^[A-Za-z0-9._-]+$/, "Sólo se permiten letras, números, punto, guion y guion bajo."),
  password: z.string().min(12, "La contraseña debe tener al menos 12 caracteres.").max(128),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Las contraseñas no coinciden.",
});

export const LoginSchema = z.object({
  email: z.string().trim().toLowerCase().email("Ingresá un email válido.").max(254),
  password: z.string().min(1).max(128),
});

export type RegisterUser = z.infer<typeof RegisterSchema>;
export type LoginUser = z.infer<typeof LoginSchema>;
export interface AuthFormErrors { [key: string]: string | undefined }
export type RegisterFormErrors = AuthFormErrors;
export type LoginFormErrors = AuthFormErrors;
