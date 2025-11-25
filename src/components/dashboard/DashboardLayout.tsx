import { useNavigate, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Button } from "@/components/ui/button";
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
  userAvatarUrl = "https://ui-avatars.com/api/?name=John+Doe&background=0D8ABC&color=fff"
}: DashboardLayoutProps) {
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
      <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border/40 flex items-center justify-between px-6 sticky top-0 z-50">
        
        {/* Logo Section */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="w-9 h-9 object-contain"
            />
          </button>
        </div>

        {/* Navigation Links */}
        {/* Added a border-blue-900/20 to the container for subtle consistency */}
        <nav className="hidden md:flex items-center gap-1 bg-secondary/30 p-1 rounded-xl border border-blue-900/10">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-blue-900 text-white shadow-md border border-blue-800" // Active: Solid Dark Blue
                    : "text-muted-foreground hover:bg-blue-950 hover:text-white" // Hover: Very Dark Blue
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {isWalletConnected ? (
            <>
              {/* Stats Group */}
              <div className="hidden lg:flex items-center gap-3 mr-2">
                 <div className="flex flex-col items-end">
                   <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Balance</span>
                   <span className="text-sm font-bold font-mono text-foreground">SPOTS</span>
                </div>
                <div className="h-8 w-[1px] bg-border/60 mx-1"></div>
                
                <div className="flex flex-col items-end">
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Daily PNL</span>
                  <span className="text-sm font-bold font-mono text-emerald-500">+200%</span>
                </div>
              </div>

              {/* Profile Avatar */}
              <button className="relative group">
                {/* Border matches the Dark Blue theme */}
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
              // Changed to Dark Blue (blue-900) -> Very Dark Blue (blue-950) on hover
              className="bg-blue-900 hover:bg-blue-950 text-white font-medium px-6 shadow-lg shadow-blue-900/20 transition-all"
            >
              Connect Wallet
            </Button>
          )}
          
          <div className="pl-2 border-l border-border/50">
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto p-4 relative">
        {children}
      </main>
    </div>
  );
}