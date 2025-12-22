// src/types/global.d.ts

export {};

declare global {
  // -------------------------------
  // EVM Wallet Providers (MetaMask, OKX, Coinbase, Brave, Rabby, Frame…)
  // -------------------------------
  interface EthereumProvider {
    isMetaMask?: boolean;
    isCoinbaseWallet?: boolean;
    isOkxWallet?: boolean;

    // The request method is IMPORTANT (this fixes your error)
    request: (args: {
      method: string;
      params?: Array<any> | object;
    }) => Promise<any>;

    on?: (...args: any[]) => void;
    removeListener?: (...args: any[]) => void;
    chainId?: string;
  }

  // -------------------------------
  // Solana Wallet Providers (Phantom, Solflare)
  // -------------------------------
  interface SolanaProvider {
    isPhantom?: boolean;
    isSolflare?: boolean;

    connect: () => Promise<{ publicKey: { toString(): string } }>;
    disconnect?: () => Promise<void>;
    publicKey?: { toString(): string };
  }

  interface Window {
    ethereum?: EthereumProvider;
    solana?: SolanaProvider;
    solflare?: SolanaProvider;
  }
}
