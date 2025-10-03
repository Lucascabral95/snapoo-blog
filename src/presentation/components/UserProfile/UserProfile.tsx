import type {
  Profile,
  MediaContent,
  Interaction,
} from "@/infrastructure/types";

interface UserProfileProps {
  // datosDelUsuario: Profile;
  // dataPosteos: MediaContent[];
  // rePosteos: Interaction[];
  datosDelUsuario: any;
  dataPosteos: any;
  rePosteos: any;
}

export default function UserProfile({
  datosDelUsuario,
  dataPosteos,
  rePosteos,
}: UserProfileProps) {
  const hasMedia = dataPosteos.length > 0;
  const hasInteractions = rePosteos.length > 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header del perfil */}
      <div className="mb-8">{/* Avatar, nombre, bio, etc. */}</div>

      {/* Contenido multimedia */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Publicaciones</h2>
        {hasMedia ? (
          <div className="grid grid-cols-3 gap-4">
            {dataPosteos.map((post: any) => (
              <div key={post.id}>{/* Renderizar post */}</div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            Aún no hay publicaciones
          </p>
        )}
      </section>

      {/* Interacciones */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Reposteos</h2>
        {hasInteractions ? (
          <div className="space-y-4">
            {rePosteos.map((interaction: any) => (
              <div key={interaction.id}>{/* Renderizar interacción */}</div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No hay reposteos todavía
          </p>
        )}
      </section>
    </div>
  );
}
