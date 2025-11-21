// src/services/api.ts
import axios, { AxiosInstance, AxiosError } from 'axios';

// Base URL for your backend
const BASE_URL = 'http://127.0.0.1:5000';

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
apiClient.interceptors.request.use(
  (config) => {
    // Add auth token if you implement authentication later
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ==================== TYPES ====================
export interface TradeRequest {
  userId: string;
  inToken: string;
  outToken: string;
  amountIn: number;
  amountOut: number;
  volumeUsd: number;
  orderType: string;
  leverage: number;
  price?: number;
  mode?: string;
  slippage_factor?: number;
  latency_ms?: number;
  timestamp?: string;
}

export interface Trade {
  id: string;
  user_id: string;
  wallet: string;
  in_token: string;
  out_token: string;
  amount_in: number;
  amount_out: number;
  volume_usd: number;
  timestamp: string;
  emotion: string;
  trigger_details: string | null;
  entry_price: number;
  exit_price: number;
  pnl: number;
}

export interface EmotionRequest {
  userId: string;
  currentEmotion: string;
  confidence: number;
  fear: number;
  excitement: number;
  stress: number;
}

export interface EmotionResponse {
  currentEmotion: string;
  confidence: number;
  fear: number;
  excitement: number;
  stress: number;
}

export interface WalletConnectRequest {
  walletAddress: string;
  walletType: 'metamask' | 'phantom' | 'internet_identity';
}

export interface WalletConnectResponse {
  status: string;
  userId: string;
  walletAddress: string;
  walletType: string;
}

export interface PerformanceMetrics {
  totalPnL: number;
  totalPnLPercent: number;
  winRate: number;
  totalTrades: number;
  avgHoldTime: string;
  emotionalStability: number;
  bestPair: string;
  worstPair: string;
  weeklyPnL: number;
  monthlyPnL: number;
  bestPairPercent: number;
  worstPairPercent: number;
  bestEmotion: string;
  worstEmotion: string;
  improvementArea: string;
  bestTrade: number;
  worstTrade: number;
  avgTrade: number;
  dailyChange: number;
  sharpeRatio: number;
}

export interface FeedbackRequest {
  userId: string;
  symbol: string;
  mode: string;
}

export interface FeedbackResponse {
  insights: Array<{
    id: string;
    type: string;
    title: string;
    description: string;
    confidence: number;
    timestamp: string;
    priority: string;
    action: string;
    icon: string;
    bgColor: string;
    color: string;
  }>;
  recommendations: Array<{
    id: string;
    text: string;
  }>;
  ai_status: {
    patternRecognition: string;
    emotionalAnalysis: string;
    dataPoints: number;
  };
}

export interface ArchetypeResponse {
  user_id: string;
  archetype: string;
  confidence: number;
  traits: {
    fomo_tendency: number;
    greed_tendency: number;
    fear_tendency: number;
    rationality: number;
    patience: number;
    risk_tolerance: number;
  };
  description: string;
  recommendations: string[];
}

export interface MarketAnalysisRequest {
  symbols: string[];
  exchange?: string;
  timeframe?: string;
}

export interface TechnicalIndicators {
  symbol: string;
  rsi: number;
  rsi_signal: string;
  breakout_detected: boolean;
  breakout_strength: number;
  volume_spike: boolean;
  trend_direction: string;
  support_level?: number;
  resistance_level?: number;
  confidence: number;
}

export interface MarketAnalysisResponse {
  user_id: string;
  timestamp: string;
  analysis: Record<string, TechnicalIndicators>;
}

export interface TickerData {
  symbol: string;
  lastPrice: number;
  priceChangePercent: number;
}

export interface KlineData {
  t: number;
  o: number;
  h: number;
  l: number;
  c: number;
}

export interface PerformanceTimeseries {
  time: string;
  pnl: number;
  emotional: number;
  volume: number;
}

// ==================== API FUNCTIONS ====================

class TradingAPI {
  // ========== Wallet Management ==========
  async connectWallet(data: WalletConnectRequest): Promise<WalletConnectResponse> {
    const response = await apiClient.post('/api/connect_wallet', data);
    return response.data;
  }

  async getBalance(userId: string): Promise<{ user_id: string; balance: number }> {
    const response = await apiClient.get(`/api/balance`, { params: { user_id: userId } });
    return response.data;
  }

  // ========== Trading Operations ==========
  async placeOrder(trade: TradeRequest): Promise<{
    status: string;
    trade_id: string;
    predicted_emotion: string;
    warning: {
      insight: string;
      warning: string;
      recommendation: string;
      advice: string;
    };
  }> {
    const response = await apiClient.post('/api/place_order', trade);
    return response.data;
  }

  async getUserTrades(userId: string, symbol: string): Promise<Trade[]> {
    const response = await apiClient.get('/api/user_trades', {
      params: { user_id: userId, symbol },
    });
    return response.data;
  }

  // ========== Emotions & Psychology ==========
  async saveEmotions(emotion: EmotionRequest): Promise<{ status: string; message: string }> {
    const response = await apiClient.post('/api/emotions', emotion);
    return response.data;
  }

  async getEmotions(userId: string): Promise<EmotionResponse> {
    const response = await apiClient.get('/api/emotions', { params: { user_id: userId } });
    return response.data;
  }

  async resetEmotions(userId: string): Promise<{ status: string; message: string }> {
    const response = await apiClient.post('/api/emotions/reset', null, {
      params: { user_id: userId },
    });
    return response.data;
  }

  async getUnifiedEmotions(userId: string): Promise<{
    status: string;
    predicted_emotion: string;
    warning: any;
    sources: Record<string, number>;
    saved_file: string;
  }> {
    const response = await apiClient.get(`/api/emotions/${userId}`);
    return response.data;
  }

  // ========== Performance & Analytics ==========
  async getPerformance(
    userId: string,
    symbol: string = 'ALL',
    mode: string = 'live'
  ): Promise<PerformanceMetrics> {
    const response = await apiClient.get('/api/performance', {
      params: { user_id: userId, symbol, mode },
    });
    return response.data;
  }

  async getPerformanceTimeseries(
    userId: string,
    symbol: string = 'ALL',
    mode: string = 'live'
  ): Promise<PerformanceTimeseries[]> {
    const response = await apiClient.get('/api/performance_timeseries', {
      params: { user_id: userId, symbol, mode },
    });
    return response.data;
  }

  // ========== Feedback & Recommendations ==========
  async getFeedback(data: FeedbackRequest): Promise<FeedbackResponse> {
    const response = await apiClient.post('/api/feedback', data);
    return response.data;
  }

  async getRecommendations(userId: string): Promise<
    Array<{
      timestamp: string;
      message: string;
      severity: string;
    }>
  > {
    const response = await apiClient.get(`/recommendations/${userId}`);
    return response.data;
  }

  // ========== Archetype Analysis ==========
  async assignArchetype(userId: string, days: number = 30): Promise<ArchetypeResponse> {
    const response = await apiClient.post(`/api/archetype/assign/${userId}`, null, {
      params: { days },
    });
    return response.data;
  }

  // ========== Market Data ==========
  async getMarketData(symbol: string): Promise<any> {
    const response = await apiClient.get(`/api/market_data/${symbol}`);
    return response.data;
  }

  async getTicker(symbol: string): Promise<TickerData> {
    const response = await apiClient.get('/api/ticker', { params: { symbol } });
    return response.data;
  }

  async getKlines(
    symbol: string,
    interval: string = '1h',
    limit: number = 30
  ): Promise<KlineData[]> {
    const response = await apiClient.get('/api/klines', {
      params: { symbol, interval, limit },
    });
    return response.data;
  }

  async analyzeMarket(userId: string, data: MarketAnalysisRequest): Promise<MarketAnalysisResponse> {
    const response = await apiClient.post(`/api/market/analyze/${userId}`, data);
    return response.data;
  }

  // ========== Session & Strategy ==========
  async resetSession(userId: string): Promise<{ status: string; message: string }> {
    const response = await apiClient.post('/api/reset_session', null, {
      params: { user_id: userId },
    });
    return response.data;
  }

  async saveStrategy(userId: string, strategy: any): Promise<{ status: string; message: string }> {
    const response = await apiClient.post('/api/save_strategy', null, {
      params: { user_id: userId },
      data: { strategy },
    });
    return response.data;
  }

  // ========== Dashboard Data ==========
  async getPerformanceMetrics(): Promise<any[]> {
    const response = await apiClient.get('/performance-metrics');
    return response.data;
  }

  async getPerformanceDistribution(): Promise<any> {
    const response = await apiClient.get('/performance-distribution');
    return response.data;
  }

  async getMoodEntries(): Promise<any[]> {
    const response = await apiClient.get('/mood');
    return response.data;
  }

  async logMood(entry: any): Promise<any> {
    const response = await apiClient.post('/mood', entry);
    return response.data;
  }

  async getEmotionalTriggers(): Promise<any> {
    const response = await apiClient.get('/emotional-triggers');
    return response.data;
  }

  async getAIInsights(): Promise<any> {
    const response = await apiClient.get('/ai-insights');
    return response.data;
  }

  async getRecentActivities(): Promise<any[]> {
    const response = await apiClient.get('/recent-activities');
    return response.data;
  }

  async getChartData(): Promise<any[]> {
    const response = await apiClient.get('/chart-data');
    return response.data;
  }

  async getEmotionalGauge(): Promise<any> {
    const response = await apiClient.get('/emotional-gauge');
    return response.data;
  }

  async getEmotionalScoreGauge(): Promise<any> {
    const response = await apiClient.get('/emotional-score-gauge');
    return response.data;
  }

  // ========== Health Check ==========
  async healthCheck(): Promise<{ status: string; timestamp: string; message: string }> {
    const response = await apiClient.get('/health');
    return response.data;
  }

  // ========== WebSocket Connection Helper ==========
  createTradeWebSocket(symbol: string, onMessage: (data: any) => void, onError?: (error: any) => void) {
    const ws = new WebSocket(`ws://127.0.0.1:5000/ws/trades/${symbol}`);
    
    ws.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
    };
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    };
    
    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      if (onError) onError(error);
    };
    
    ws.onclose = () => {
      console.log(`WebSocket disconnected for ${symbol}`);
    };
    
    return ws;
  }
}

// Export singleton instance
export const tradingAPI = new TradingAPI();

// Export types and instance
export default tradingAPI;