import { useEffect, useState } from 'react';
import {
    obtenerImagenesPorUsuario,
    obtenerReposteosPorUsuario,
    obtenerUsuarioPorUsername,
} from '@/infrastructure/services/profile.service';

interface UseUserProfileReturn {
    dataPosteos: any[];
    datosDelUsuario: any;
    rePosteos: any[];
    userName: any;
    isLoading: boolean;
}

export function useUserProfile(username: string): UseUserProfileReturn {
    const [dataPosteos, setDataPosteos] = useState<any[]>([]);
    const [datosDelUsuario, setDatosDelUsuario] = useState<any>(null);
    const [rePosteos, setRePosteos] = useState<any[]>([]);
    const [userName, setUserName] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const [imagenes, usuario, reposteos] = await Promise.all([
                obtenerImagenesPorUsuario(username),
                obtenerUsuarioPorUsername(username),
                obtenerReposteosPorUsuario(username),
            ]);

            setDataPosteos(imagenes);
            setUserName(usuario);
            setDatosDelUsuario(usuario.userName);
            setRePosteos(reposteos);
            setIsLoading(false);
        };

        fetchData();
    }, [username]);

    return {
        dataPosteos,
        datosDelUsuario,
        rePosteos,
        userName,
        isLoading,
    };
}
