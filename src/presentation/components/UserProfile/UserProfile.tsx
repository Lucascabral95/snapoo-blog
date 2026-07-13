"use client";

import { useEffect, useState } from "react";
import { Pencil, Upload } from "lucide-react";
import axios from "axios";
import { useSession } from "next-auth/react";
import Avvvatars from "avvvatars-react";

import EstructuraImagenes from "../SecondaryComponents/Gallery/EstructuraImagenes";
import Button from "@/presentation/components/UI/Button";
import Tabs from "@/presentation/components/UI/Tabs";
import { useUploadModal } from "@/presentation/context/UploadModalContext";
import type { GalleryPost } from "@/infrastructure/types/gallery.types";
import styles from "./UserProfile.module.scss";
import ModerationMenu from "@/presentation/components/Moderation/ModerationMenu";

interface UserProfileProps {
  dataPosteos: GalleryPost[];
  datosDelUsuario: string;
  userId?: string;
  rePosteos: GalleryPost[];
}

type Section = "posteos" | "compartidos";

export default function UserProfile({
  dataPosteos: initialPosteos,
  datosDelUsuario,
  userId,
  rePosteos,
}: UserProfileProps) {
  const { data: session } = useSession();
  const { openUploadModal } = useUploadModal();
  const [seccionSeleccionada, setSeccionSeleccionada] = useState<Section>("posteos");
  const [posteos, setPosteos] = useState(initialPosteos);
  const [following, setFollowing] = useState(false);
  const [followBusy, setFollowBusy] = useState(false);
  const isOwnProfile = session?.user?.userName === datosDelUsuario;
  useEffect(() => { if (!isOwnProfile && userId) axios.get(`/api/follows/${userId}`).then((response) => setFollowing(Boolean(response.data.result?.following))).catch(() => undefined); }, [userId, isOwnProfile]);
  const toggleFollow = async () => { if (!userId || followBusy) return; setFollowBusy(true); try { const response = following ? await axios.delete(`/api/follows/${userId}`) : await axios.put(`/api/follows/${userId}`); setFollowing(Boolean(response.data.result?.following)); } finally { setFollowBusy(false); } };

  useEffect(() => {
    setPosteos(initialPosteos);
  }, [initialPosteos]);

  const posteosActuales = seccionSeleccionada === "posteos" ? posteos : rePosteos;

  return (
    <div>
      <div className={styles.header}>
        <Avvvatars value={datosDelUsuario} size={100} style="shape" />

        <div className={styles.info}>
          <div className={styles.nameRow}>
            <h1 className={styles.name}>{datosDelUsuario}</h1>

            {isOwnProfile ? (
              <Button href="/feed/ajustes" variant="secondary" size="sm" icon={<Pencil size={13} />}>
                Editar perfil
              </Button>
            ) : null}
            {!isOwnProfile && userId ? <><Button variant="primary" size="sm" onClick={toggleFollow} disabled={followBusy}>{following ? "Dejar de seguir" : "Seguir"}</Button><ModerationMenu targetType="user" targetId={userId} userId={userId} /></> : null}
          </div>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <b>{posteos.length}</b>
              <span>Publicaciones</span>
            </div>
          </div>

          {isOwnProfile && (
            <Button
              variant="primary"
              size="sm"
              icon={<Upload size={13} />}
              onClick={openUploadModal}
              className={styles.uploadTrigger}
            >
              Subir foto
            </Button>
          )}
        </div>
      </div>

      <div className={styles.tabsWrap}>
        <Tabs
          items={[
            { key: "posteos", label: "Publicaciones" },
            { key: "compartidos", label: "Reposts" },
          ]}
          activeKey={seccionSeleccionada}
          onChange={(key) => setSeccionSeleccionada(key as Section)}
        />
      </div>

      <EstructuraImagenes posteos={posteosActuales} />
    </div>
  );
}




