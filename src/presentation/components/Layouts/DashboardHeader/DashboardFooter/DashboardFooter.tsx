import { BRAND_INFO, SOCIAL_LINKS } from "@/infrastructure/constants/navigation.constants";
import styles from "./DashboardFooter.module.scss";

export default function DashboardFooter() {
  return (
    <footer className={styles.footer}>
      <span>{BRAND_INFO.copyright}</span>
      <div className={styles.socials}>
        {SOCIAL_LINKS.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className={styles.social}>
            {link.label}
          </a>
        ))}
      </div>
    </footer>
  );
}
