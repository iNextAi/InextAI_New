import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import { AdvancedPerformanceChart } from '@/components/dashboard/AdvancedPerformanceChart';
import { PerformanceMetrics } from '@/components/dashboard/PerformanceMetrics';
import { RecentActivities } from '@/components/dashboard/RecentActivities';
import { AIInsightCards } from '@/components/dashboard/AIInsightCards';
import { ConnectWalletDialog } from '@/components/dashboard/ConnectWalletDialog';
import { MoodWellnessDialog } from '@/components/dashboard/MoodWellnessDialog';
import { Button } from '@/components/ui/button';
import { Wallet } from 'lucide-react';

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
      {/* Single Screen Grid - Reduced height for some components */}
      <div className="w-full h-[calc(100vh-4rem)]">
        <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full p-4">
          
          {/* Performance Chart - Top Left (2x1) - Full Height */}
          <div className="col-span-2 row-span-1">
            <AdvancedPerformanceChart isWalletConnected={isWalletConnected} />
          </div>
          
          {/* Performance Metrics - Top Right (1x1) - Full Height */}
          <div className="col-span-1 row-span-1">
            <PerformanceMetrics isWalletConnected={isWalletConnected} />
          </div>

          {/* Recent Activities - Bottom Left (1x1) - Reduced Height */}
          <div className="col-span-1 row-span-1">
            <div className="h-64"> {/* Reduced from full height */}
              <RecentActivities isWalletConnected={isWalletConnected} />
            </div>
          </div>

          {/* AI Insights - Bottom Right (2x1) - Reduced Height */}
          <div className="col-span-2 row-span-1">
            <div className="h-64"> {/* Reduced from full height */}
              <AIInsightCards isWalletConnected={isWalletConnected} />
            </div>
          </div>
        </div>
      </div>

      {/* Dialogs */}
      <ConnectWalletDialog 
        open={showWalletDialog} 
        onOpenChange={setShowWalletDialog}
        onConnect={handleWalletConnected}
      />
      <MoodWellnessDialog open={showMoodDialog} onOpenChange={setShowMoodDialog} />
    </DashboardLayout>
  );
};

export default Index;