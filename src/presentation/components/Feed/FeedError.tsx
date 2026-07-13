import { AlertTriangle, RefreshCw } from "lucide-react";
import Button from "@/presentation/components/UI/Button";
import StateBlock from "@/presentation/components/UI/StateBlock";

interface FeedErrorProps {
  error: string;
  onRetry: () => void;
}

export default function FeedError({ error, onRetry }: FeedErrorProps) {
  return (
    <StateBlock
      variant="error"
      icon={<AlertTriangle size={22} />}
      title="No pudimos cargar el feed"
      description={error}
      action={
        <Button variant="secondary" onClick={onRetry} icon={<RefreshCw size={14} />}>
          Reintentar
        </Button>
      }
    />
  );
}
