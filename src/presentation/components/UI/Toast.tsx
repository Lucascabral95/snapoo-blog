import { Toaster } from "react-hot-toast";

export default function Toast() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "var(--ink)",
          color: "#fff",
          padding: "12px 16px",
          borderRadius: "var(--r-md)",
          fontSize: "13px",
          fontFamily: "var(--font-body), sans-serif",
          boxShadow: "var(--shadow-md)",
        },
        success: { iconTheme: { primary: "var(--success)", secondary: "#fff" } },
        error: { iconTheme: { primary: "var(--danger)", secondary: "#fff" } },
      }}
    />
  );
}
