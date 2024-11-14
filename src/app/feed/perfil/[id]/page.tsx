"use client";
import React from "react";
import { useParams } from "next/navigation";

const Perfil = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1> Aca van los datos personales del usuario: {id} </h1>
    </div>
  );
};

export default Perfil;
