"use client";
import React, { useEffect, useState } from "react";
import "../login/Login.scss";
import { PiHeadCircuitLight } from "react-icons/pi";
import { LuLogOut } from "react-icons/lu";
import axios from "axios";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

type User = {
  user: {
    id: string;
    name: string;
    email: string;
    saludo: string;
    image?: string;
  };
};

const Ajustes: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [provincia, setProvincia] = useState<string>("");
  const [pais, setPais] = useState<string>("");
  const [edad, setEdad] = useState<number>(0);
  const [bio, setBio] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [hayDatos, setHayDatos] = useState<boolean>(false);
  const { data: session } = useSession() as { data: User | null };
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session) {
      setEmail(session?.user?.email);
    }
  }, [session]);

  const enviarDatos = async () => {
    try {
      const result = await axios.post("/api/datospersonales", {
        nombre: nombre,
        apellido: apellido,
        provincia: provincia,
        pais: pais,
        edad: Number(edad),
        bio: bio,
        user: session?.user?.id,
      });

      if (result.status === 200 || result.status === 201) {
        setNombre("");
        setApellido("");
        setProvincia("");
        setPais("");
        setEdad(0);
        setBio("");
        setHayDatos(true);
        console.log(`Datos enviados con exito:`, result.data);
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 400) {
          console.log(`Error 400: ${error.response.data.error}`);
        } else {
          console.log(
            `Error: ${
              error.response.data.error || "Ocurrió un error inesperado"
            }`
          );
        }
      } else {
        console.log("Error de red o servidor no disponible");
      }
    }
  };

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const result = await axios.get(
          `/api/datospersonales?id=${session?.user?.id}`
        );

        if (result.status === 200 || result.status === 201) {
          setNombre(result.data.result.nombre);
          setApellido(result.data.result.apellido);
          setProvincia(result.data.result.provincia);
          setPais(result.data.result.pais);
          setEdad(result.data.result.edad);
          setBio(result.data.result.bio);
          setHayDatos(true);
        }
      } catch (error: any) {
        if (error.response) {
          if (error.response.status === 404) {
            console.log("Error 404: ", error.response.data.error);
            setHayDatos(false);
          }
        } else {
          console.log("Error de servidor o red no disponible.");
        }
      }
    };

    obtenerDatos();
  }, [session]);

  const restablecer = async () => {
    try {
      const result = await axios.delete(
        `/api/datospersonales?id=${session?.user?.id}`
      );

      if (result.status === 200 || result.status === 201) {
        setHayDatos(false);
        setNombre("");
        setApellido("");
        setProvincia("");
        setPais("");
        setEdad(0);
        setBio("");
      }
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 4000) {
          console.log(`Error 400: ${error.response.data.error}`);
        }
      } else {
        console.log("Error al restablecer tus datos.");
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div className="seccion-perfil seccion-perfil-c-ajustes">
      <div className="seccion-perfil-ajustes">
        <div className="mi-info">
          <div className="icono">
            <PiHeadCircuitLight className="icon" />
          </div>
          <div
            className="icono"
            style={{ cursor: "pointer" }}
            onClick={() => signOut()}
          >
            <LuLogOut className="icon" />
          </div>
        </div>

        <div className="linea-limitadora">
          <div className="linea"></div>
        </div>

        <div className="perfil">
          <p>Mi perfil</p>
        </div>

        <div className="contenedor-doble-input">
          <div className="inp">
            <div className="label">
              <label htmlFor="nombre">Nombre</label>
            </div>
            <div className="input">
              <input
                type="text"
                id="nombre"
                name="nombre"
                readOnly={hayDatos}
                placeholder={loading ? "Cargando..." : "Nombre"}
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inp">
            <div className="label">
              <label htmlFor="apellido">Apellido</label>
            </div>
            <div className="input">
              <input
                type="text"
                name="apellido"
                id="apellido"
                readOnly={hayDatos}
                placeholder={loading ? "Cargando..." : "Apellido"}
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="contenedor-doble-input">
          <div className="inp">
            <div className="label">
              <label htmlFor="provincia">Provincia</label>
            </div>
            <div className="input">
              <input
                type="text"
                id="provincia"
                readOnly={hayDatos}
                name="provincia"
                placeholder={loading ? "Cargando..." : "Buenos Aires"}
                value={provincia}
                onChange={(e) => setProvincia(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="inp">
            <div className="label">
              <label htmlFor="pais">País</label>
            </div>
            <div className="input">
              <input
                type="text"
                readOnly={hayDatos}
                name="pais"
                id="pais"
                placeholder={loading ? "Cargando..." : "Argentina"}
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="contenedor-doble-input">
          <div className="inp">
            <div className="label">
              <label htmlFor="edad">Edad</label>
            </div>
            <div className="input">
              <input
                type="number"
                id="edad"
                readOnly={hayDatos}
                name="edad"
                placeholder={loading ? "Cargando..." : "22"}
                value={edad}
                onChange={(e) => setEdad(parseInt(e.target.value))}
                required
              />
            </div>
          </div>
          <div className="inp">
            <div className="label">
              <label htmlFor="email">Email</label>
            </div>
            <div className="input">
              <input
                type="email"
                name="email"
                id="email"
                readOnly
                value={email}
                placeholder="Lucas@hotmail.com"
              />
            </div>
          </div>
        </div>

        <div className="contenedor-textarea">
          <textarea
            id="bio"
            name="bio"
            value={bio}
            readOnly={hayDatos}
            onChange={(e) => setBio(e.target.value)}
            placeholder={loading ? "Cargando..." : "Contá algo sobre vos"}
          />
        </div>

        {hayDatos ? (
          <div className="boton-restablecer-cambios">
            <button onClick={restablecer}>Restablecer datos</button>
          </div>
        ) : (
          <div className="boton-guardar-cambios">
            <button onClick={enviarDatos}>Guardar cambios</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Ajustes;
