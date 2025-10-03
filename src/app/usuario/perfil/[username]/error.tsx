"use client";
import { useEffect } from "react";

import { ApiError } from "@/infrastructure/services/api.service";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error("Error en perfil:", error);
  }, [error]);

  const isApiError = error instanceof ApiError;
  const errorMessage = isApiError
    ? "No pudimos conectar con el servidor"
    : "Ocurrió un error inesperado";

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="max-w-md w-full space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">{errorMessage}</h2>
        {isApiError && (
          <p className="text-sm text-gray-600">Código: {error.status}</p>
        )}
        <button
          onClick={reset}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}
