import { Button } from "@/components/shared/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "@tanstack/react-router";
import { Bell, Menu, Moon, Search, ShieldCheck, Sun } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      data-ocid="navbar"
      className="glass-card sticky top-0 z-30 flex h-16 items-center gap-3 rounded-none border-x-0 border-t-0 px-4 sm:px-6"
    >
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        <Menu className="size-5" />
      </Button>

      <Link to="/" className="flex items-center gap-2 lg:hidden">
        <div className="bg-gradient-primary flex size-8 items-center justify-center rounded-lg">
          <ShieldCheck className="size-4.5 text-primary-foreground" />
        </div>
        <span className="font-display text-base font-semibold">VeriScan</span>
      </Link>

      <div className="relative ml-auto hidden w-full max-w-sm sm:block">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          data-ocid="search_input"
          type="search"
          placeholder="Search documents, IDs, names…"
          className="bg-background/60 pl-9"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? (
            <Sun className="size-5" />
          ) : (
            <Moon className="size-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="size-5" />
          <span className="bg-destructive absolute top-2 right-2 size-2 rounded-full" />
        </Button>
        <Avatar className="ml-1 size-9">
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback className="bg-gradient-primary text-primary-foreground text-xs font-semibold">
            VS
          </AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
