import DashboardLogo from "./DashboardLogo";
import DashboardNav from "./DashboardNav";
import DashboardAuthButtons from "./DashboardAuthButtons";

export default function DashboardHeaderDesktop() {
  return (
    <header className="header-titular">
      <div className="div-superior">
        <div className="div-logo">
          <DashboardLogo />
          <DashboardNav />
        </div>
        <div className="parte-inferior">
          <DashboardAuthButtons />
        </div>
      </div>
    </header>
  );
}
