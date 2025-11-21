import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, DollarSign, Clock } from "lucide-react";
import { motion } from "framer-motion";

const tradeSignals = [
  {
    id: 1,
    token: "$DOGGWIF",
    message: "just launched with $1.2M volume in 30 mins...",
    volume: "$1.2M",
    time: "2m ago",
    sentiment: "bullish"
  },
  {
    id: 2,
    token: "$PEPE",
    message: "whale accumulation detected, 5 wallets buying...",
    volume: "$850K",
    time: "5m ago",
    sentiment: "bullish"
  },
  {
    id: 3,
    token: "$SHIB",
    message: "trending on crypto twitter, momentum building...",
    volume: "$2.1M",
    time: "8m ago",
    sentiment: "neutral"
  },
  {
    id: 4,
    token: "$BONK",
    message: "major liquidity injection, 200% volume spike...",
    volume: "$1.5M",
    time: "12m ago",
    sentiment: "bullish"
  }
];

export function WhatToTrade() {
  return (
    <Card className="glass-card border-primary/20 p-2.5 md:p-3 h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs md:text-sm font-bold text-primary flex items-center gap-1.5">
          <TrendingUp size={14} className="md:w-4 md:h-4" />
          WHAT TO TRADE
        </h3>
      </div>

      <div className="space-y-1.5 flex-1 overflow-y-auto -mr-1.5 pr-1.5">
        {tradeSignals.slice(0, 4).map((signal, index) => (
          <motion.div
            key={signal.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="glass-card p-2 rounded-lg border border-primary/10 hover:border-primary/30 transition-all cursor-pointer group"
          >
            <div className="flex items-start justify-between gap-1.5">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] md:text-xs font-bold text-primary">{signal.token}</span>
                  {signal.sentiment === "bullish" && (
                    <Badge variant="outline" className="text-success border-success/30 text-[8px] px-1 py-0 h-4">
                      <TrendingUp size={8} className="mr-0.5" />
                      Bullish
                    </Badge>
                  )}
                </div>
                <p className="text-[9px] md:text-[10px] text-muted-foreground line-clamp-1 group-hover:text-foreground transition-colors">
                  {signal.message}
                </p>
              </div>
              <div className="flex flex-col items-end gap-0.5 shrink-0">
                <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                  <DollarSign size={8} />
                  <span>{signal.volume}</span>
                </div>
                <div className="flex items-center gap-0.5 text-[9px] text-muted-foreground">
                  <Clock size={8} />
                  <span>{signal.time}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-2 flex gap-1.5">
        <button className="flex-1 glass-card px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-medium text-primary hover:bg-primary/10 transition-all border border-primary/20">
          Check Token Lore
        </button>
        <button className="flex-1 glass-card px-2 py-1 rounded-lg text-[9px] md:text-[10px] font-medium text-primary hover:bg-primary/10 transition-all border border-primary/20">
          Whale Radar
        </button>
      </div>
    </Card>
  );
}
