import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Lock, Maximize2 } from "lucide-react";
import { useState } from "react";

interface AdvancedPerformanceChartProps {
  isWalletConnected?: boolean;
}

const tradeData = [
  { time: '00:00', pnl: 0, volume: 1200, trades: 0 },
  { time: '04:00', pnl: -150, volume: 800, trades: 3, token: 'BTC' },
  { time: '08:00', pnl: 200, volume: 2100, trades: 5, token: 'PEPE' },
  { time: '12:00', pnl: 343, volume: 1800, trades: 7, token: 'ETH' },
  { time: '16:00', pnl: 280, volume: 1500, trades: 4, token: 'SOL' },
  { time: '20:00', pnl: 343, volume: 1900, trades: 6, token: 'SPEPE' },
];

// Professional Flat Dot (No Glow)
const CustomDot = (props: any) => {
  const { cx, cy, payload, onHover } = props;
  if (!payload || payload.trades === 0) return null;

  // Solid professional colors
  const isLoss = payload.pnl < 0;
  const strokeColor = isLoss ? '#EF4444' : '#10B981'; // Red-500 or Emerald-500
  const fillColor = '#0F172A'; // Dark background color to create a "cutout" look

  return (
    <g>
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={2}
        className="transition-all duration-300 ease-out hover:r-6 cursor-pointer"
        onMouseEnter={() => onHover?.(payload)}
        onMouseLeave={() => onHover?.(null)}
      />
    </g>
  );
};

// Clean Professional Tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;
  const data = payload[0].payload;
  
  return (
    <div className="bg-slate-950 border border-blue-900/30 rounded-md p-3 shadow-xl min-w-[160px]">
      <div className="flex justify-between items-center mb-2 pb-2 border-b border-blue-900/30">
        <span className="text-xs text-slate-400 font-mono">{data.time}</span>
        <span className={`text-xs font-bold font-mono ${data.pnl >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
          {data.pnl >= 0 ? '+' : ''}{data.pnl} USDT
        </span>
      </div>
      <div className="space-y-1">
        <div className="flex justify-between text-[10px] uppercase tracking-wider">
          <span className="text-slate-500">Token</span>
          <span className="text-slate-200 font-medium">{data.token || '-'}</span>
        </div>
        <div className="flex justify-between text-[10px] uppercase tracking-wider">
          <span className="text-slate-500">Volume</span>
          <span className="text-slate-200 font-medium">{data.volume}</span>
        </div>
      </div>
    </div>
  );
};

export function AdvancedPerformanceChart({ isWalletConnected = false }: AdvancedPerformanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [, setHoveredPoint] = useState<any>(null);

  if (!isWalletConnected) {
    return (
      <Card className="h-full bg-background/50 border-blue-900/20 backdrop-blur-sm flex items-center justify-center p-6 relative overflow-hidden">
         {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(30,58,138,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(30,58,138,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
        
        <div className="z-10 flex flex-col items-center text-center max-w-[200px]">
          <div className="w-16 h-16 rounded-2xl bg-blue-950/50 border border-blue-900/30 flex items-center justify-center mb-4 shadow-inner">
            <Lock className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-widest">Analytics Locked</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">Connect wallet to decrypt performance data.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full bg-background border-border/40 flex flex-col shadow-sm">
      {/* Header */}
      <div className="px-4 py-3 border-b border-border/40 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-1 bg-blue-600 rounded-full" />
          <h3 className="text-sm font-semibold tracking-wide text-foreground">PNL ANALYTICS</h3>
        </div>
        
        <div className="flex gap-1 bg-secondary/30 p-0.5 rounded-lg border border-border/50">
          {['1D', '1W', '1M'].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-3 py-1 text-[10px] font-medium rounded-md transition-all ${
                selectedPeriod === period
                  ? 'bg-blue-900 text-white shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="px-4 py-3 flex items-center justify-between bg-secondary/10">
        <div>
          <span className="text-[10px] uppercase text-muted-foreground font-semibold tracking-wider">Current PNL</span>
          <div className="text-xl font-mono font-bold text-emerald-500 flex items-baseline gap-2">
            +343.50 <span className="text-xs text-muted-foreground font-sans">USDT</span>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
          <TrendingUp className="w-3 h-3 text-emerald-500" />
          <span className="text-xs font-bold text-emerald-500">+12.5%</span>
        </div>
      </div>

      {/* Chart */}
      <div className="flex-1 w-full min-h-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={tradeData} margin={{ top: 20, right: 0, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPnl" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15}/>
                <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1e293b" opacity={0.5} />
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              orientation="right" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
            />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 1 }} />
            <Area 
              type="monotone" 
              dataKey="pnl" 
              stroke="#10B981" 
              strokeWidth={2} 
              fillOpacity={1} 
              fill="url(#colorPnl)" 
              dot={(props) => <CustomDot {...props} onHover={setHoveredPoint} />}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#10B981' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}