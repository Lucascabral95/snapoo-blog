interface FeedErrorProps {
  error: string;
  onRetry: () => void;
}

export default function FeedError({ error, onRetry }: FeedErrorProps) {
  return (
    <div className="seccion-perfil seccion-perfil-inicio">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "400px",
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "3rem",
            marginBottom: "1rem",
          }}
        >
          😕
        </div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            marginBottom: "0.5rem",
            color: "#374151",
          }}
        >
          Error al cargar las publicaciones
        </h2>
        <p
          style={{
            color: "#6b7280",
            marginBottom: "1.5rem",
          }}
        >
          {error}
        </p>
        <button
          onClick={onRetry}
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor = "#2563eb")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "#3b82f6")
          }
        >
          🔄 Reintentar
        </button>
      </div>
    </div>
  );
}
