import { Link } from "react-router";
import { Hammer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/common/EmptyState";

// Temporary placeholder for screens that are built in the next steps.
export function ComingSoonPage({ title }) {
  return (
    <div className="mx-auto max-w-2xl px-4 pt-10">
      <h1 className="text-2xl font-bold">{title}</h1>
      <EmptyState
        icon={Hammer}
        title="Coming in the next build step"
        description="This screen is next on the list. Explore missions near you in the meantime."
        action={
          <Button asChild>
            <Link to="/home">Explore missions</Link>
          </Button>
        }
      />
    </div>
  );
}
