import type { Crypto, ChartData } from "../types/crypto";

const BASE_URL = "https://api.coingecko.com/api/v3";

class CoinGeckoService {
  private cache = new Map<string, { data: any; timestamp: number }>();
  private readonly CACHE_DURATION = 30000;

  private getCached<T>(key: string): T | null {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
      return cached.data as T;
    }
    return null;
  }

  private setCache(key: string, data: any): void {
    this.cache.set(key, { data, timestamp: Date.now() });
  }

  async getTopCryptos(limit = 50): Promise<Crypto[]> {
    const cacheKey = `top-cryptos-${limit}`;
    const cached = this.getCached<Crypto[]>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=true&price_change_percentage=7d`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch crypto data");
      }

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching top cryptos:", error);
      throw error;
    }
  }

  async getCryptoById(id: string): Promise<Crypto> {
    const cacheKey = `crypto-${id}`;
    const cached = this.getCached<Crypto>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&ids=${id}&sparkline=true&price_change_percentage=7d`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch crypto details");
      }

      const data = await response.json();
      const crypto = data[0];
      this.setCache(cacheKey, crypto);
      return crypto;
    } catch (error) {
      console.error("Error fetching crypto details:", error);
      throw error;
    }
  }

  async getChartData(id: string, days: number = 7): Promise<ChartData> {
    const cacheKey = `chart-${id}-${days}`;
    const cached = this.getCached<ChartData>(cacheKey);
    if (cached) return cached;

    try {
      const response = await fetch(
        `${BASE_URL}/coins/${id}/market_chart?vs_currency=usd&days=${days}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch chart data");
      }

      const data = await response.json();
      this.setCache(cacheKey, data);
      return data;
    } catch (error) {
      console.error("Error fetching chart data:", error);
      throw error;
    }
  }

  async searchCryptos(query: string): Promise<Crypto[]> {
    try {
      const response = await fetch(
        `${BASE_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false`
      );

      if (!response.ok) {
        throw new Error("Failed to search cryptos");
      }

      const data: Crypto[] = await response.json();

      const searchLower = query.toLowerCase();
      return data.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(searchLower) ||
          crypto.symbol.toLowerCase().includes(searchLower)
      );
    } catch (error) {
      console.error("Error searching cryptos:", error);
      throw error;
    }
  }
}

export const coinGeckoService = new CoinGeckoService();
