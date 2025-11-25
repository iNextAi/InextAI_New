import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart3 } from "lucide-react";

export function PerformanceChart() {
  // Static data for clean visualization
  const chartData = Array.from({ length: 15 }, (_, i) => ({
    profit: Math.random() * 2000 - 500,
    emotion: Math.random() * 100
  }));

  const totalProfit = 12450;
  
  return (
    <Card className="bg-background border-border/40 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b border-border/40">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold text-foreground">
          <BarChart3 className="w-4 h-4 text-blue-500" />
          Correlation Analysis
        </CardTitle>
        <div className="flex bg-secondary/30 rounded-md p-0.5 border border-border/40">
          <button className="px-2 py-0.5 text-[10px] font-medium bg-blue-900 text-white rounded shadow-sm">30D</button>
          <button className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground hover:text-foreground">90D</button>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        {/* Key Metrics Row */}
        <div className="flex justify-between mb-4 px-2">
           <div className="text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Total P&L</div>
             <div className="text-sm font-bold font-mono text-emerald-500">+$12,450</div>
           </div>
           <div className="w-px bg-border/40 mx-2" />
           <div className="text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Emotion</div>
             <div className="text-sm font-bold font-mono text-blue-400">Stable</div>
           </div>
           <div className="w-px bg-border/40 mx-2" />
           <div className="text-center">
             <div className="text-xs text-muted-foreground uppercase tracking-wider mb-0.5">Win Rate</div>
             <div className="text-sm font-bold font-mono text-foreground">68%</div>
           </div>
        </div>

        {/* Custom SVG Bar Chart - Perfectly Clean */}
        <div className="h-48 w-full bg-secondary/5 rounded-lg border border-border/30 relative overflow-hidden flex items-end justify-between px-2 pb-2 pt-8">
           {/* Zero Line */}
           <div className="absolute top-1/2 left-0 right-0 h-px bg-border/50 border-t border-dashed border-muted-foreground/30" />
           
           {chartData.map((d, i) => {
             // Calculate height relative to max range (approx 1500)
             const height = Math.min(Math.abs(d.profit) / 1500 * 50, 45); // % height
             const isProfit = d.profit > 0;
             
             return (
               <div key={i} className="flex flex-col items-center gap-1 group w-full mx-0.5">
                 {/* Bar */}
                 <div 
                   className={`w-full max-w-[12px] rounded-sm transition-all duration-300 ${isProfit ? 'bg-emerald-500 hover:bg-emerald-400' : 'bg-red-500 hover:bg-red-400'}`}
                   style={{ height: `${height}%`, marginBottom: isProfit ? '48px' : '0', marginTop: isProfit ? '0' : '48px' }}
                 />
               </div>
             )
           })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-emerald-500 rounded-sm" />
            <span className="text-[10px] text-muted-foreground">Profit</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 bg-red-500 rounded-sm" />
            <span className="text-[10px] text-muted-foreground">Loss</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}