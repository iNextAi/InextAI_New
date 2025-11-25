import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, AlertTriangle, CheckCircle, TrendingUp, ArrowRight } from "lucide-react";

export function AIInsights() {
  const insights = [
    {
      title: "Risk Pattern Detected",
      desc: "3 consecutive FOMO trades detected post-loss.",
      icon: AlertTriangle,
      border: "border-l-amber-500",
      iconColor: "text-amber-500",
      bg: "hover:bg-amber-500/5"
    },
    {
      title: "Discipline Improving",
      desc: "Revenge trading frequency down 40% this week.",
      icon: CheckCircle,
      border: "border-l-emerald-500",
      iconColor: "text-emerald-500",
      bg: "hover:bg-emerald-500/5"
    },
    {
      title: "Optimal Window",
      desc: "Performance peaks between 10 AM - 2 PM EST.",
      icon: TrendingUp,
      border: "border-l-blue-500",
      iconColor: "text-blue-500",
      bg: "hover:bg-blue-500/5"
    },
  ];

  return (
    <div className="space-y-4 h-full flex flex-col">
      {/* AI Advisory Card */}
      <Card className="bg-background border-border/40 flex-1 flex flex-col">
        <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
           <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
             <Brain className="w-4 h-4 text-blue-500" />
             AI Advisory
           </h3>
           <span className="flex h-2 w-2 relative">
             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
             <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
           </span>
        </div>
        
        <div className="p-3 space-y-2 flex-1 overflow-auto">
          {insights.map((item, index) => (
            <div 
              key={index} 
              className={`relative pl-3 py-2.5 pr-3 rounded-r-md border-l-2 bg-secondary/10 border-border/50 transition-all cursor-default ${item.border} ${item.bg}`}
            >
              <div className="flex items-start gap-3">
                <item.icon className={`w-4 h-4 mt-0.5 ${item.iconColor}`} />
                <div>
                  <h4 className="text-xs font-semibold text-foreground">{item.title}</h4>
                  <p className="text-[10px] text-muted-foreground mt-0.5 leading-snug">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommendations Card */}
      <Card className="bg-blue-950/20 border-blue-900/30">
        <div className="px-4 py-3 border-b border-blue-900/30 flex justify-between items-center">
          <span className="text-xs font-bold uppercase text-blue-400 tracking-wider">Recommendations</span>
          <Button variant="ghost" size="sm" className="h-5 text-[10px] text-blue-400 hover:text-white hover:bg-blue-900">
            All <ArrowRight className="w-3 h-3 ml-1" />
          </Button>
        </div>
        <div className="p-3">
          <ul className="space-y-2">
            {[
              "Set hard stop at 2% daily loss",
              "Take 15m break after 2 losses"
            ].map((rec, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                <div className="w-1 h-1 bg-blue-500 rounded-full" />
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}