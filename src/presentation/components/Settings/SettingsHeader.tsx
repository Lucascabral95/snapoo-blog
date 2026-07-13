import styles from "./Settings.module.scss";

export default function SettingsHeader() {
  return (
    <div className={styles.pageHeader}>
      <h1 className={styles.pageTitle}>Ajustes</h1>
      <p className={styles.pageSubtitle}>Configurá tu perfil y tus datos personales</p>
    </div>
  );
}
