import React, { ChangeEvent } from "react";
import { Upload, X } from "lucide-react";

import { useImageUpload } from "@/presentation/hooks";
import { Field, Textarea } from "@/presentation/components/UI/Field";
import Button from "@/presentation/components/UI/Button";
import styles from "./SubidaImagenes.module.scss";

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
  const { imagePreview, handleFileChange, clearPreview } = useImageUpload(setFile);

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
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Subir a Snapoo</h2>
          <button type="button" className={styles.closeButton} onClick={handleClose} disabled={isUploading} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className={styles.previewContainer}>
          {imagePreview ? (
            <div className={styles.previewWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URL, no remote optimization possible */}
              <img src={imagePreview} alt="Preview" className={styles.imagePreview} />
              <button
                type="button"
                className={styles.removeImage}
                onClick={clearPreview}
                aria-label="Eliminar imagen"
                disabled={isUploading}
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label htmlFor="file" className={styles.uploadLabel}>
              <div className={styles.uploadPlaceholder}>
                <Upload size={32} />
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
            className={styles.fileInput}
            disabled={isUploading}
          />
        </div>

        <Field>
          <Textarea
            rows={2}
            placeholder="Escribí una descripción..."
            onChange={handleComentarioChange}
            maxLength={500}
            disabled={isUploading}
          />
        </Field>

        <div className={styles.actions}>
          <Button variant="secondary" onClick={handleClose} disabled={isUploading}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handlePublish} disabled={!imagePreview || isUploading}>
            {isUploading ? "Subiendo..." : "Subir"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubidaImagenes;
