import { SearchX } from "lucide-react";
import Button from "./Button";
import StateBlock from "./StateBlock";

interface Props {
  contenido: string;
}

export default function NotFoundComponent({ contenido }: Props) {
  return (
    <StateBlock
      icon={<SearchX size={22} />}
      title={contenido}
      description="Puede que se haya eliminado o el link esté roto."
      action={
        <Button href="/feed" variant="primary">
          Volver al feed
        </Button>
      }
    />
  );
}
