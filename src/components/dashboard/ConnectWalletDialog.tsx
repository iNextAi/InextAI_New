import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Wallet, ChevronRight, AlertCircle, Loader2 } from "lucide-react";
import { useUser } from "@/context/userContext";

interface ConnectWalletDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConnect?: (walletAddress?: string) => void;
}

export function ConnectWalletDialog({
  open,
  onOpenChange,
  onConnect,
}: ConnectWalletDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setWalletAddress } = useUser();

  // Debug: Log if callback exists
  console.log(
    "ConnectWalletDialog received onConnect:",
    typeof onConnect,
    onConnect
  );

  const connectMetaMask = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if MetaMask is installed
      if (
        typeof window === "undefined" ||
        typeof (window as Window).ethereum === "undefined"
      ) {
        throw new Error("Please install MetaMask extension");
      }

      // Request account access
      const accounts = await (window as Window).ethereum!.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts returned from MetaMask");
      }

      const walletAddress = accounts[0];
      // console.log('About to call onConnect with address:', walletAddress);
      // console.log('onConnect function exists?:', !!onConnect);

      // Call the onConnect callback with the wallet address
      onConnect?.(walletAddress);
      if (walletAddress) {
        setWalletAddress(walletAddress); // Persist to context & localStorage
        console.log("Connected to MetaMask:", walletAddress);
      }
      // console.log('onConnect called!');
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect MetaMask";
      console.error("MetaMask connection error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const connectPhantom = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Check if Phantom is installed
      if (!(window as Window).solana || !(window as Window).solana!.isPhantom) {
        throw new Error("Please install Phantom wallet extension");
      }

      // Connect to Phantom
      const response = await (window as Window).solana!.connect();
      const walletAddress = response.publicKey.toString();
      console.log("Connected to Phantom:", walletAddress);

      // Call the onConnect callback with the wallet address
      onConnect?.(walletAddress);
      onOpenChange(false);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Failed to connect Phantom";
      console.error("Phantom connection error:", errorMessage);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass-card border-primary/20 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center flex items-center justify-center gap-2">
            <Wallet size={24} />
            Connect Wallet
          </DialogTitle>
          <DialogDescription className="text-center">
            Select your wallet provider to connect and authenticate
          </DialogDescription>
        </DialogHeader>

        {error && (
          <Alert
            variant="destructive"
            className="bg-destructive/10 border-destructive/20"
          >
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-3 py-4">
          <Button
            disabled={isLoading}
            onClick={connectMetaMask}
            className="w-full justify-between glass-card border-primary/20 hover:border-primary/40 hover:bg-primary/5 h-14 text-base group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">⟠</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">MetaMask</span>
                <span className="text-xs text-muted-foreground">
                  EVM Trades
                </span>
              </div>
            </div>
            {isLoading ? (
              <Loader2 size={20} className="text-primary animate-spin" />
            ) : (
              <ChevronRight
                size={20}
                className="text-primary group-hover:translate-x-1 transition-transform"
              />
            )}
          </Button>

          <Button
            disabled={isLoading}
            onClick={connectPhantom}
            className="w-full justify-between glass-card border-primary/20 hover:border-primary/40 hover:bg-primary/5 h-14 text-base group"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">◎</span>
              <div className="flex flex-col items-start">
                <span className="font-medium">Phantom</span>
                <span className="text-xs text-muted-foreground">
                  Solana Trades
                </span>
              </div>
            </div>
            {isLoading ? (
              <Loader2 size={20} className="text-primary animate-spin" />
            ) : (
              <ChevronRight
                size={20}
                className="text-primary group-hover:translate-x-1 transition-transform"
              />
            )}
          </Button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          Securely connect your wallet to start trading and accessing AI
          insights.
        </p>
      </DialogContent>
    </Dialog>
  );
}
