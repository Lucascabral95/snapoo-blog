'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { RegisterUser, RegisterFormErrors } from '@/infrastructure/types';
import { RegisterSchema } from '@/infrastructure/types';
import { registerUser } from '@/infrastructure/services/auth.service';

export function useRegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<RegisterUser>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<RegisterFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof RegisterUser, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const verificacion = RegisterSchema.safeParse(formData);

            if (verificacion.success) {
                const result = await registerUser(formData);

                if (result.success) {
                    setFormData({ email: '', password: '' });
                    setErrors({});
                    toast.success('Registro con éxito', {
                        duration: 1500,
                        position: 'top-center',
                    });
                    setTimeout(() => {
                        router.push('/feed/login');
                    }, 1600);
                } else {
                    setErrors({ email: result.error });
                }
            } else {
                const formattedErrors: RegisterFormErrors = {};
                verificacion.error.errors.forEach((err) => {
                    if (err.path[0]) {
                        formattedErrors[err.path[0] as string] = err.message;
                    }
                });
                setErrors(formattedErrors);
            }
        } catch (error) {
            console.error('Error en registro:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        formData,
        errors,
        isLoading,
        handleChange,
        handleSubmit,
    };
}
