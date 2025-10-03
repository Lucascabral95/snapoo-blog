"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { NAVIGATION_LINKS } from "@/infrastructure/constants/navigation.constants";

interface IUser {
  user: {
    email: string;
    userName: string;
    avatar?: string;
    id: string;
  };
}

export default function DashboardNav() {
  const { data: session } = useSession() as { data: IUser | null };

  return (
    <div className="categorias">
      {NAVIGATION_LINKS.map((link: any) => {
        const href =
          (link.requiresUsername as any) && session?.user?.userName
            ? link.href(session.user.userName)
            : typeof link.href === "string"
            ? link.href
            : "/feed";

        const Icon = link.icon;

        return (
          <Link key={link.label} href={href} className="cat">
            <div className="icono">
              <Icon className="icon" />
            </div>
            <div className="texto">
              <p> {link.label} </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
