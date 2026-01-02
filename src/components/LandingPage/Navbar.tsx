import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Bell, Wallet, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/LandingPageUI/avatar";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/userContext";

const Navbar = ({ onConnectClick }) => {
  const { user, clearUser } = useUser();
  const shortAddress = (addr?: string) =>
    addr ? `${addr.slice(0, 6)}...${addr.slice(-4)}` : null;
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between border-b border-border">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold text-primary">
        iNextAi
      </Link>

      {/* Right: Nav items */}
      <div className="flex items-center gap-4">
        <Link
          to="/dashboard"
          className="text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          Dashboard
        </Link>

        {/* Connect/Disconnect Wallet Button */}
        {user?.walletAddress ? (
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="lg"
              disabled
              className="border-primary/50 text-primary px-4 py-3 text-sm font-semibold rounded-xl bg-primary/5"
            >
              <Wallet className="mr-2 h-5 w-5" />
              {shortAddress(user.walletAddress)}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                clearUser();
                console.log('Wallet disconnected');
              }}
              className="text-muted-foreground hover:text-destructive"
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <Button
            variant="outline"
            size="lg"
            onClick={onConnectClick}
            className="border-primary/50 text-primary hover:bg-primary/10 px-6 py-3 text-sm font-semibold rounded-xl transition-colors"
          >
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        )}

        <ThemeToggle />
        <Bell className="w-5 h-5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" />

        <Avatar>
          <AvatarImage src="/avatar.jpg" alt="User" />
          <AvatarFallback>IA</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
};

export default Navbar;
