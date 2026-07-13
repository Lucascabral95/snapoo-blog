"use client";
import { SessionProvider } from "next-auth/react";
import { SkeletonTheme } from "react-loading-skeleton";
import Toast from "@/presentation/components/UI/Toast";

interface Props {
  children: React.ReactNode;
}

function Provider({ children }: Props) {
  return (
    <SessionProvider>
      <SkeletonTheme baseColor="#efeee9" highlightColor="#e5e3dc">
        <Toast />
        {children}
      </SkeletonTheme>
    </SessionProvider>
  );
}

export default Provider;
