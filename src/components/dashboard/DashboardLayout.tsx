import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "@/assets/inext.png";

interface DashboardLayoutProps {
  children: React.ReactNode;
  isWalletConnected?: boolean;
  onConnectWallet?: () => void;
  userAvatarUrl?: string;
}

export function DashboardLayout({
  children,
  isWalletConnected = false,
  onConnectWallet,
  userAvatarUrl = "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff",
}: DashboardLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Journal", path: "/journal" },
    { label: "Simulator", path: "/trading-new" },
    { label: "Market", path: "/market" },
    { label: "Copilot", path: "/copilot" },
    { label: "Portfolio", path: "/portfolio" },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Top Navbar */}
      <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border/40 flex items-center justify-between px-6 sticky top-0 z-50 max-md:relative">
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img src={logo} alt="Logo" className="w-9 h-9 object-contain" />
          </button>
        </div>

        {/* Desktop Navigation - COMPLETELY SEPARATE */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/30 p-1 rounded-xl border border-blue-900/10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-900 text-white shadow-md border border-blue-800"
                    : "text-muted-foreground hover:bg-blue-950 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {isWalletConnected ? (
            <>
              {/* Stats Group */}
              <div className="hidden lg:flex items-center gap-3 mr-2">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Balance
                  </span>
                  <span className="text-sm font-bold font-mono text-foreground">
                    SPOTS
                  </span>
                </div>
                <div className="h-8 w-[1px] bg-border/60 mx-1"></div>

                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                    Daily PNL
                  </span>
                  <span className="text-sm font-bold font-mono text-emerald-500">
                    +200%
                  </span>
                </div>
              </div>

              {/* Profile Avatar */}
              <button className="relative group hidden md:block">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-blue-900/30 group-hover:border-blue-900 transition-colors">
                  <img
                    src={userAvatarUrl}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-emerald-500 border-2 border-background rounded-full"></div>
              </button>
            </>
          ) : (
            <Button
              onClick={onConnectWallet}
              className="hidden md:inline-flex bg-blue-900 hover:bg-blue-950 text-white font-medium px-6 shadow-lg shadow-blue-900/20 transition-all"
            >
              Connect Wallet
            </Button>
          )}

          <div className="pl-2 border-l border-border/50 hidden md:block">
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button - Shows on mobile only */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-blue-900/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <IoClose size={24} /> : <IoMenu size={24} />}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY - SEPARATE COMPONENT */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm">
          <div className="flex flex-col p-6 space-y-4">
            {/* Theme Toggle in Mobile Menu */}
            <div className="flex justify-between items-center pb-4 border-b border-border">
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>

            {/* Mobile Navigation Items */}
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMobileMenuOpen(false); // Close menu after navigation
                  }}
                  className={`px-4 py-3.5 rounded-lg text-base font-medium transition-all duration-200 text-left ${
                    isActive
                      ? "bg-blue-900 text-white shadow-md border border-blue-800"
                      : "text-muted-foreground hover:bg-blue-950 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Mobile-only Connect Wallet Button */}
            {!isWalletConnected && (
              <Button
                onClick={() => {
                  onConnectWallet?.();
                  setMobileMenuOpen(false);
                }}
                className="mt-6 bg-blue-900 hover:bg-blue-950 text-white font-medium py-3.5 shadow-lg shadow-blue-900/20 transition-all text-base"
              >
                Connect Wallet
              </Button>
            )}

            {/* Mobile-only Profile */}
            {isWalletConnected && (
              <div className="mt-6 pt-6 border-t border-border flex items-center gap-3">
                <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-blue-900/30">
                  <img
                    src={userAvatarUrl}
                    alt="User Profile"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-medium">John Doe</p>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Balance
                      </span>
                      <span className="text-sm font-bold font-mono">SPOTS</span>
                    </div>
                    <div className="h-6 w-[1px] bg-border/60"></div>
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Daily PNL
                      </span>
                      <span className="text-sm font-bold font-mono text-emerald-500">
                        +200%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main Content Area - Clicking closes mobile menu */}
      <main
        className="flex-1 overflow-auto p-4 relative"
        onClick={() => mobileMenuOpen && setMobileMenuOpen(false)}
      >
        {children}
      </main>
    </div>
  );
}