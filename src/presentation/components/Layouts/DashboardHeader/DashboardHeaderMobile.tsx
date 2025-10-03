"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { BRAND_INFO } from "@/infrastructure/constants/navigation.constants";

interface DashboardHeaderMobileProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

interface IUser {
  user: {
    email: string;
    userName: string;
    avatar?: string;
    id: string;
  };
}

export default function DashboardHeaderMobile({
  isMenuOpen,
  onToggleMenu,
}: DashboardHeaderMobileProps) {
  const { data: session } = useSession() as { data: IUser | null };

  return (
    <header className="header-mobile">
      <div className="contenedor-header-mobile">
        <div className="parte">
          <Link href="/feed" className="imagen">
            <Image
              src={BRAND_INFO.logo}
              alt="Logo"
              width={32}
              height={32}
              className="img"
            />
          </Link>
          <div className="titulo">
            <h1>
              {" "}
              {BRAND_INFO.name}/ {session?.user?.email}{" "}
            </h1>
          </div>
        </div>
        <div className="parte">
          <div className="menu" onClick={onToggleMenu}>
            {isMenuOpen ? (
              <MdClose className="icon" />
            ) : (
              <CiMenuFries className="icon" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
