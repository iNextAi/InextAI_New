import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, BarChart3, LineChart, Settings, RefreshCw } from 'lucide-react';

interface ProfessionalChartProps {
  symbol: string;
  className?: string;
}

interface CryptoPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  high24h: number;
  low24h: number;
}

interface CandleData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export const ProfessionalChart = ({ symbol, className }: ProfessionalChartProps) => {
  const [currentPrice, setCurrentPrice] = useState<CryptoPrice>({
    symbol: symbol,
    price: 0,
    change24h: 0,
    volume24h: 0,
    high24h: 0,
    low24h: 0
  });
  
  const [selectedTimeframe, setSelectedTimeframe] = useState('1h');
  const [chartType, setChartType] = useState<'candlestick' | 'line'>('candlestick');
  const [isLoading, setIsLoading] = useState(true);
  const [candleData, setCandleData] = useState<CandleData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const timeframes = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' },
    { label: '1d', value: '1d' },
    { label: '1w', value: '1w' }
  ];

  const getBinanceInterval = (timeframe: string) => {
    const intervalMap: { [key: string]: string } = {
      '1m': '1m',
      '5m': '5m',
      '15m': '15m',
      '1h': '1h',
      '4h': '4h',
      '1d': '1d',
      '1w': '1w'
    };
    return intervalMap[timeframe] || '1h';
  };

  const fetchCryptoData = async (symbol: string) => {
    const binanceSymbol = `${symbol}USDT`.toUpperCase();
    
    try {
      setIsLoading(true);
      setError(null);

      console.log(`🔄 Fetching Binance data for: ${binanceSymbol}`);

      const [tickerResponse, klinesResponse] = await Promise.all([
        fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${binanceSymbol}`),
        fetch(`https://api.binance.com/api/v3/klines?symbol=${binanceSymbol}&interval=${getBinanceInterval(selectedTimeframe)}&limit=100`)
      ]);

      if (!tickerResponse.ok || !klinesResponse.ok) {
        throw new Error('Failed to fetch data from Binance');
      }

      const tickerData = await tickerResponse.json();
      const klinesData = await klinesResponse.json();

      console.log(`✅ Binance data received for ${binanceSymbol}`, tickerData);

      setCurrentPrice({
        symbol: symbol.toUpperCase(),
        price: parseFloat(tickerData.lastPrice),
        change24h: parseFloat(tickerData.priceChangePercent),
        volume24h: parseFloat(tickerData.volume),
        high24h: parseFloat(tickerData.highPrice),
        low24h: parseFloat(tickerData.lowPrice)
      });

      const newCandleData: CandleData[] = klinesData.map((kline: any[]) => ({
        time: kline[0],
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
        volume: parseFloat(kline[5])
      }));

      setCandleData(newCandleData);
      setIsLoading(false);

    } catch (error) {
      console.error('❌ Error fetching Binance data:', error);
      setError('Failed to fetch live data. Using simulated data.');
      setIsLoading(false);
      
      generateRealisticMockData(symbol);
    }
  };

  const generateRealisticMockData = (symbol: string) => {
    const basePrices: { [key: string]: number } = {
      'BTC': 67000,
      'ETH': 3500,
      'SOL': 120,
      'BNB': 600,
      'ADA': 0.45,
      'DOT': 6.5,
      'XRP': 0.52
    };

    const basePrice = basePrices[symbol] || 100;
    const newCandleData: CandleData[] = [];
    
    let currentTime = Date.now() - (100 * 3600000); 
    let currentPriceValue = basePrice;

    for (let i = 0; i < 100; i++) {
      const time = currentTime + i * 3600000;
      
      const volatility = symbol === 'BTC' ? 0.02 : symbol === 'ETH' ? 0.03 : 0.05;
      const change = (Math.random() - 0.5) * basePrice * volatility;
      const open = currentPriceValue;
      const close = currentPriceValue + change;
      const high = Math.max(open, close) + Math.random() * basePrice * volatility * 0.3;
      const low = Math.min(open, close) - Math.random() * basePrice * volatility * 0.3;
      
      newCandleData.push({
        time,
        open,
        high,
        low,
        close,
        volume: Math.random() * 1000000 + 500000
      });

      currentPriceValue = close;
    }

    const finalPrice = newCandleData[newCandleData.length - 1].close;
    const priceChange = ((finalPrice - basePrice) / basePrice) * 100;

    setCurrentPrice({
      symbol: symbol,
      price: finalPrice,
      change24h: priceChange,
      volume24h: 750000,
      high24h: finalPrice * 1.08,
      low24h: finalPrice * 0.92
    });

    setCandleData(newCandleData);
  };

  useEffect(() => {
    fetchCryptoData(symbol);
  }, [symbol, selectedTimeframe]);

  // Auto-refresh data
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isLoading) {
        fetchCryptoData(symbol);
      }
    }, 30000); 

    return () => clearInterval(interval);
  }, [symbol, isLoading]);

  const isPositive = currentPrice.change24h > 0;

  // Draw candlestick chart using SVG
  const drawChart = () => {
    if (candleData.length === 0) {
      return (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          No chart data available
        </div>
      );
    }

    const width = 800;
    const height = 400;
    const padding = { top: 20, right: 60, bottom: 40, left: 60 };
    const chartWidth = width - padding.left - padding.right;
    const chartHeight = height - padding.top - padding.bottom;

    const maxPrice = Math.max(...candleData.map(d => d.high));
    const minPrice = Math.min(...candleData.map(d => d.low));
    const priceRange = maxPrice - minPrice || 1; 

    const candleWidth = Math.max(2, chartWidth / candleData.length - 1);
    
    const candles = candleData.map((candle, index) => {
      const x = padding.left + (index * chartWidth) / candleData.length;
      const openY = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight;
      const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight;
      const highY = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight;
      const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight;

      const isGreen = candle.close > candle.open;
      const bodyTop = Math.min(openY, closeY);
      const bodyHeight = Math.max(1, Math.abs(closeY - openY));

      return (
        <g key={index}>
          {/* Wick */}
          <line
            x1={x + candleWidth / 2}
            y1={highY}
            x2={x + candleWidth / 2}
            y2={lowY}
            stroke={isGreen ? '#22c55e' : '#ef4444'}
            strokeWidth="1"
          />

          <rect
            x={x}
            y={bodyTop}
            width={candleWidth}
            height={bodyHeight}
            fill={isGreen ? '#22c55e' : '#ef4444'}
            stroke={isGreen ? '#22c55e' : '#ef4444'}
            strokeWidth="1"
          />
        </g>
      );
    });

    return (
      <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
        {[...Array(6)].map((_, i) => (
          <line
            key={`h-${i}`}
            x1={padding.left}
            y1={padding.top + (i * chartHeight) / 5}
            x2={width - padding.right}
            y2={padding.top + (i * chartHeight) / 5}
            stroke="hsl(var(--border))"
            strokeOpacity="0.3"
            strokeWidth="0.5"
          />
        ))}
        
        {[...Array(6)].map((_, i) => {
          const price = maxPrice - (i * priceRange) / 5;
          return (
            <text
              key={`price-${i}`}
              x={width - padding.right + 5}
              y={padding.top + (i * chartHeight) / 5 + 4}
              className="fill-muted-foreground text-xs font-mono"
            >
              ${price.toFixed(price > 100 ? 0 : 2)}
            </text>
          );
        })}

        {candles}
      </svg>
    );
  };

  return (
    <Card className={`bg-card/95 backdrop-blur-sm border-border/50 ${className}`}>
      <div className="p-4 border-b border-border/50">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{currentPrice.symbol}/USDT</h2>
              <Badge variant="outline" className="text-xs">Spot</Badge>
              {error && (
                <Badge variant="outline" className="text-xs bg-yellow-500/20 text-yellow-600">
                  Simulated
                </Badge>
              )}
            </div>
            
            <div className="flex items-center gap-4">
              {isLoading ? (
                <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
              ) : (
                <div className="text-2xl font-mono font-bold text-foreground">
                  ${currentPrice.price.toLocaleString(undefined, { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: currentPrice.price < 1 ? 4 : 2 
                  })}
                </div>
              )}
              
              {!isLoading && (
                <div className={`flex items-center gap-1 px-2 py-1 rounded text-sm font-medium ${
                  isPositive ? 'bg-success/20 text-success' : 'bg-destructive/20 text-destructive'
                }`}>
                  {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                  {isPositive ? '+' : ''}{currentPrice.change24h.toFixed(2)}%
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'candlestick' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('candlestick')}
            >
              <BarChart3 className="h-4 w-4 mr-1" />
              Candles
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
            >
              <LineChart className="h-4 w-4 mr-1" />
              Line
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => fetchCryptoData(symbol)}
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4 text-sm">
          <div>
            <span className="text-muted-foreground">24h High</span>
            <div className="font-mono font-medium">
              ${currentPrice.high24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">24h Low</span>
            <div className="font-mono font-medium">
              ${currentPrice.low24h.toLocaleString(undefined, { maximumFractionDigits: 2 })}
            </div>
          </div>
          <div>
            <span className="text-muted-foreground">24h Volume</span>
            <div className="font-mono font-medium">
              {(currentPrice.volume24h / 1000000).toFixed(2)}M
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full animate-pulse ${
              error ? 'bg-yellow-500' : 'bg-success'
            }`} />
            <span className={`font-medium ${error ? 'text-yellow-600' : 'text-success'}`}>
              {error ? 'Simulated' : 'Live'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mt-4">
          {timeframes.map((tf) => (
            <Button
              key={tf.value}
              variant={selectedTimeframe === tf.value ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setSelectedTimeframe(tf.value)}
              className="px-3 py-1 h-8 text-xs font-medium"
              disabled={isLoading}
            >
              {tf.label}
            </Button>
          ))}
        </div>
      </div>

      <div className="relative h-[500px] p-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm z-10">
            <div className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm text-muted-foreground">Loading market data...</span>
            </div>
          </div>
        )}
        
        {error && !isLoading && (
          <div className="absolute top-4 right-4 z-10">
            <Badge variant="outline" className="bg-yellow-500/20 text-yellow-600 text-xs">
              {error}
            </Badge>
          </div>
        )}
        
        <div className="w-full h-full rounded-lg border border-border/30 bg-gradient-to-br from-card/80 to-background/60 backdrop-blur-sm p-4">
          {drawChart()}
        </div>
      </div>
    </Card>
  );
};