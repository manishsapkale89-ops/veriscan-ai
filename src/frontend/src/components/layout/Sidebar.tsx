import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  BarChart3,
  FileSearch,
  LayoutDashboard,
  Settings,
  ShieldCheck,
  UploadCloud,
} from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload", icon: UploadCloud },
  { to: "/reports", label: "Reports", icon: BarChart3 },
  { to: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  className?: string;
  onNavigate?: () => void;
}

export function Sidebar({ className, onNavigate }: SidebarProps) {
  return (
    <div
      data-ocid="sidebar"
      className={cn("flex h-full flex-col gap-6 p-4", className)}
    >
      <Link
        to="/"
        onClick={onNavigate}
        className="flex items-center gap-2.5 px-2"
      >
        <div className="bg-gradient-primary flex size-9 items-center justify-center rounded-xl shadow-elevated">
          <ShieldCheck className="size-5 text-primary-foreground" />
        </div>
        <div className="leading-tight">
          <p className="font-display text-base font-semibold tracking-tight">
            VeriScan
          </p>
          <p className="text-[11px] text-muted-foreground">
            Identity Screening
          </p>
        </div>
      </Link>

      <nav className="flex flex-1 flex-col gap-1" aria-label="Main navigation">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={onNavigate}
              activeOptions={{ exact: true }}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-muted-foreground transition-smooth hover:bg-accent/60 hover:text-foreground",
                "data-[status=active]:bg-gradient-subtle data-[status=active]:text-foreground data-[status=active]:shadow-subtle",
              )}
              activeProps={{
                className: "data-[status=active]:bg-gradient-subtle",
              }}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    className={cn(
                      "size-5",
                      isActive ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="bg-gradient-primary ml-auto h-1.5 w-1.5 rounded-full" />
                  )}
                </>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <FileSearch className="size-4 text-primary" />
          <span>Need help?</span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          Check the docs for API and integration guides.
        </p>
        <Button variant="outline" size="sm" className="mt-3 w-full">
          View docs
        </Button>
      </div>
    </div>
  );
}
