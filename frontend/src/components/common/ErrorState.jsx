import { CloudOff, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getErrorMessage } from "@/services/api";
import { EmptyState } from "./EmptyState";

export function ErrorState({ error, onRetry, title = "We couldn't load this", className }) {
  return (
    <EmptyState
      icon={CloudOff}
      title={title}
      description={getErrorMessage(error)}
      className={className}
      action={
        onRetry && (
          <Button variant="outline" onClick={onRetry}>
            <RefreshCw /> Try again
          </Button>
        )
      }
    />
  );
}
