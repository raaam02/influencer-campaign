import { Link, useLocation } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useTheme } from "../theme-provider";
import { Menu, X, Sparkles } from "lucide-react";

export function Navbar() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Resolve theme when set to "system"
  useEffect(() => {
    if (theme === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setResolvedTheme(isDark ? "dark" : "light");

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
    <nav
      className={cn(
        "border-b bg-background/80 backdrop-blur-md sticky top-0 z-50 transition-all duration-300",
        scrolled && "shadow-sm"
      )}
    >
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-xl group"
          >
            <div className="relative">
              <img
                src={logoSrc}
                alt="Exhibit"
                className="h-12 w-auto transition-transform group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-primary/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10"></div>
            </div>
          </Link>

          {/* Center: Nav links - Desktop */}
          <div className="hidden md:flex items-center gap-1 bg-muted/50 rounded-full px-2 py-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "relative px-4 py-2 rounded-full font-medium transition-all duration-200",
                  pathname === item.to
                    ? "text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {pathname === item.to && (
                  <span className="absolute inset-0 bg-primary rounded-full -z-10 shadow-md"></span>
                )}
                {item.label}
              </Link>
            ))}
          </div>

          {/* Right: Controls */}
          <div className="flex items-center gap-3">
            <ModeToggle />
            <Link to="/campaign/add" className="hidden sm:block">
              <Button
                size="sm"
                className="rounded-full shadow-md hover:shadow-lg transition-all duration-200 hover:scale-105"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-in slide-in-from-top-5 duration-200">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg font-medium transition-colors",
                  pathname === item.to
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/campaign/add"
              onClick={() => setMobileMenuOpen(false)}
              className="block"
            >
              <Button
                size="sm"
                className="w-full rounded-lg shadow-md"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                New Campaign
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}