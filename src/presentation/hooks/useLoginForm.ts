'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { LoginUser, AuthFormErrors } from '@/infrastructure/types';
import { LoginSchema } from '@/infrastructure/types';
import { loginUser } from '@/infrastructure/services/auth.service';

export function useLoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginUser>({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState<AuthFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof LoginUser, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsLoading(true);

        try {
            const verificacion = LoginSchema.safeParse(formData);

            if (verificacion.success) {
                const result = await loginUser(formData);

                if (result.success) {
                    router.push('/feed');
                } else {
                    toast.error(result.error || 'Error al iniciar sesión', {
                        duration: 2500,
                        position: 'top-center',
                    });
                }
            } else {
                console.log(verificacion.error.errors);
            }
        } catch (error: any) {
            toast.error('Error inesperado', {
                duration: 2500,
                position: 'top-center',
            });
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
