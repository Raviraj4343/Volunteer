import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold [&>svg]:size-3.5",
  {
    variants: {
      variant: {
        default: "bg-primary-soft text-primary",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border text-foreground",
        destructive: "bg-destructive/10 text-destructive",
        warning: "bg-warning/10 text-warning",
      },
    },
    defaultVariants: { variant: "default" },
  }
);

function Badge({ className, variant, ...props }) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
