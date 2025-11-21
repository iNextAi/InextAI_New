import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Lock } from "lucide-react";
import { useState } from "react";

interface AdvancedPerformanceChartProps {
  isWalletConnected?: boolean;
}

const tradeData = [
  { 
    time: '00:00', 
    pnl: 0, 
    emotional: 50, 
    volume: 1200,
    timestamp: '08:00-08:15',
    trades: 0,
    token: '-',
    emotion: 'Neutral',
    emotionScore: 50
  },
  { 
    time: '04:00', 
    pnl: -150, 
    emotional: 35, 
    volume: 800,
    timestamp: '04:00-04:15',
    trades: 3,
    token: 'BTC',
    emotion: 'Fear',
    emotionScore: 35
  },
  { 
    time: '08:00', 
    pnl: 200, 
    emotional: 75, 
    volume: 2100,
    timestamp: '08:00-08:15',
    trades: 5,
    token: '$PEPE',
    emotion: 'FOMO',
    emotionScore: 76
  },
  { 
    time: '12:00', 
    pnl: 343, 
    emotional: 65, 
    volume: 1800,
    timestamp: '12:00-12:15',
    trades: 7,
    token: 'ETH',
    emotion: 'Confident',
    emotionScore: 65
  },
  { 
    time: '16:00', 
    pnl: 280, 
    emotional: 45, 
    volume: 1500,
    timestamp: '16:00-16:15',
    trades: 4,
    token: 'SOL',
    emotion: 'Anxious',
    emotionScore: 45
  },
  { 
    time: '20:00', 
    pnl: 343, 
    emotional: 60, 
    volume: 1900,
    timestamp: '20:00-20:15',
    trades: 6,
    token: '$SPEPE',
    emotion: 'Neutral',
    emotionScore: 60
  },
];

// Custom dot component for trade markers
const CustomDot = (props: any) => {
  const { cx, cy, payload, onHover } = props;
  
  if (!payload || payload.trades === 0) return null;
  
  // Enhanced color coding based on PNL
  let fill = 'hsl(142 76% 50%)'; // success (bright green)
  let glow = '0 0 20px hsl(142 76% 50% / 0.8), 0 0 40px hsl(142 76% 50% / 0.4)';
  let innerFill = 'hsl(142 100% 90%)';
  
  if (payload.pnl < 0) {
    // Losses - RED with strong glow
    fill = 'hsl(0 84% 60%)'; // bright red
    glow = '0 0 20px hsl(0 84% 60% / 0.8), 0 0 40px hsl(0 84% 60% / 0.4)';
    innerFill = 'hsl(0 100% 95%)';
  } else if (payload.pnl < 150) {
    // Small gains - YELLOW/AMBER with moderate glow
    fill = 'hsl(45 100% 60%)'; // bright yellow
    glow = '0 0 20px hsl(45 100% 60% / 0.8), 0 0 40px hsl(45 100% 60% / 0.4)';
    innerFill = 'hsl(45 100% 95%)';
  }
  
  return (
    <g>
      {/* Outer glow ring */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={7} 
        fill={fill}
        opacity={0.15}
        style={{ 
          filter: `blur(3px)`,
          cursor: 'pointer'
        }}
      />
      {/* Main dot */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={5} 
        fill={fill}
        stroke="hsl(var(--background))"
        strokeWidth={2}
        style={{ 
          filter: `drop-shadow(${glow})`,
          cursor: 'pointer'
        }}
        onMouseEnter={() => onHover?.(payload)}
        onMouseLeave={() => onHover?.(null)}
      />
      {/* Inner highlight */}
      <circle 
        cx={cx} 
        cy={cy} 
        r={2.5} 
        fill={innerFill}
        opacity={0.9}
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => onHover?.(payload)}
        onMouseLeave={() => onHover?.(null)}
      />
    </g>
  );
};

// Custom tooltip component
const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload || !payload[0]) return null;
  
  const data = payload[0].payload;
  if (data.trades === 0) return null;
  
  const isPositive = data.pnl >= 0;
  
  return (
    <div className="glass-card-elevated border border-primary/30 rounded-lg p-2 min-w-[150px]">
      <div className="space-y-0.5 text-[10px]">
        <div className="flex justify-between items-center pb-1 border-b border-primary/20">
          <span className="text-muted-foreground">TimeStamp:</span>
          <span className="text-primary font-medium">{data.timestamp}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Trades:</span>
          <span className="text-foreground font-semibold">{data.trades}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Token:</span>
          <span className="text-primary font-semibold">{data.token}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Emotion:</span>
          <span className="text-accent font-semibold">{data.emotion}</span>
        </div>
        <div className="flex justify-between items-center pt-1 border-t border-primary/20">
          <span className="text-muted-foreground">PnL:</span>
          <span className={`font-bold ${isPositive ? 'text-success' : 'text-destructive'}`}>
            {isPositive ? '+' : ''}{data.pnl < 0 ? data.pnl : `$${data.pnl}`}
          </span>
        </div>
      </div>
    </div>
  );
};

