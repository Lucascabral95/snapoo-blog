import React from "react";
import "./SubidaImagenes.scss";

interface SubidaImagenesProps {
  setIsOpenSubida: React.Dispatch<React.SetStateAction<boolean>>;
  publicarImagen: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setComentario: React.Dispatch<React.SetStateAction<string>>;
}

const SubidaImagenes: React.FC<SubidaImagenesProps> = ({
  setIsOpenSubida,
  publicarImagen,
  setFile,
  setComentario,
}) => {
  return (
    <div className="subida-dee-imagenes">
      <div className="contenedor-subida-imagenes">
        <div className="subtitulo">
          <p> Subir a Snapoo </p>
        </div>

        <div className="imagen">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e: any) => setFile(e.target.files[0])}
          />
        </div>

        <div className="descripcion">
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Escribí una descripción..."
            onChange={(e: any) => setComentario(e.target.value)}
          />
        </div>

        <div className="botones">
          <button className="cancelar" onClick={() => setIsOpenSubida(false)}>
            {" "}
            CANCELAR{" "}
          </button>
          <button onClick={publicarImagen} className="subir">
            {" "}
            SUBIR{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubidaImagenes;
