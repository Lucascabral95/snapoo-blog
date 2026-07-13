"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LoginSchema, type AuthFormErrors, type LoginUser } from "@/infrastructure/types";
import { loginUser } from "@/infrastructure/services/auth.service";

function validationErrors(issues: Array<{ path: PropertyKey[]; message: string }>): AuthFormErrors {
    return Object.fromEntries(issues.map((issue) => [String(issue.path[0]), issue.message]));
}

export function useLoginForm() {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginUser>({ email: "", password: "" });
    const [errors, setErrors] = useState<AuthFormErrors>({});
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (field: keyof LoginUser, value: string) => {
        setFormData((previous) => ({ ...previous, [field]: value }));
        setErrors((previous) => ({ ...previous, [field]: undefined }));
    };

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const validation = LoginSchema.safeParse(formData);

        if (!validation.success) {
            setErrors(validationErrors(validation.error.issues));
            return;
        }

        setErrors({});
        setIsLoading(true);
        const toastId = toast.loading("Verificando credenciales...", { position: "top-center" });

        try {
            const result = await loginUser(validation.data);

            if (!result.success) {
                toast.error(result.error || "No se pudo iniciar sesion.", { id: toastId });
                return;
            }

            toast.success("Sesion iniciada. Redirigiendo...", { id: toastId });
            router.replace("/feed");
        } catch {
            toast.error("No se pudo iniciar sesion. Intentalo nuevamente.", { id: toastId });
        } finally {
            setIsLoading(false);
        }
    };

    return { formData, errors, isLoading, handleChange, handleSubmit };
}
