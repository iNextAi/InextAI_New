// src/pages/LandingPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/LandingPageUI/button";
import { Card } from "@/components/LandingPageUI/card";
import { Input } from "@/components/LandingPageUI/input";
import { Tooltip } from "@/components/LandingPageUI/tooltip";
import HeroSection from "@/components/LandingPage/HeroSection";
import TradingChart from "@/components/LandingPage/TradingChart";
import FeatureHighlights from "@/components/LandingPage/FeatureHighlights";
import Footer from "@/components/LandingPage/Footer";
import Navbar from "@/components/LandingPage/Navbar";
import { ConnectWalletDialog } from "@/components/dashboard/ConnectWalletDialog";
import { useUser } from "@/context/userContext";

const LandingPage = () => {
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const navigate = useNavigate();
  const { setWalletAddress } = useUser();

  const handleWalletConnected = (walletAddress?: string) => {
    console.log("handleWalletConnected called with:", walletAddress);
    console.log("Wallet connected to be sure:", walletAddress);
    if (walletAddress) {
      console.log("About to call setWalletAddress with:", walletAddress);
      setWalletAddress(walletAddress); // Persist to context & localStorage
      console.log("setWalletAddress called");
    }
    // Navigate to dashboard after successful connection
    console.log("Navigating to dashboard");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar onConnectClick={() => setShowWalletDialog(true)} />
      <HeroSection />
      <TradingChart />
      <FeatureHighlights />
      <Footer />
      <Button />
      <Input />
      <Tooltip />
      <Card />

      {/* Wallet Connection Dialog */}
      <ConnectWalletDialog
        open={showWalletDialog}
        onOpenChange={setShowWalletDialog}
        onConnect={handleWalletConnected}
      />
    </div>
  );
};

export default LandingPage;
