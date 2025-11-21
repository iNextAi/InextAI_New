import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Percent, Plus, BarChart3, Lock } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface PerformanceMetricsProps {
  isWalletConnected?: boolean;
}

export function PerformanceMetrics({ isWalletConnected = false }: PerformanceMetricsProps) {
  if (!isWalletConnected) {
    return (
      <Card className="glass-card border-primary/20 p-2 md:p-2.5 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">PERFORMANCE Overview</h3>
            <p className="text-xs text-muted-foreground">Connect your wallet to view metrics</p>
          </div>
        </div>
      </Card>
    );
  }
  // Donut chart data
  const data = {
    profit: 60,
    loss: 30,
    breakEven: 10
  };
  
  const total = data.profit + data.loss + data.breakEven;
  const profitAngle = (data.profit / total) * 360;
  const lossAngle = (data.loss / total) * 360;
  const breakEvenAngle = (data.breakEven / total) * 360;

  const radius = 40;
  const strokeWidth = 10;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <Card className="glass-card border-primary/20 p-1.5 md:p-2 h-full flex flex-col overflow-hidden">
      {/* Header Section - Fixed at top */}
      <div className="mb-1.5 md:mb-2 flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-[10px] md:text-xs font-bold text-foreground flex items-center gap-1">
            <Shield className="w-2.5 h-2.5 md:w-3 md:h-3 text-primary" />
            Performance
          </h3>
        </div>
        <div className="flex items-baseline gap-1.5">
          <div className="text-sm md:text-base font-bold text-success">+343.6%</div>
          <Badge variant="outline" className="text-success border-success/30 text-[8px] px-1 py-0">
            Total PNL
          </Badge>
        </div>
      </div>

      {/* Scrollable Content Area - Hidden Scrollbar */}
      <ScrollArea className="flex-1 [&>div>div]:!overflow-hidden [&>div>div]:!-mr-1">
        <div className="space-y-1.5 md:space-y-2 pr-1">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-0.5 md:gap-1">
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Best Trade</div>
              <div className="text-[10px] md:text-xs font-bold text-success">+86.6%</div>
            </div>
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Worst Trade</div>
              <div className="text-[10px] md:text-xs font-bold text-destructive">-26.6%</div>
            </div>
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Avg Trade</div>
              <div className="text-[10px] md:text-xs font-bold text-primary">+26.6%</div>
            </div>
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Win Rate</div>
              <div className="text-[10px] md:text-xs font-bold text-success">56.6%</div>
            </div>
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Degen Score</div>
              <div className="text-[10px] md:text-xs font-bold text-primary">71</div>
            </div>
            <div className="glass-card p-0.5 md:p-1 rounded-lg border border-primary/10">
              <div className="text-[8px] md:text-[9px] text-muted-foreground mb-0.5">Trades</div>
              <div className="text-[10px] md:text-xs font-bold text-foreground">20</div>
            </div>
          </div>

          {/* Donut Chart Section */}
          <div className="flex flex-col items-center justify-center py-2">
            <svg width={radius * 2} height={radius * 2} className="w-10 h-10 md:w-12 md:h-12">
              <g transform={`translate(${radius}, ${radius}) rotate(-90)`}>
                {/* Profit segment */}
                <circle
                  cx={0}
                  cy={0}
                  r={normalizedRadius}
                  stroke="hsl(var(--success))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(profitAngle / 360) * circumference} ${circumference}`}
                  strokeLinecap="round"
                />
                {/* Loss segment */}
                <circle
                  cx={0}
                  cy={0}
                  r={normalizedRadius}
                  stroke="hsl(var(--destructive))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(lossAngle / 360) * circumference} ${circumference}`}
                  strokeDashoffset={-((profitAngle / 360) * circumference)}
                  strokeLinecap="round"
                />
                {/* Break-even segment */}
                <circle
                  cx={0}
                  cy={0}
                  r={normalizedRadius}
                  stroke="hsl(var(--warning))"
                  strokeWidth={strokeWidth}
                  fill="transparent"
                  strokeDasharray={`${(breakEvenAngle / 360) * circumference} ${circumference}`}
                  strokeDashoffset={-(((profitAngle + lossAngle) / 360) * circumference)}
                  strokeLinecap="round"
                />
              </g>
            </svg>
            
            {/* Legend */}
            <div className="flex items-center gap-2 md:gap-3 mt-1.5 md:mt-2 text-[9px] md:text-[10px]">
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Profit</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-destructive rounded-full"></div>
                <span className="text-muted-foreground">Loss</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">Break-Even</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </Card>
  );
}