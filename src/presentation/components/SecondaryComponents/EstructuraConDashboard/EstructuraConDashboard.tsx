"use client";

import "./EstructuraConDashboard.scss";
import React, { useState } from "react";
import DashboardHeaderDesktop from "../../Layouts/DashboardHeader/DashboardHeaderDesktop";
import DashboardHeaderMobile from "../../Layouts/DashboardHeader/DashboardHeaderMobile";
import DashboardFooter from "../../Layouts/DashboardHeader/DashboardFooter/DashboardFooter";
import MenuHamburguesa from "../../MenuHamburguesa/MenuHamburguesa";

interface EstructuraConDashboardProps {
  children: React.ReactNode;
}

export default function EstructuraConDashboard({
  children,
}: EstructuraConDashboardProps) {
  const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);

  return (
    <div className="estructura-con-dashboard">
      <div className="contenedor-estructura-con-dashboard">
        <DashboardHeaderDesktop />

        {isOpenMenu && <MenuHamburguesa setIsOpenMenu={setIsOpenMenu} />}

        <DashboardHeaderMobile
          isMenuOpen={isOpenMenu}
          onToggleMenu={() => setIsOpenMenu(!isOpenMenu)}
        />

        <div className="contenido-interno">
          <main className="main-titular">
            <div className="contenedor-main-titular">{children}</div>
          </main>

          <DashboardFooter />
        </div>
      </div>
    </div>
  );
}
