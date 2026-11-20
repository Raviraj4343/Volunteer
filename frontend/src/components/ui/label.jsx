import { Label as LabelPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn("text-sm font-semibold leading-none select-none peer-disabled:opacity-50", className)}
      {...props}
    />
  );
}

export { Label };
