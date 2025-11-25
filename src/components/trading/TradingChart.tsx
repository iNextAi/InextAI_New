import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react";
import { RealtimeCandlestickChart } from "@/components/trading/RealtimeCandlestickChart";
import axios from "axios";

interface TradingChartProps {
  asset: string; // e.g. "BTC", "ETH", "ICP"
  mode: string;
}

export const TradingChart = ({ asset, mode }: TradingChartProps) => {
  const [price, setPrice] = useState<number | null>(null);
  const [priceChange, setPriceChange] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const symbol = `${asset}USDT`.toUpperCase(); // e.g. ICPUSDT
      setLoading(true);
      
      console.log(`🔄 Fetching data for: ${symbol}`);
      
      try {
        const response = await axios.get(
          `https://api.binance.com/api/v3/ticker/24hr?symbol=${symbol}`
        );
        
        console.log(`✅ Binance API Response for ${symbol}:`, response.data);
        
        if (response.data && response.data.lastPrice) {
          setPrice(parseFloat(response.data.lastPrice));
          setPriceChange(parseFloat(response.data.priceChangePercent));
          setError(null);
        } else {
          throw new Error('Invalid response data');
        }
      } catch (err: any) {
        console.error(`❌ Failed to fetch price for ${symbol}`, err);
        
        if (err.response?.data) {
          setError(`API Error: ${err.response.data.msg || 'Unknown error'}`);
          console.error('Binance API Error Details:', err.response.data);
        } else if (err.code === 'NETWORK_ERROR') {
          setError('Network error - check your connection');
        } else {
          setError('Failed to fetch price data');
        }
        
        // Set mock data for development
        setPrice(45000 + Math.random() * 1000);
        setPriceChange((Math.random() - 0.5) * 10);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000); // every 10 sec

    return () => clearInterval(interval);
  }, [asset]);

  const isPositive = (priceChange ?? 0) >= 0;

  const commonSymbols = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOTUSDT', 'SOLUSDT'];
  const currentSymbol = `${asset}USDT`.toUpperCase();
  const isValidSymbol = commonSymbols.includes(currentSymbol);

  return (
    <Card className="glass-card h-full min-h-[400px] lg:min-h-[500px] p-6">
      <div className="flex flex-col h-full">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold text-foreground">{asset}/USDT</h3>
                {!isValidSymbol && (
                  <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                    Uncommon Symbol
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-1">
                {loading ? (
                  <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground" />
                ) : (
                  <span className="text-3xl font-mono font-bold text-foreground">
                    {error
                      ? "Unavailable"
                      : price !== null
                      ? `$${price.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 6,
                        })}`
                      : "Loading..."}
                  </span>
                )}
                
                {priceChange !== null && !error && !loading && (
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-md ${
                      isPositive ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"
                    }`}
                  >
                    {isPositive ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                    <span className="text-sm font-medium">
                      {isPositive ? "+" : ""}
                      {priceChange.toFixed(2)}%
                    </span>
                  </div>
                )}
              </div>
              
              {error && (
                <div className="mt-2 text-sm text-destructive">
                  {error} (Using mock data)
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              {mode.charAt(0).toUpperCase() + mode.slice(1)} Mode
            </Badge>
            <Badge variant="outline" className="border-border/50">
              {error ? 'Mock Data' : 'Live Data'}
            </Badge>
          </div>
        </div>

        {/* Chart Area */}
        <div className="flex-1 relative">
          <RealtimeCandlestickChart symbol={`${asset}USDT`} interval="5m" />
        </div>

        {/* Footer Controls */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Timeframe:</span>
            {["1m", "5m", "15m", "1h", "4h", "1d"].map((tf) => (
              <button
                key={tf}
                className="px-3 py-1 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {tf}
              </button>
            ))}
          </div>
          <div className="text-sm text-muted-foreground">
            Volume: {(Math.random() * 1000000).toFixed(0)} {asset}
          </div>
        </div>
      </div>
    </Card>
  );
};