import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  TrendingUp, 
  Activity, 
  BarChart3,
  ChevronDown,
  Star,
  ChevronUp,
  MessageSquare,
  DollarSign,
  Target,
  Filter,
  Columns,
  TrendingDown
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { DashboardLayout } from "@/components/dashboard/DashboardLayout";

const MarketPage = () => {
  const [activeTab, setActiveTab] = useState("top");
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState<string[]>(["ethereum", "solana"]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  // MarketStatsCards data
  const mockChartData = [
    { value: 3.1 }, { value: 3.15 }, { value: 3.12 }, { value: 3.18 }, 
    { value: 3.22 }, { value: 3.2 }, { value: 3.25 }, { value: 3.22 }
  ];

  const stats = [
    {
      title: "Market Cap",
      value: "$3.22T",
      change: "-0.64%",
      isNegative: true,
    },
    {
      title: "CMC20",
      value: "$200.23",
      change: "0.84%",
      isNegative: false,
    },
    {
      title: "Fear & Greed",
      value: "17",
      subtitle: "Extreme fear",
      isGauge: true,
    },
    {
      title: "Altcoin Season",
      value: "31/100",
      subtitle: "Bitcoin",
      isProgress: true,
    },
    {
      title: "Average Crypto RSI",
      value: "44.08",
      subtitle: "Oversold",
      isProgress: true,
    },
  ];

  // TrendingNarratives data
  const narratives = [
    {
      icon: MessageSquare,
      text: "Why is the market down today?",
    },
    {
      icon: TrendingUp,
      text: "Are altcoins outperforming Bitcoin?",
    },
    {
      icon: DollarSign,
      text: "What are the trending narratives?",
    },
    {
      icon: Target,
      text: "What cryptos are showing bullish momentum?",
    },
    {
      icon: MessageSquare,
      text: "What upcoming events may impact crypto?",
    },
  ];

  // NetworkFilters data
  const networks = [
    { name: "All Networks", active: true },
    { name: "BSC" },
    { name: "Solana" },
    { name: "Base" },
    { name: "Ethereum" },
    { name: "More" },
  ];

  // CryptoTable data - ALL ORIGINAL ASSETS FROM LOVABLE
  const generateSparklineData = () => {
    return Array.from({ length: 20 }, () => ({
      value: Math.random() * 100 + 50
    }));
  };

  const cryptoData = [
    {
      id: "bitcoin",
      rank: 1,
      name: "Bitcoin",
      symbol: "BTC",
      icon: "₿",
      price: "$94,370.15",
      change1h: "-1.06%",
      change24h: "-1.08%",
      change7d: "-11.25%",
      marketCap: "$1,882,572,485,021",
      volume: "$75,845,720,359",
      supply: "19.94M BTC",
      chartData: generateSparklineData(),
    },
    {
      id: "ethereum",
      rank: 2,
      name: "Ethereum",
      symbol: "ETH",
      icon: "Ξ",
      price: "$3,146.18",
      change1h: "-1.36%",
      change24h: "-0.47%",
      change7d: "-12.79%",
      marketCap: "$379,732,291,007",
      volume: "$33,978,158,850",
      supply: "120.69M ETH",
      chartData: generateSparklineData(),
    },
    {
      id: "tether",
      rank: 3,
      name: "Tether",
      symbol: "USDT",
      icon: "₮",
      price: "$0.9995",
      change1h: "+0.02%",
      change24h: "-0.00%",
      change7d: "-0.03%",
      marketCap: "$183,950,631,598",
      volume: "$131,362,268,704",
      supply: "184.04B USDT",
      chartData: generateSparklineData(),
    },
    {
      id: "xrp",
      rank: 4,
      name: "XRP",
      symbol: "XRP",
      icon: "✕",
      price: "$2.24",
      change1h: "-0.90%",
      change24h: "+0.65%",
      change7d: "-12.44%",
      marketCap: "$134,909,325,612",
      volume: "$4,357,166,307",
      supply: "60.17B XRP",
      chartData: generateSparklineData(),
    },
    {
      id: "bnb",
      rank: 5,
      name: "BNB",
      symbol: "BNB",
      icon: "◆",
      price: "$922.55",
      change1h: "-0.95%",
      change24h: "-0.97%",
      change7d: "-7.76%",
      marketCap: "$127,069,736,948",
      volume: "$2,900,665,077",
      supply: "137.73M BNB",
      chartData: generateSparklineData(),
    },
    {
      id: "solana",
      rank: 6,
      name: "Solana",
      symbol: "SOL",
      icon: "◆",
      price: "$78.36",
      change1h: "-0.85%",
      change24h: "-1.23%",
      change7d: "-7.76%",
      marketCap: "$42,069,736,948",
      volume: "$1,800,665,077",
      supply: "137.73M SOL",
      chartData: generateSparklineData(),
    },
    {
      id: "cardano",
      rank: 7,
      name: "Cardano",
      symbol: "ADA",
      icon: "✕",
      price: "$0.4902",
      change1h: "-0.90%",
      change24h: "+3.12%",
      change7d: "-12.44%",
      marketCap: "$17,209,325,612",
      volume: "$340,166,307",
      supply: "60.17B ADA",
      chartData: generateSparklineData(),
    },
    {
      id: "polygon",
      rank: 8,
      name: "Polygon",
      symbol: "MATIC",
      icon: "◇",
      price: "$0.1525",
      change1h: "-1.20%",
      change24h: "-2.87%",
      change7d: "-8.50%",
      marketCap: "$7,809,325,612",
      volume: "$290,166,307",
      supply: "51.17B MATIC",
      chartData: generateSparklineData(),
    },
    {
      id: "chainlink",
      rank: 9,
      name: "Chainlink",
      symbol: "LINK",
      icon: "⛓",
      price: "$14.67",
      change1h: "+0.56%",
      change24h: "+4.56%",
      change7d: "+2.34%",
      marketCap: "$8,209,325,612",
      volume: "$580,166,307",
      supply: "560M LINK",
      chartData: generateSparklineData(),
    }
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Your Original Header with Search */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="text-primary" size={20} />
            <h1 className="text-xl font-semibold text-foreground">Market</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search assets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Loveable Navigation Tabs - Now as second navbar */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto border-b pb-2">
          <Button 
            variant={activeTab === "top" ? "default" : "ghost"} 
            onClick={() => setActiveTab("top")}
            className="whitespace-nowrap"
          >
            Top
          </Button>
          <Button 
            variant={activeTab === "trending" ? "default" : "ghost"} 
            onClick={() => setActiveTab("trending")}
            className="whitespace-nowrap"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Trending
          </Button>
          <Button variant="ghost" className="whitespace-nowrap">Most Visited</Button>
          <Button variant="ghost" className="whitespace-nowrap">New</Button>
          <Button variant="ghost" className="whitespace-nowrap">Gainers</Button>
          <Button variant="ghost" className="whitespace-nowrap">Real-World Assets</Button>
          <Button variant="ghost" className="whitespace-nowrap">
            More <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </div>

        {/* Market Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 bg-card hover:bg-accent/50 transition-colors">
              <div className="text-sm text-muted-foreground mb-1">{stat.title}</div>
              <div className="flex items-baseline justify-between mb-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                {stat.change && (
                  <div className={`flex items-center text-sm ${stat.isNegative ? 'text-destructive' : 'text-success'}`}>
                    {stat.isNegative ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                    {stat.change}
                  </div>
                )}
              </div>
              {stat.subtitle && (
                <div className="text-xs text-muted-foreground">{stat.subtitle}</div>
              )}
              {!stat.isGauge && !stat.isProgress && (
                <ResponsiveContainer width="100%" height={40}>
                  <LineChart data={mockChartData}>
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke={stat.isNegative ? "hsl(var(--destructive))" : "hsl(var(--success))"} 
                      strokeWidth={2} 
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </Card>
          ))}
        </div>

        {/* Trending Narratives */}
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          {narratives.map((narrative, index) => (
            <Button 
              key={index}
              variant="outline" 
              className="whitespace-nowrap bg-primary/5 border-primary/20 hover:bg-primary/10"
            >
              <narrative.icon className="h-4 w-4 mr-2 text-primary" />
              {narrative.text}
            </Button>
          ))}
        </div>

        {/* Network Filters */}
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            {networks.map((network, index) => (
              <Button 
                key={index}
                variant={network.active ? "default" : "outline"}
                size="sm"
                className="whitespace-nowrap"
              >
                {network.name === "All Networks" && "🌐 "}
                {network.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2 max-md:overflow-x-auto">
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Market Cap
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Volume(24h)
              <ChevronDown className="h-4 w-4 ml-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm">
              <Columns className="h-4 w-4 mr-2" />
              Columns
            </Button>
          </div>
        </div>

        {/* Main Crypto Table - With ALL original assets */}
        <div className="rounded-lg border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="hover:bg-transparent">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">1h %</TableHead>
                <TableHead className="text-right">24h %</TableHead>
                <TableHead className="text-right">7d %</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">Volume(24h)</TableHead>
                <TableHead className="text-right">Circulating Supply</TableHead>
                <TableHead className="text-right w-32">Last 7 Days</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cryptoData.map((crypto) => (
                <TableRow key={crypto.rank} className="hover:bg-muted/50">
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => toggleFavorite(crypto.id)}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Star className={`h-4 w-4 ${
                          favorites.includes(crypto.id) 
                            ? 'fill-primary text-primary' 
                            : 'text-muted-foreground'
                        }`} />
                      </button>
                      <span className="font-medium">{crypto.rank}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary">
                        {crypto.icon}
                      </div>
                      <div>
                        <div className="font-semibold">{crypto.name}</div>
                        <div className="text-sm text-muted-foreground">{crypto.symbol}</div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-2 h-6 text-xs">
                        Buy
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">{crypto.price}</TableCell>
                  <TableCell className={`text-right ${crypto.change1h.startsWith('-') ? 'text-destructive' : 'text-success'}`}>
                    {crypto.change1h}
                  </TableCell>
                  <TableCell className={`text-right ${crypto.change24h.startsWith('-') ? 'text-destructive' : 'text-success'}`}>
                    {crypto.change24h}
                  </TableCell>
                  <TableCell className={`text-right ${crypto.change7d.startsWith('-') ? 'text-destructive' : 'text-success'}`}>
                    {crypto.change7d}
                  </TableCell>
                  <TableCell className="text-right">{crypto.marketCap}</TableCell>
                  <TableCell className="text-right">
                    <div>{crypto.volume}</div>
                  </TableCell>
                  <TableCell className="text-right text-sm">{crypto.supply}</TableCell>
                  <TableCell>
                    <ResponsiveContainer width="100%" height={50}>
                      <LineChart data={crypto.chartData}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke={crypto.change7d.startsWith('-') ? "hsl(var(--destructive))" : "hsl(var(--success))"} 
                          strokeWidth={1.5} 
                          dot={false}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MarketPage;