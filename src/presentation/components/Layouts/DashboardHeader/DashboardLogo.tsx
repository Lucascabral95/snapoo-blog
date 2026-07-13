import Image from "next/image";
import Link from "next/link";
import { BRAND_INFO } from "@/infrastructure/constants/navigation.constants";
import styles from "./DashboardHeader.module.scss";

export default function DashboardLogo() {
  return (
    <Link href="/feed" className={styles.logo}>
      <Image className={styles.logoMark} src={BRAND_INFO.logo} alt="" width={28} height={28} />
      {BRAND_INFO.name}
    </Link>
  );
}
