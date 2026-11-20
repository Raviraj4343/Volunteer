import { Link } from "react-router";
import { MapPinOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <EmptyState
        icon={MapPinOff}
        title="This page wandered off"
        description="The link may be broken, or the page may have moved."
        action={
          <Button asChild>
            <Link to="/">Back to Volunteer</Link>
          </Button>
        }
      />
    </div>
  );
}
