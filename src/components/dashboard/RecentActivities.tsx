import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle, ChevronRight, Lock } from "lucide-react";

interface RecentActivitiesProps {
  isWalletConnected?: boolean;
}

export const RecentActivities = ({ isWalletConnected = false }: RecentActivitiesProps) => {
  if (!isWalletConnected) {
    return (
      <Card className="h-full bg-background/50 border-blue-900/20 flex flex-col items-center justify-center p-6 text-center">
        <Lock className="w-8 h-8 text-muted-foreground mb-3 opacity-50" />
        <h3 className="text-sm font-semibold text-foreground">Activities Hidden</h3>
        <p className="text-xs text-muted-foreground mt-1">Connect wallet to view ledger.</p>
      </Card>
    );
  }
  
  const activities = [
    { type: "trade", title: "BTC Position Closed", desc: "Take Profit Hit", time: "14:23", icon: TrendingUp, color: "emerald", val: "+$245.50" },
    { type: "emotion", title: "High FOMO Alert", desc: "Risk parameters exceeded", time: "13:45", icon: AlertTriangle, color: "amber", val: "High Risk" },
    { type: "ai", title: "Pattern Identified", desc: "Bullish Divergence on ETH", time: "12:30", icon: Brain, color: "blue", val: "87% Prob" },
    { type: "trade", title: "SOL Stop Loss", desc: "Market volatility spike", time: "11:15", icon: TrendingDown, color: "red", val: "-$89.30" },
  ];

  return (
    <Card className="h-full bg-background border-border/40 flex flex-col">
      <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between bg-secondary/5">
        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
          <Target className="w-3.5 h-3.5" />
          Ledger
        </h3>
        <Button variant="ghost" size="sm" className="h-6 text-[10px] px-2 text-blue-500 hover:text-blue-400 hover:bg-blue-950/30">
          View All <ChevronRight className="w-3 h-3 ml-1" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="flex flex-col">
          {activities.map((item, index) => {
            const isLast = index === activities.length - 1;
            const Icon = item.icon;
            
            // Map colors to standard tailwind classes safely
            const colorMap: Record<string, string> = {
              emerald: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
              amber: "text-amber-500 bg-amber-500/10 border-amber-500/20",
              blue: "text-blue-500 bg-blue-500/10 border-blue-500/20",
              red: "text-red-500 bg-red-500/10 border-red-500/20"
            };
            const theme = colorMap[item.color] || colorMap.blue;

            return (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-3 hover:bg-secondary/30 transition-colors ${!isLast ? 'border-b border-border/30' : ''}`}
              >
                {/* Icon Box */}
                <div className={`w-8 h-8 rounded-md flex items-center justify-center border ${theme}`}>
                  <Icon size={14} className="currentColor" />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <h4 className="text-xs font-semibold text-foreground truncate">{item.title}</h4>
                    <span className={`text-[10px] font-mono font-medium ${item.val.startsWith('+') ? 'text-emerald-500' : item.val.startsWith('-') ? 'text-red-500' : 'text-muted-foreground'}`}>
                      {item.val}
                    </span>
                  </div>
                  <div className="flex justify-between items-end mt-0.5">
                    <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    <span className="text-[9px] text-slate-500 font-mono">{item.time}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </Card>
  );
};