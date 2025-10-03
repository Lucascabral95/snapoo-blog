import type { Metadata } from "next";
import FeedContainer from "@/presentation/components/Feed/FeedContainer";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Descubre las últimas publicaciones de nuestra comunidad",
};

function FeedPage() {
  return <FeedContainer />;
}

export default FeedPage;
