import axios from 'axios';
import { signIn } from 'next-auth/react';
import type { RegisterUser, LoginUser } from '@/infrastructure/types';

export async function registerUser(userData: RegisterUser) {
    try {
        const result = await axios.post('/api/register', userData);

        if (result.status === 200 || result.status === 201) {
            return { success: true, data: result.data };
        }

        return { success: false, error: 'Error al registrar usuario' };
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 400) {
                return {
                    success: false,
                    error: error.response.data.error,
                };
            } else {
                console.log('Error de servidor o red no disponible.');
                return {
                    success: false,
                    error: 'Error de servidor o red no disponible.',
                };
            }
        }

        return {
            success: false,
            error: 'Error desconocido',
        };
    }
}

export async function loginUser(credentials: LoginUser) {
    try {
        const result = await signIn('credentials', {
            email: credentials.email,
            password: credentials.password,
            redirect: false,
        });

        if (result?.error) {
            return {
                success: false,
                error: 'El email o la contraseña son incorrectos.',
            };
        } else if (result?.ok) {
            return {
                success: true,
            };
        } else {
            return {
                success: false,
                error: 'Error al iniciar sesión',
            };
        }
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 401 || error.response.status === 400) {
                console.log(error.response.data.error);
                return {
                    success: false,
                    error: error.response.data.error,
                };
            } else {
                console.log('Error de servidor o red no disponible.');
                return {
                    success: false,
                    error: 'Error de servidor o red no disponible.',
                };
            }
        }

        return {
            success: false,
            error: 'Error desconocido',
        };
    }
}
