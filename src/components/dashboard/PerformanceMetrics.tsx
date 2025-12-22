import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import axios from 'axios';
import { useEffect, useState } from 'react';
import tradingAPI from '@/services/api';

interface PerformanceMetricsProps {
  isWalletConnected?: boolean;
}

export function PerformanceMetrics({
  isWalletConnected = false,
}: PerformanceMetricsProps) {
  const [performanceData, setPerformanceData] = useState([]);
  useEffect(() => {
    try {
      const getPerformanceMetrics = async () => {
        const res = await tradingAPI.getPerformanceMetrics();
        console.log(res)
        setPerformanceData(res);
      };
      getPerformanceMetrics()
    } catch (err) {
      console.log('Error', err);
    }
  }, []);
  if (!isWalletConnected) {
    return (
      <Card className="h-full bg-background/50 border-blue-900/20 flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center mb-3">
          <Lock className="w-5 h-5 text-muted-foreground" />
        </div>
        <h3 className="text-sm font-semibold">Metrics Locked</h3>
      </Card>
    );
  }

  const data = { profit: 60, loss: 30, breakEven: 10 };
  const total = 100;
  
  // Clean SVG calculation logic
  const radius = 38;
  const stroke = 6;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = (percent: number) => circumference - (percent / 100) * circumference;

  return (
    <Card className="h-full bg-background border-border/40 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-3 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-3.5 h-3.5 text-blue-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Key Metrics</h3>
        </div>
        <Badge variant="outline" className="text-[10px] border-emerald-500/30 text-emerald-500 bg-emerald-500/5 font-mono">
          Live
        </Badge>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-3 space-y-4">
          
          {/* Donut Chart - Minimalist & Clean */}
          <div className="flex items-center gap-4 bg-secondary/20 p-3 rounded-xl border border-blue-900/10">
            <div className="relative w-20 h-20 flex-shrink-0">
               {/* Background Circle */}
               <svg height="100%" width="100%" viewBox="0 0 80 80" className="rotate-[-90deg]">
                 <circle cx="40" cy="40" r={normalizedRadius} fill="transparent" stroke="#1e293b" strokeWidth={stroke} />
                 {/* Segments */}
                 <circle cx="40" cy="40" r={normalizedRadius} fill="transparent" stroke="#10B981" strokeWidth={stroke} 
                         strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={strokeDashoffset(data.profit)} />
                 <circle cx="40" cy="40" r={normalizedRadius} fill="transparent" stroke="#EF4444" strokeWidth={stroke} 
                         strokeDasharray={`${circumference} ${circumference}`} strokeDashoffset={strokeDashoffset(data.profit + data.loss)} className="opacity-80" />
               </svg>
               <div className="absolute inset-0 flex items-center justify-center flex-col">
                 <span className="text-[10px] text-muted-foreground">Win Rate</span>
                 <span className="text-sm font-bold text-foreground">60%</span>
               </div>
            </div>
            
            <div className="flex-1 space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div><span className="text-muted-foreground">Profit</span></div>
                <span className="font-mono text-foreground">60%</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500"></div><span className="text-muted-foreground">Loss</span></div>
                <span className="font-mono text-foreground">30%</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div><span className="text-muted-foreground">Neutral</span></div>
                <span className="font-mono text-foreground">10%</span>
              </div>
            </div>
          </div>

          {/* Stats Grid - Professional Borders */}
          <div className="grid grid-cols-2 gap-px bg-border/40 border border-border/40 rounded-lg overflow-hidden">
             {[
               { label: "Best Trade", val: "+86.6%", color: "text-emerald-500" },
               { label: "Worst Trade", val: "-26.6%", color: "text-red-500" },
               { label: "Avg Trade", val: "+26.6%", color: "text-blue-400" },
               { label: "Degen Score", val: "71/100", color: "text-amber-500" }
             ].map((item, i) => (
               <div key={i} className="bg-background/95 p-2.5 flex flex-col items-center justify-center hover:bg-secondary/20 transition-colors">
                 <span className="text-[9px] text-muted-foreground uppercase tracking-wider mb-1">{item.label}</span>
                 <span className={`text-xs font-bold font-mono ${item.color}`}>{item.val}</span>
               </div>
             ))}
          </div>

        </div>
      </ScrollArea>
    </Card>
  );
}
