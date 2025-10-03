import axios from 'axios';
import type { PersonalDataPayload, PersonalDataResponse } from '@/infrastructure/types';

export async function obtenerDatosPersonales(userId: string) {
    try {
        const result = await axios.get(`/api/datospersonales?id=${userId}`);

        if (result.status === 200 || result.status === 201) {
            return {
                success: true,
                data: result.data.result as PersonalDataResponse,
            };
        }

        return { success: false, data: null };
    } catch (error: any) {
        if (error.response?.status === 404) {
            console.log('Error 404: ', error.response.data.error);
            return { success: false, data: null };
        } else {
            console.log('Error de servidor o red no disponible.');
            return { success: false, data: null };
        }
    }
}

export async function guardarDatosPersonales(data: PersonalDataPayload) {
    try {
        const result = await axios.post('/api/datospersonales', {
            nombre: data.nombre,
            apellido: data.apellido,
            provincia: data.provincia,
            pais: data.pais,
            edad: Number(data.edad),
            bio: data.bio,
            user: data.user,
        });

        if (result.status === 200 || result.status === 201) {
            console.log('Datos enviados con exito:', result.data);
            return { success: true };
        }

        return { success: false, error: 'Error al guardar datos' };
    } catch (error: any) {
        if (error.response) {
            if (error.response.status === 400) {
                console.log(`Error 400: ${error.response.data.error}`);
                return { success: false, error: error.response.data.error };
            } else {
                console.log(
                    `Error: ${error.response.data.error || 'Ocurrió un error inesperado'}`
                );
                return { success: false, error: error.response.data.error };
            }
        } else {
            console.log('Error de red o servidor no disponible');
            return { success: false, error: 'Error de red o servidor no disponible' };
        }
    }
}

export async function eliminarDatosPersonales(userId: string) {
    try {
        const result = await axios.delete(`/api/datospersonales?id=${userId}`);

        if (result.status === 200 || result.status === 201) {
            return { success: true };
        }

        return { success: false, error: 'Error al eliminar datos' };
    } catch (error: any) {
        if (error.response?.status === 400) {
            console.log(`Error 400: ${error.response.data.error}`);
            return { success: false, error: error.response.data.error };
        } else {
            console.log('Error al restablecer tus datos.');
            return { success: false, error: 'Error al restablecer tus datos.' };
        }
    }
}
