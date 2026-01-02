/// <reference types="vite/client" />

declare global {
	interface Window {
		ethereum?: {
			request?: (...args: any[]) => Promise<any>;
			isMetaMask?: boolean;
		};
		solana?: {
			isPhantom?: boolean;
			connect?: (...args: any[]) => Promise<any>;
			publicKey?: { toString: () => string } | null;
		};
	}
}

export {};
