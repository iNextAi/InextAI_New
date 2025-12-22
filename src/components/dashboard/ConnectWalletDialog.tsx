import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Wallet, ChevronRight } from "lucide-react";

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect?: () => void;
}

export function ConnectWalletDialog({ open, onOpenChange, onConnect }: ConnectWalletDialogProps) {
  const walletOptions = [
    { name: "EVM Trades", icon: "⟠" },
    { name: "Solana Trades", icon: "◎" }
  ];

  const handleConnect = () => {
    onConnect?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Connect Wallet</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 py-4">
          {walletOptions.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="w-full justify-between glass-card border-primary/20 hover:border-primary/40 hover:bg-primary/5 h-14 text-base group"
              onClick={handleConnect}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{wallet.icon}</span>
                <span className="font-medium">{wallet.name}</span>
              </div>
              <ChevronRight size={20} className="text-primary group-hover:translate-x-1 transition-transform" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
