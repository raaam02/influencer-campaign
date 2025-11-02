import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "../theme-provider";

export function Navbar() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");

  // Resolve theme when set to "system"
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");

      // React to system theme changes live
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setResolvedTheme(e.matches ? "dark" : "light");
      };
      mediaQuery.addEventListener("change", handler);

      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setResolvedTheme(theme);
    }
  }, [theme]);

  const logoSrc =
    resolvedTheme === "dark" ? "/ExhibitDark.png" : "/Exhibit.png";

  const navItems = [
    { label: "Campaigns", to: "/" },
    { label: "Influencers", to: "/influencers" },
    { label: "Assign", to: "/assign" },
  ];

  return (
    <nav className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="flex items-center gap-2 font-semibold text-xl">
          <img src={logoSrc} alt="Exhibit" className="h-14 w-auto" />
        </Link>

        {/* Center: Nav links */}
        <div className="hidden sm:flex gap-6">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "font-medium transition hover:text-primary",
                pathname === item.to ? "text-primary" : "text-muted-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3">
          <ModeToggle />
          <Link to="/campaign/add">
            <Button size="sm" className="rounded-full">
              + New Campaign
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
