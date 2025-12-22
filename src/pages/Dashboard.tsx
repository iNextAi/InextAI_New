import React, { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";
import { AdvancedPerformanceChart } from "@/components/dashboard/AdvancedPerformanceChart";
import { PerformanceMetrics } from "@/components/dashboard/PerformanceMetrics";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { AIInsightCards } from "@/components/dashboard/AIInsightCards";
import { ConnectWalletDialog } from "@/components/dashboard/ConnectWalletDialog";
import { MoodWellnessDialog } from "@/components/dashboard/MoodWellnessDialog";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

const Index = () => {
  const [showWalletDialog, setShowWalletDialog] = useState(false);
  const [showMoodDialog, setShowMoodDialog] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);

  const handleWalletConnect = () => {
    setShowWalletDialog(true);
  };

  const handleWalletConnected = () => {
    setIsWalletConnected(true);
    setShowWalletDialog(false);
    setTimeout(() => {
      setShowMoodDialog(true);
    }, 500);
  };

  return (
    <DashboardLayout
      isWalletConnected={isWalletConnected}
      onConnectWallet={handleWalletConnect}
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
        onConnect={handleWalletConnected}
      />
      <MoodWellnessDialog
        open={showMoodDialog}
        onOpenChange={setShowMoodDialog}
      />
    </DashboardLayout>
  );
};

export default Index;
