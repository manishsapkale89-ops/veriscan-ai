import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { Outlet } from "@tanstack/react-router";
import { useState } from "react";

export function AppLayout() {
  const isMobile = useIsMobile(1024);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="bg-aurora min-h-screen">
      <div className="flex min-h-screen">
        {!isMobile && (
          <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-border/60 bg-background/40 backdrop-blur-xl lg:block">
            <Sidebar />
          </aside>
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <Navbar onMenuClick={() => setDrawerOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8">
            <div className="mx-auto w-full max-w-7xl">
              <Outlet />
            </div>
          </main>

          <footer className="border-t border-border/60 px-6 py-4 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </footer>
        </div>
      </div>

      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetTrigger asChild>
          <span className="hidden" />
        </SheetTrigger>
        <SheetContent side="left" className="w-72 p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
