import { Toaster as SonnerToaster } from "@/components/ui/sonner";

export function Toast() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          borderRadius: "0.75rem",
          backdropFilter: "blur(16px)",
        },
      }}
    />
  );
}
