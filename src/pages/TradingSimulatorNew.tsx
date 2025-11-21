import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Settings, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ProfessionalChart } from "@/components/trading/ProfessionalChart";
import { OrderBook } from "@/components/trading/OrderBook";
import { TradingPanel } from "@/components/trading/TradingPanel";

const TradingSimulatorNew = () => {
  const navigate = useNavigate();
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  const [currentPrice, setCurrentPrice] = useState(67000);
  const [interval, setInterval] = useState("1m");
  
  const [binanceSymbol, setBinanceSymbol] = useState('BTCUSDT');
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [trades, setTrades] = useState([]);

  const cryptoSymbols = [
    { symbol: 'BTC/USDT', name: 'Bitcoin', price: 67000 },
    { symbol: 'ETH/USDT', name: 'Ethereum', price: 3200 },
    { symbol: 'SOL/USDT', name: 'Solana', price: 120 },
    { symbol: 'ADA/USDT', name: 'Cardano', price: 0.45 },
  ];

  const toBinanceSymbol = (symbol) => symbol.replace("/", "").toUpperCase();
  const formatPrice = (p) => {
    if (typeof p !== "number") return "-";
    if (p > 1000) return p.toLocaleString(undefined, { maximumFractionDigits: 0 });
    if (p > 1) return p.toLocaleString(undefined, { maximumFractionDigits: 2 });
    return p.toLocaleString(undefined, { maximumFractionDigits: 4 });
  };

  useEffect(() => {
    const selectedCrypto = cryptoSymbols.find(c => c.symbol === selectedSymbol);
    if (selectedCrypto) {
      setCurrentPrice(selectedCrypto.price);
      setBinanceSymbol(toBinanceSymbol(selectedSymbol));
    }
  }, [selectedSymbol]);

  const bestBid = orderBook.bids?.[0]?.price || 0;
  const bestAsk = orderBook.asks?.[0]?.price || 0;

  return (
    <div className="h-screen bg-[#0b1426] text-white flex flex-col overflow-hidden">
      {/* Compact Header */}
      <div className="bg-[#1e2532] border-b border-[#2a2e39] px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/")}
              className="hover:bg-[#2a2e39] text-gray-300 h-8 px-3"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Dashboard
            </Button>
            
            <div className="flex items-center gap-3">
              <h1 className="text-lg font-semibold text-white">Trading Simulator</h1>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">
                <Activity className="h-3 w-3 mr-1" />
                Live
              </Badge>
            </div>

            {/* Symbol Selector */}
            <select
              value={selectedSymbol}
              onChange={(e) => setSelectedSymbol(e.target.value)}
              className="bg-[#2a2e39] border border-[#3a3f4b] rounded px-3 py-1 text-white text-sm h-8"
              aria-label="Select cryptocurrency symbol"
            >
              {cryptoSymbols.map((crypto) => (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.symbol}
                </option>
              ))}
            </select>

            {/* Interval Selector */}
            <select 
              value={interval} 
              onChange={(e) => setInterval(e.target.value)}
              className="bg-[#2a2e39] border border-[#3a3f4b] rounded px-3 py-1 text-white text-sm h-8"
              aria-label="Select chart interval"
            >
              <option value="1m">1m</option>
              <option value="5m">5m</option>
              <option value="15m">15m</option>
              <option value="1h">1h</option>
              <option value="4h">4h</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-xl font-mono font-bold text-white">
                {formatPrice(currentPrice)}
              </div>
              <div className="text-xs text-green-400">+2.34%</div>
            </div>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 border border-[#3a3f4b]">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Trading Interface */}
      <div className="flex-1 flex min-h-0 p-2 gap-2">
        
        {/* Left Sidebar - Compact */}
        <div className="w-64 bg-[#1e2532] rounded-lg border border-[#2a2e39] flex flex-col">
          {/* Watchlist */}
          <div className="p-3 border-b border-[#2a2e39]">
            <div className="text-sm font-medium text-gray-300 mb-2">Watchlist</div>
            <div className="space-y-1">
              {cryptoSymbols.map((crypto) => (
                <div
                  key={crypto.symbol}
                  onClick={() => setSelectedSymbol(crypto.symbol)}
                  className={`flex items-center justify-between p-2 rounded cursor-pointer text-sm ${
                    selectedSymbol === crypto.symbol 
                      ? "bg-[#2a2e39] text-white" 
                      : "text-gray-400 hover:bg-[#2a2e39] hover:text-gray-300"
                  }`}
                >
                  <span>{crypto.symbol}</span>
                  <span className="font-mono">
                    {selectedSymbol === crypto.symbol ? formatPrice(currentPrice) : "-"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Order Book */}
          <div className="flex-1 p-3">
            <div className="text-sm font-medium text-gray-300 mb-3">Order Book</div>
            
            {/* Asks */}
            <div className="space-y-1 mb-4">
              <div className="text-xs text-red-400 font-medium mb-1">Asks</div>
              {orderBook.asks?.slice(0, 8).map((ask, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-red-400">{formatPrice(ask.price)}</span>
                  <span className="text-gray-400">{ask.size.toFixed(4)}</span>
                </div>
              ))}
            </div>

            {/* Spread */}
            <div className="text-center text-xs text-gray-500 my-2">
              Spread: {(bestAsk - bestBid).toFixed(2)}
            </div>

            {/* Bids */}
            <div className="space-y-1">
              <div className="text-xs text-green-400 font-medium mb-1">Bids</div>
              {orderBook.bids?.slice(0, 8).map((bid, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className="text-green-400">{formatPrice(bid.price)}</span>
                  <span className="text-gray-400">{bid.size.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Chart Area */}
        <div className="flex-1 bg-[#1e2532] rounded-lg border border-[#2a2e39] flex flex-col min-h-0">
          {/* Chart Header */}
          <div className="flex items-center justify-between p-3 border-b border-[#2a2e39]">
            <div className="flex items-center gap-4">
              <div className="text-sm font-medium text-white">{selectedSymbol}</div>
              <div className="flex gap-1">
                {['1m', '5m', '15m', '1h', '4h', '1D'].map((int) => (
                  <button
                    key={int}
                    onClick={() => setInterval(int.toLowerCase())}
                    className={`px-2 py-1 text-xs rounded ${
                      interval === int.toLowerCase() 
                        ? "bg-[#3a3f4b] text-white" 
                        : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {int}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Indicators</span>
              <span>Drawings</span>
              <span>Templates</span>
            </div>
          </div>

          {/* Chart */}
          <div className="flex-1 min-h-0">
            <ProfessionalChart 
              symbol={selectedSymbol}
              className="h-full"
            />
          </div>
        </div>

        {/* Right Panel - Trading */}
        <div className="w-80 bg-[#1e2532] rounded-lg border border-[#2a2e39] flex flex-col">
          {/* Trading Panel */}
          <div className="flex-1">
            <TradingPanel 
              symbol={selectedSymbol}
              currentPrice={currentPrice}
              className="h-full"
            />
          </div>

          {/* Recent Trades */}
          <div className="p-3 border-t border-[#2a2e39]">
            <div className="text-sm font-medium text-gray-300 mb-2">Recent Trades</div>
            <div className="space-y-1 max-h-32 overflow-auto">
              {trades.slice(0, 6).map((trade, i) => (
                <div key={i} className="flex justify-between text-xs">
                  <span className={trade.side === "buy" ? "text-green-400" : "text-red-400"}>
                    {trade.side}
                  </span>
                  <span className="font-mono text-gray-300">{formatPrice(trade.price)}</span>
                  <span className="text-gray-400">{trade.size.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Compact Footer */}
      <div className="bg-[#1e2532] border-t border-[#2a2e39] px-4 py-2 flex-shrink-0">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Connected</span>
            </div>
            <span>24h Volume: $45.2B</span>
            <span>Active Pairs: 650+</span>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30 text-xs">
              Simulation
            </Badge>
            <span>Real-time data • 0ms latency</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradingSimulatorNew;