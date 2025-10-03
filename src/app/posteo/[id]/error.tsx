"use client";
import { useEffect } from "react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error loading post:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6">
      <div className="max-w-md w-full space-y-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900">
          Error al cargar el posteo
        </h2>
        <p className="text-gray-600">
          No pudimos cargar el posteo solicitado. Por favor, intenta nuevamente.
        </p>
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
