import { Bell, Moon, Sun, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import AuthButtons from "@/components/auth/AuthButtons";

export function SiteHeader() {
  const [dark, setDark] = useState<boolean>(false);
  const [user, setUser] = useState<{ email?: string; username?: string; name?: string; isAdmin?: boolean } | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const root = document.documentElement;
    const stored = localStorage.getItem("theme");
    const prefers =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefers;
    root.classList.toggle("dark", isDark);
    root.style.setProperty("color-scheme", isDark ? "dark" : "light");
    setDark(isDark);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.style.setProperty("color-scheme", dark ? "dark" : "light");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  // Always re-check auth state on route change and browser navigation (back/forward)
  useEffect(() => {
    const checkAuth = () => {
      fetch("/api/auth/me", { credentials: "include" })
        .then(async (res) => {
          let data = null;
          try {
            data = res.ok ? await res.json() : null;
          } catch (e) {
            data = null;
          }
          return data;
        })
        .then((data) => {
          setUser(data);
          setAuthChecked(true);
        })
        .catch(() => {
          setUser(null);
          setAuthChecked(true);
        });
    };
    setAuthChecked(false);
    checkAuth();
    window.addEventListener("popstate", checkAuth);
    return () => window.removeEventListener("popstate", checkAuth);
  }, [location.pathname]);
  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b border-white/10",
        "bg-background/70 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto max-w-[1400px] px-4 py-3 flex items-center gap-3">
        <a href="/" className="flex items-center gap-2 group">
          <div className="size-8 rounded-md bg-gradient-to-tr from-cyan-500 to-teal-400 ring-2 ring-cyan-500/30 shadow-lg shadow-cyan-900/30 grid place-items-center">
            <span className="sr-only">CyberNavy</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              className="text-white"
            >
              <path
                fill="currentColor"
                d="M12 2l7 4v5c0 5-3 9-7 11c-4-2-7-6-7-11V6z"
              />
            </svg>
          </div>
          <span className="font-semibold tracking-tight text-foreground">
            CyberNavy
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1 ml-4">
          {[
            ["Solutions", "/solutions"],
            ["Pricing", "/pricing"],
            ["Docs", "/docs"],
            ["Blog", "/blog"],
            ["Company", "/company"],
            ["Legal", "/legal"],
          ].map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="px-3 py-2 rounded-md text-sm text-foreground/80 hover:text-foreground hover:bg-white/5 transition-colors"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-foreground/50" />
            <input
              aria-label="Search"
              className="w-64 h-9 rounded-md pl-9 pr-3 bg-white/5 border border-white/10 outline-none text-sm placeholder:text-foreground/50 focus:ring-2 ring-cyan-500/40 transition"
              placeholder="Search docs, blog, or the app..."
            />
          </div>
          <Button
            variant="ghost"
            aria-label="Notifications"
            className="text-foreground/80 hover:text-foreground"
          >
            <Bell className="size-5" />
          </Button>
          <Button
            variant="ghost"
            aria-label="Toggle theme"
            onClick={() => setDark((d) => !d)}
            className="text-foreground/80 hover:text-foreground"
          >
            {dark ? <Sun className="size-5" /> : <Moon className="size-5" />}
          </Button>
          <a href="/app" className="hidden sm:inline-flex">
            <Button className="bg-gradient-to-tr from-cyan-500 to-teal-400 text-white shadow-lg shadow-cyan-900/30 hover:opacity-95">
              Open App
            </Button>
          </a>
          <div className="hidden sm:block h-6 w-px bg-white/10" />
          {!authChecked ? null : user?.email ? (
            <>
              <span className="text-xs text-foreground/70 mr-2">{user.name || user.username || user.email}</span>
              <div className="relative inline-block text-left">
                <button
                  className="inline-flex items-center px-2 py-1 text-sm font-medium rounded hover:bg-white/10 focus:outline-none"
                  id="user-menu"
                  aria-haspopup="true"
                  aria-expanded={menuOpen}
                  onClick={() => setMenuOpen((v) => !v)}
                >
                  Menu
                  <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                </button>
                {menuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-background border border-white/10 z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-foreground/90 hover:bg-white/5 rounded-t-md"
                      role="menuitem"
                      onClick={() => setMenuOpen(false)}
                    >
                      Profile
                    </a>
                    {user.isAdmin && (
                      <a
                        href="/admin"
                        className="block px-4 py-2 text-sm text-foreground/90 hover:bg-white/5"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        Admin
                      </a>
                    )}
                    <a
                      href="#"
                      onClick={() => {
                        fetch("/api/auth/logout", { method: "POST", credentials: "include" }).then(() => window.location.reload());
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-red-500 hover:bg-white/5 rounded-b-md"
                      role="menuitem"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
            <AuthButtons />
          )}
        </div>
      </div>
    </header>
  );
}
