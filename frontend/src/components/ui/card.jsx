import { cn } from "@/lib/utils";

function Card({ className, ...props }) {
  return <div data-slot="card" className={cn("rounded-2xl border bg-card text-card-foreground", className)} {...props} />;
}

function CardHeader({ className, ...props }) {
  return <div className={cn("flex flex-col gap-1 p-5 pb-0", className)} {...props} />;
}

function CardTitle({ className, ...props }) {
  return <h3 className={cn("text-base font-bold", className)} {...props} />;
}

function CardDescription({ className, ...props }) {
  return <p className={cn("text-sm text-muted-foreground", className)} {...props} />;
}

function CardContent({ className, ...props }) {
  return <div className={cn("p-5", className)} {...props} />;
}

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
