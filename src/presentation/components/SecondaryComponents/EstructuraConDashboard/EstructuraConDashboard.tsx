"use client";

import { useState } from "react";
import type { ReactNode } from "react";
import DashboardHeaderDesktop from "../../Layouts/DashboardHeader/DashboardHeaderDesktop";
import DashboardHeaderMobile from "../../Layouts/DashboardHeader/DashboardHeaderMobile";
import DashboardFooter from "../../Layouts/DashboardHeader/DashboardFooter/DashboardFooter";
import MenuHamburguesa from "../../MenuHamburguesa/MenuHamburguesa";
import { UploadModalProvider } from "@/presentation/context/UploadModalContext";
import UploadModal from "@/presentation/components/SubidaImagenes/UploadModal";
import styles from "./EstructuraConDashboard.module.scss";

interface EstructuraConDashboardProps {
  children: ReactNode;
}

export default function EstructuraConDashboard({ children }: EstructuraConDashboardProps) {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <UploadModalProvider>
      <div className={styles.shell}>
        <DashboardHeaderDesktop />
        {isOpenMenu && <MenuHamburguesa setIsOpenMenu={setIsOpenMenu} />}
        <DashboardHeaderMobile isMenuOpen={isOpenMenu} onToggleMenu={() => setIsOpenMenu((open) => !open)} />

        <main className={styles.content}>{children}</main>

        <DashboardFooter />
        <UploadModal />
      </div>
    </UploadModalProvider>
  );
}
