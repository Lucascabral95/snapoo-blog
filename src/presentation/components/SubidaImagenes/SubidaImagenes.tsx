import React, { ChangeEvent } from "react";

import { useImageUpload } from "@/presentation/hooks";
import "./SubidaImagenes.scss";

interface SubidaImagenesProps {
  setIsOpenSubida: React.Dispatch<React.SetStateAction<boolean>> | (() => void);
  publicarImagen: () => void;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setComentario: React.Dispatch<React.SetStateAction<string>>;
  isUploading?: boolean;
}

const SubidaImagenes: React.FC<SubidaImagenesProps> = ({
  setIsOpenSubida,
  publicarImagen,
  setFile,
  setComentario,
  isUploading = false,
}) => {
  const { imagePreview, handleFileChange, clearPreview } =
    useImageUpload(setFile);

  const handleClose = () => {
    if (!isUploading) {
      clearPreview();
      if (typeof setIsOpenSubida === "function") {
        setIsOpenSubida(false);
      }
    }
  };

  const handlePublish = () => {
    if (!imagePreview) {
      alert("Por favor selecciona una imagen");
      return;
    }
    publicarImagen();
  };

  const handleComentarioChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComentario(e.target.value);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && !isUploading) {
      handleClose();
    }
  };

  return (
    <div className="subida-dee-imagenes" onClick={handleBackdropClick}>
      <div className="contenedor-subida-imagenes">
        <div className="subtitulo">
          <h2>Subir a Snapoo</h2>
        </div>

        <div className="preview-container">
          {imagePreview ? (
            <div className="preview-wrapper">
              <img src={imagePreview} alt="Preview" className="image-preview" />
              <button
                type="button"
                className="remove-image"
                onClick={clearPreview}
                aria-label="Eliminar imagen"
                disabled={isUploading}
              >
                ✕
              </button>
            </div>
          ) : (
            <label htmlFor="file" className="upload-label">
              <div className="upload-placeholder">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <span>Seleccionar imagen</span>
              </div>
            </label>
          )}

          <input
            type="file"
            name="file"
            id="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file-input"
            disabled={isUploading}
          />
        </div>

        <div className="descripcion">
          <textarea
            name="descripcion"
            id="descripcion"
            placeholder="Escribí una descripción..."
            onChange={handleComentarioChange}
            maxLength={500}
            disabled={isUploading}
          />
        </div>

        <div className="botones">
          <button
            type="button"
            className="cancelar"
            onClick={handleClose}
            disabled={isUploading}
          >
            CANCELAR
          </button>
          <button
            type="button"
            onClick={handlePublish}
            className="subir"
            disabled={!imagePreview || isUploading}
          >
            {isUploading ? "SUBIENDO..." : "SUBIR"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubidaImagenes;
