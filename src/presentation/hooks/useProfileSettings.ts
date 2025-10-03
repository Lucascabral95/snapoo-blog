'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import type { PersonalData } from '@/infrastructure/types';
import {
    obtenerDatosPersonales,
    guardarDatosPersonales,
    eliminarDatosPersonales,
} from '@/infrastructure/services/profileSettings.service';

type User = {
    user: {
        id: string;
        name: string;
        email: string;
        saludo: string;
        image?: string;
    };
};

export function useProfileSettings() {
    const { data: session } = useSession() as { data: User | null };
    const [formData, setFormData] = useState<PersonalData>({
        nombre: '',
        apellido: '',
        provincia: '',
        pais: '',
        edad: 0,
        bio: '',
    });
    const [email, setEmail] = useState<string>('');
    const [hayDatos, setHayDatos] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Cargar email de sesión
    useEffect(() => {
        if (session?.user?.email) {
            setEmail(session.user.email);
        }
    }, [session]);

    // Cargar datos personales
    useEffect(() => {
        const cargarDatos = async () => {
            if (!session?.user?.id) return;

            const result = await obtenerDatosPersonales(session.user.id);

            if (result.success && result.data) {
                setFormData({
                    nombre: result.data.nombre,
                    apellido: result.data.apellido,
                    provincia: result.data.provincia,
                    pais: result.data.pais,
                    edad: result.data.edad,
                    bio: result.data.bio,
                });
                setHayDatos(true);
            } else {
                setHayDatos(false);
            }
        };

        cargarDatos();
    }, [session]);

    // Simular loading inicial
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1200);

        return () => clearTimeout(timer);
    }, []);

    const handleChange = (field: keyof PersonalData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async () => {
        if (!session?.user?.id) return;

        const result = await guardarDatosPersonales({
            ...formData,
            user: session.user.id,
        });

        if (result.success) {
            setHayDatos(true);
        }
    };

    const handleReset = async () => {
        if (!session?.user?.id) return;

        const result = await eliminarDatosPersonales(session.user.id);

        if (result.success) {
            setFormData({
                nombre: '',
                apellido: '',
                provincia: '',
                pais: '',
                edad: 0,
                bio: '',
            });
            setHayDatos(false);
        }
    };

    return {
        formData,
        email,
        hayDatos,
        loading,
        handleChange,
        handleSubmit,
        handleReset,
    };
}
