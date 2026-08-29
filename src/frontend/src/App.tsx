import { Toast } from "@/components/shared/Toast";
import { router } from "@/routes";
import { RouterProvider } from "@tanstack/react-router";

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toast />
    </>
  );
}
