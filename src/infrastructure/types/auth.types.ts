import { z } from 'zod';

export const RegisterSchema = z.object({
    email: z.string().email('El email no es valido.'),
    password: z
        .string()
        .min(8, 'La contraseña debe tener al menos 8 caracteres.')
        .regex(
            /[.,!?;:(){}[\]'"`~@#$%^&*-_]/,
            'La contraseña debe contener al menos un carácter de puntuación.'
        ),
});

export const LoginSchema = z.object({
    email: z.string(),
    password: z.string().min(7, 'La contraseña debe tener al menos 8 caracteres.'),
});

export type RegisterUser = z.infer<typeof RegisterSchema>;
export type LoginUser = z.infer<typeof LoginSchema>;

export interface AuthFormErrors {
    [key: string]: string | undefined;
}

export type RegisterFormErrors = AuthFormErrors;

export type LoginFormErrors = AuthFormErrors;