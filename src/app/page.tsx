import Link from "next/link";
import Image from "next/image";
import Button from "@/presentation/components/UI/Button";
import DashboardFooter from "@/presentation/components/Layouts/DashboardHeader/DashboardFooter/DashboardFooter";
import { BRAND_INFO } from "@/infrastructure/constants/navigation.constants";
import styles from "./Landing.module.scss";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          <Image src={BRAND_INFO.logo} alt="" width={28} height={28} />
          {BRAND_INFO.name}
        </Link>

        <div className={styles.headerActions}>
          <Button href="/login" variant="ghost" size="sm">
            Iniciar sesión
          </Button>
          <Button href="/register" variant="primary" size="sm" pill>
            Registrate
          </Button>
        </div>
      </header>

      <main className={styles.hero}>
        <Image
          src="/img/city-nigth-blog.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />

        <div className={styles.heroContent}>
          <h1 className={styles.title}>Encontrá tu inspiración</h1>
          <p className={styles.subtitle}>
            Unite a nuestra comunidad de creadores visuales y explorá un mundo de posibilidades
          </p>
          <Button href="/register" variant="primary" size="md">
            Comenzá gratis
          </Button>
        </div>
      </main>

      <DashboardFooter />
    </div>
  );
}
