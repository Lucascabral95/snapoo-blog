import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(12).max(128),
  confirmPassword: z.string(),
  userName: z.string().trim().min(3).max(30).regex(/^[A-Za-z0-9._-]+$/),
}).refine((data) => data.password === data.confirmPassword, { path: ["confirmPassword"], message: "Las contraseñas no coinciden." });

export const loginSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});

export type RegisterInput = z.infer<typeof registerSchema>;
