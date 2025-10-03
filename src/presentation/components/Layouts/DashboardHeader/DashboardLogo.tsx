import Image from "next/image";
import Link from "next/link";
import { BRAND_INFO } from "@/infrastructure/constants/navigation.constants";

export default function DashboardLogo() {
  return (
    <div className="logo">
      <Link href="/feed" className="imagen">
        <Image
          className="img"
          src={BRAND_INFO.logo}
          alt="Logo"
          width={40}
          height={40}
        />
      </Link>
      <div className="titulo">
        <h1> {BRAND_INFO.name} </h1>
      </div>
    </div>
  );
}
