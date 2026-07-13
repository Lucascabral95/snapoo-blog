import DashboardLogo from "./DashboardLogo";
import DashboardNav from "./DashboardNav";
import DashboardAuthButtons from "./DashboardAuthButtons";
import styles from "./DashboardHeader.module.scss";

export default function DashboardHeaderDesktop() {
  return (
    <header className={styles.header}>
      <DashboardLogo />
      <DashboardNav />
      <DashboardAuthButtons />
    </header>
  );
}
