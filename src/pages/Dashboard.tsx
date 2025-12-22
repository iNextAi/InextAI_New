import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdvancedPerformanceChart } from '@/components/dashboard/AdvancedPerformanceChart';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { AIInsightCards } from '@/components/dashboard/AIInsightCards';
import { ConnectWalletDialog } from '@/components/dashboard/ConnectWalletDialog';
import { MoodWellnessDialog } from '@/components/dashboard/MoodWellnessDialog';
import EthereumProvider from "@walletconnect/ethereum-provider";
import { WalletConnectRequest, WalletType } from '@/services/api';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';
import tradingAPI from '@/services/api';

const Index = () => {
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [ userAddress, setUserAddress ] = useState("")
  const [ connectedChain, setConnectedChain] = useState("")
  const [ userSignature, setUserSignature ] = useState("")
  const [ connectedWalletType, setConnectedWalletType] = useState<WalletType>("metamask")

  const prepWalletConnect = () => {
    setShowWalletDialog(true);
  };

const handleWalletConnect = async (walletName: string) => {
  try {
    let address: string | undefined;
    let walletType: WalletType = 'metamask'; // Using your type from earlier
    let signature: string | undefined;
    const message = `Login to Mindful Trading at ${new Date().toISOString()}`;

    console.log("Starting connection for:", walletName);

    if (walletName === "EVM Trades") {
      if (window.ethereum) {
        // 1. Get Address
        const accounts: string[] = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        address = accounts[0];
        walletType = 'metamask';

        // 2. Get Signature (Crucial for secure login)
        const hexMessage = `0x${Array.from(new TextEncoder().encode(message))
          .map(b => b.toString(16).padStart(2, '0'))
          .join('')}`;
        signature = await window.ethereum.request({
          method: 'personal_sign',
          params: [hexMessage, address],
        });

        setConnectedChain("evm");
        setConnectedWalletType("metamask");
      } else {
        // WalletConnect Logic
        const wcProvider = await EthereumProvider.init({
          projectId: "your_walletconnect_project_id",
          chains: [1],
          showQrModal: true,
        });
        await wcProvider.connect();
        address = wcProvider.accounts[0];
        walletType = 'metamask'; // Or specific WC type
        setConnectedChain("evm");
        setConnectedWalletType("walletconnect");
      }
    } 
    else if (walletName === "Solana Trades") {
      const provider = window.solana || window.solflare;
      if (!provider) {
        alert("No Solana wallet found.");
        return;
      }
      const resp = await provider.connect();
      address = resp.publicKey.toString();
      walletType = 'phantom'; 

      // Solana Signing (using Phantoms/Solflare API)
      const encodedMessage = new TextEncoder().encode(message);
      const signedMessage = await provider.signMessage(encodedMessage, "utf8");
      signature = signedMessage.signature ? Buffer.from(signedMessage.signature).toString('hex') : Buffer.from(signedMessage).toString('hex');

      setConnectedChain("solana");
      setConnectedWalletType(provider.isPhantom ? "phantom" : "solflare");
    }

    // CRITICAL: Use 'address' variable here, NOT 'userAddress' state
    if (address && signature) {
      setUserAddress(address);
      
      const loginData: WalletConnectRequest = {
        walletAddress: address,
        walletType: walletType,
        signature: signature,
        message: message,
        chainId: 1
      };

      const res = await tradingAPI.connectWallet(loginData);
      
      if (res) {
        setIsWalletConnected(true);
        setShowWalletDialog(false);
        setTimeout(() => setShowMoodDialog(true), 500);
      }
    }

  } catch (error) {
    console.error("Wallet connection error:", error);
    // User likely rejected the request
  }
};


  return (
    <DashboardLayout 
      isWalletConnected={isWalletConnected} 
      onConnectWallet={prepWalletConnect}
    >
      <div className="w-full h-fit md:h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full p-4 max-md:p-2 max-md:grid-cols-1 max-md:grid-rows-4">
          <div className="md:col-span-2 md:row-span-1">
            <AdvancedPerformanceChart isWalletConnected={isWalletConnected} />
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <PerformanceMetrics isWalletConnected={isWalletConnected} />
          </div>

          <div className="md:col-span-1 md:row-span-1">
            <div className="h-fit md:h-64">
              <RecentActivities isWalletConnected={isWalletConnected} />
            </div>
          </div>

          <div className="md:col-span-2 md:row-span-1">
            <div className="h-fit md:h-64">
              <AIInsightCards isWalletConnected={isWalletConnected} />
            </div>
          </div>
        </div>
      </div>

      <ConnectWalletDialog
        open={showWalletDialog}
        onOpenChange={setShowWalletDialog}
        onConnect={handleWalletConnect}
      />
      <MoodWellnessDialog
        open={showMoodDialog}
        onOpenChange={setShowMoodDialog}
      />
    </DashboardLayout>
  );
};

export default Index;
