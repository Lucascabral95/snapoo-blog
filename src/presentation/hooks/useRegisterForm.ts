'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import type { RegisterUser, RegisterFormErrors } from '@/infrastructure/types';
import { RegisterSchema } from '@/infrastructure/types';
import { registerUser } from '@/infrastructure/services/auth.service';

export function useRegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterUser>({ email: '', userName: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof RegisterUser, value: string) => setFormData((previous) => ({ ...previous, [field]: value }));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = RegisterSchema.safeParse(formData);
    if (!parsed.success) {
      const nextErrors: RegisterFormErrors = {};
      parsed.error.issues.forEach((issue) => { const field = issue.path[0]; if (typeof field === 'string') nextErrors[field] = issue.message; });
      setErrors(nextErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});
    try {
      const result = await registerUser(parsed.data);
      if (!result.success) { setErrors({ email: result.error }); return; }
      toast.success('Registro exitoso. Ya podés iniciar sesión.', { duration: 1800, position: 'top-center' });
      setTimeout(() => router.push('/feed/login'), 1800);
    } catch {
      toast.error('No se pudo completar el registro.', { duration: 2500, position: 'top-center' });
    } finally { setIsLoading(false); }
  };

  return { formData, errors, isLoading, handleChange, handleSubmit };
}
