import React from 'react'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/services/authOptions';

const obtenerImagen = async (id) => {
    try {
        const result = await axios.get(`${process.env.NEXTAUTH_URL}api/posteo`);

        if (result.status === 200 || result.status === 201) {
            const posteoSeleccionada = result.data.result.filter((posteo) => posteo._id === id);
            return posteoSeleccionada
        }
    } catch (error) {
        console.log(error);
        return "No se encontraron elementos";
    }
}

const Servidor = async () => {
    const session = await getServerSession(authOptions);

    console.log(session?.user?.id);


    const imagen = await obtenerImagen("673633e960636bb117018d15");
    console.log(imagen);



    return (
        <div>
            <h1>Testing del servidor</h1>
        </div>
    )
}

export default Servidor