export function AdvancedPerformanceChart({ isWalletConnected = false }: AdvancedPerformanceChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('1D');
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  if (!isWalletConnected) {
    return (
      <Card className="glass-card border-primary/20 p-2 md:p-2.5 h-full flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Lock className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground mb-1">PERFORMANCE ANALYSIS</h3>
            <p className="text-xs text-muted-foreground">Connect your wallet to view performance data</p>
          </div>
        </div>
      </Card>
    );
  }
  
  const currentPnL = 343.50;
  const dailyChange = 12.5;
  const isPositive = currentPnL > 0;

  const periods = [
    { label: '1 D', value: '1D' },
    { label: '1 W', value: '1W' },
    { label: '1 M', value: '1M' },
  ];

  return (
    <Card className="glass-card border-primary/20 p-1.5 md:p-2 h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5 md:mb-2">
        <div className="flex items-center gap-1.5">
          <div className="w-1 h-1 rounded-full bg-primary glow-primary" />
          <h3 className="text-xs md:text-sm font-bold tracking-wide text-primary">PERFORMANCE ANALYSIS</h3>
        </div>
        <div className="text-right">
          <p className="text-xs md:text-sm font-bold text-success glow-success">
            {isPositive ? '+' : ''}{currentPnL} USDT
          </p>
          <div className="flex items-center justify-end gap-0.5 text-[9px]">
            {isPositive ? (
              <TrendingUp className="w-2 h-2 text-success" />
            ) : (
              <TrendingDown className="w-2 h-2 text-destructive" />
            )}
            <span className={isPositive ? 'text-success' : 'text-destructive'}>
              {dailyChange}% today
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="mb-1.5">
          <div className="flex items-center justify-between mb-1">
            <h4 className="text-[9px] md:text-[10px] font-medium text-foreground">PNL Over Time</h4>
            <div className="flex gap-1">
              {periods.map((period) => (
                <Button
                  key={period.value}
                  onClick={() => setSelectedPeriod(period.value)}
                  variant="ghost"
                  size="sm"
                  className={`text-[9px] md:text-[10px] px-1.5 py-0.5 h-5 rounded-lg transition-all ${
                    selectedPeriod === period.value
                      ? 'gradient-primary text-white glow-primary'
                      : 'glass-card border border-primary/20 text-muted-foreground hover:text-primary hover:border-primary/40'
                  }`}
                >
                  {period.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chart */}
        <div className="flex-1 min-h-0 overflow-auto">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={tradeData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="pnlGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(210 100% 60%)" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(210 100% 60%)" stopOpacity={0.02}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="hsl(var(--primary))" 
                opacity={0.08}
                vertical={false}
              />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
                tick={{ fontSize: 7, fill: 'hsl(var(--muted-foreground))' }}
                dy={6}
              />
              <YAxis 
                axisLine={false}
                tickLine={false}
                className="text-muted-foreground"
                tick={{ fontSize: 7, fill: 'hsl(var(--muted-foreground))' }}
                dx={-4}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'hsl(var(--primary))', strokeWidth: 1, strokeDasharray: '5 5' }}
              />
              <Area 
                type="monotone" 
                dataKey="pnl" 
                stroke="hsl(210 100% 60%)" 
                strokeWidth={1.5}
                fill="url(#pnlGradient)" 
                dot={(props) => <CustomDot {...props} onHover={setHoveredPoint} />}
                activeDot={{ r: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
