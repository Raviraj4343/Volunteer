import { Toaster as Sonner } from "sonner";

function Toaster(props) {
  return (
    <Sonner
      position="top-center"
      toastOptions={{
        classNames: {
          toast: "!rounded-2xl !border-border !shadow-float !font-sans",
          title: "!font-semibold",
          description: "!text-muted-foreground",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
