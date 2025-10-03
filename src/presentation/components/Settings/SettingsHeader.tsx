"use client";
import { PiHeadCircuitLight } from "react-icons/pi";
import React from "react";
import { LuLogOut } from "react-icons/lu";
import { signOut } from "next-auth/react";

export default function SettingsHeader() {
  return (
    <div className="mi-info">
      <div className="icono">
        <PiHeadCircuitLight className="icon" />
      </div>
      <div
        className="icono"
        style={{ cursor: "pointer" }}
        onClick={() => signOut()}
      >
        <LuLogOut className="icon" />
      </div>
    </div>
  );
}
