import { Button } from "@/components/ui/button";
import { Menu, Shield, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "OUR POLICIES", href: "#policies" },
  { label: "CLAIMS", href: "#claims" },
  { label: "RESOURCES", href: "#resources" },
  { label: "SUPPORT", href: "#support" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = "/";

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-2.5 shrink-0"
          data-ocid="nav.link"
        >
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary">
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="leading-none">
            <span className="font-bold text-lg text-foreground tracking-tight">
              SecureCover
            </span>
            <span className="block text-xs text-muted-foreground font-medium tracking-widest uppercase">
              Insurance
            </span>
          </div>
        </a>

        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              className={`px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors relative ${
                active === link.href
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {link.label}
              {active === link.href && (
                <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-primary rounded-full" />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-semibold border-primary/40 text-primary hover:bg-primary/5"
            data-ocid="nav.login_button"
          >
            Log in
          </Button>
          <Button
            size="sm"
            className="text-xs font-semibold bg-primary hover:bg-primary/90"
            data-ocid="nav.quote_button"
          >
            Get a Quote
          </Button>
        </div>

        <button
          type="button"
          className="md:hidden p-2 rounded text-foreground/70"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          data-ocid="nav.toggle"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-card px-4 pb-4 pt-2">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              data-ocid="nav.link"
              className="block py-2.5 text-sm font-semibold text-foreground/70 hover:text-primary"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className="flex-1 border-primary/40 text-primary"
              data-ocid="nav.login_button"
            >
              Log in
            </Button>
            <Button
              size="sm"
              className="flex-1 bg-primary"
              data-ocid="nav.quote_button"
            >
              Get a Quote
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
