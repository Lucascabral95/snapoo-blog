"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Avvvatars from "avvvatars-react";
import { Search, Upload } from "lucide-react";
import Button from "@/presentation/components/UI/Button";
import { Dropdown, DropdownDivider, DropdownItem } from "@/presentation/components/UI/Dropdown";
import { useClickOutside } from "@/presentation/hooks";
import { useUploadModal } from "@/presentation/context/UploadModalContext";
import styles from "./DashboardHeader.module.scss";

export default function DashboardAuthButtons() {
  const { data: session } = useSession();
  const router = useRouter();
  const { openUploadModal } = useUploadModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/feed/buscar");
  };

  if (!session?.user) {
    return (
      <Button href="/login" variant="primary" size="sm" pill>
        Iniciar sesión
      </Button>
    );
  }

  const profileHref = `/usuario/perfil/${session.user.userName ?? ""}`;

  return (
    <div className={styles.right}>
      <form className={styles.search} onSubmit={handleSearchSubmit}>
        <Search size={14} />
        <input
          className={styles.searchInput}
          placeholder="Buscar fotos, personas o intereses"
        />
      </form>

      <Button type="button" variant="primary" size="sm" pill icon={<Upload size={14} />} onClick={openUploadModal}>
        Subir
      </Button>

      <div className={styles.avatarWrap} ref={menuRef}>
        <button
          type="button"
          className={styles.avatarButton}
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-label="Menú de usuario"
        >
          <Avvvatars value={session.user.userName ?? session.user.email ?? "Snapoo"} size={34} />
        </button>

        {isMenuOpen && (
          <div className={styles.dropdown}>
            <Dropdown>
              <DropdownItem href={profileHref}>Mi perfil</DropdownItem>
              <DropdownItem href="/feed/ajustes">Ajustes</DropdownItem>
              <DropdownDivider />
              <DropdownItem onClick={() => signOut()}>Cerrar sesión</DropdownItem>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  );
}
