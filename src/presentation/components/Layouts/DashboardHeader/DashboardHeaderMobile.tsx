import { Menu, X } from "lucide-react";
import DashboardLogo from "./DashboardLogo";
import styles from "./DashboardHeader.module.scss";

interface DashboardHeaderMobileProps {
  isMenuOpen: boolean;
  onToggleMenu: () => void;
}

export default function DashboardHeaderMobile({
  isMenuOpen,
  onToggleMenu,
}: DashboardHeaderMobileProps) {
  return (
    <header className={styles.headerMobile}>
      <DashboardLogo />
      <button
        type="button"
        className={styles.hamb}
        onClick={onToggleMenu}
        aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
      >
        {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  );
}
