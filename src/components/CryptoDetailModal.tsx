import { X, TrendingUp, TrendingDown, ExternalLink, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import type { Crypto, ChartData } from "../types/crypto";
import { coinGeckoService } from "../services/coingecko";
import {
  formatPrice,
  formatMarketCap,
  formatPercentage,
  getChangeColor,
} from "../utils/formatters";
import { CryptoChart } from "./CryptoChart";
import { format } from "date-fns";
import { useTranslation } from "../contexts/I18nContext";

interface CryptoDetailModalProps {
  crypto: Crypto;
  onClose: () => void;
  onSetAlert: () => void;
}

export const CryptoDetailModal = ({
  crypto,
  onClose,
  onSetAlert,
}: CryptoDetailModalProps) => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [chartDays, setChartDays] = useState(7);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      try {
        const data = await coinGeckoService.getChartData(crypto.id, chartDays);
        setChartData(data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChartData();
  }, [crypto.id, chartDays]);

  const isPositive = crypto.price_change_percentage_24h > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 z-10 glass border-b border-gray-800/50 p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h2 className="text-2xl font-bold text-white">{crypto.name}</h2>
              <p className="text-gray-500 uppercase">{crypto.symbol}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Price Section */}
          <div>
            <p className="text-4xl font-bold text-white mb-2">
              {formatPrice(crypto.current_price)}
            </p>
            <div className="flex items-center gap-3">
              <span
                className={`flex items-center gap-1 text-lg font-medium ${getChangeColor(
                  crypto.price_change_percentage_24h
                )}`}
              >
                {isPositive ? (
                  <TrendingUp className="w-5 h-5" />
                ) : (
                  <TrendingDown className="w-5 h-5" />
                )}
                {formatPercentage(crypto.price_change_percentage_24h)}
              </span>
              <span className="text-gray-500">{t("time.h24")}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={onSetAlert}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              <Bell className="w-5 h-5" />
              {t("alerts.setAlert")}
            </button>

            <a
              href={`https://www.coingecko.com/en/coins/${crypto.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg glass-hover font-medium transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
              {t("modal.coingecko")}
            </a>
          </div>

          {/* Chart Time Filters */}
          <div className="flex gap-2">
            {[
              { label: "24H", days: 1 },
              { label: "7D", days: 7 },
              { label: "30D", days: 30 },
              { label: "90D", days: 90 },
              { label: "1Y", days: 365 },
            ].map((option) => (
              <button
                key={option.days}
                onClick={() => setChartDays(option.days)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  chartDays === option.days
                    ? "bg-primary-500 text-white"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {/* Chart */}
          {loading ? (
            <div className="glass rounded-xl p-6 h-80 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
            </div>
          ) : chartData ? (
            <CryptoChart data={chartData.prices} isPositive={isPositive} />
          ) : null}

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">
                {t("card.marketCap")}
              </p>
              <p className="text-lg font-semibold text-white">
                {formatMarketCap(crypto.market_cap)}
              </p>
              <p
                className={`text-sm ${getChangeColor(
                  crypto.market_cap_change_percentage_24h
                )}`}
              >
                {formatPercentage(crypto.market_cap_change_percentage_24h)}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">
                {t("modal.volume24h")}
              </p>
              <p className="text-lg font-semibold text-white">
                {formatMarketCap(crypto.total_volume)}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">
                {t("modal.marketCapRank")}
              </p>
              <p className="text-lg font-semibold text-white">
                #{crypto.market_cap_rank}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">{t("modal.high24h")}</p>
              <p className="text-lg font-semibold text-green-400">
                {formatPrice(crypto.high_24h)}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">{t("modal.low24h")}</p>
              <p className="text-lg font-semibold text-red-400">
                {formatPrice(crypto.low_24h)}
              </p>
            </div>

            <div className="glass rounded-xl p-4">
              <p className="text-sm text-gray-500 mb-1">
                {t("modal.circulatingSupply")}
              </p>
              <p className="text-lg font-semibold text-white">
                {crypto.circulating_supply.toLocaleString()}{" "}
                {crypto.symbol.toUpperCase()}
              </p>
            </div>

            {crypto.ath && (
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">
                  {t("modal.allTimeHigh")}
                </p>
                <p className="text-lg font-semibold text-white">
                  {formatPrice(crypto.ath)}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(crypto.ath_date), "MMM dd, yyyy")}
                </p>
              </div>
            )}

            {crypto.atl && (
              <div className="glass rounded-xl p-4">
                <p className="text-sm text-gray-500 mb-1">
                  {t("modal.allTimeLow")}
                </p>
                <p className="text-lg font-semibold text-white">
                  {formatPrice(crypto.atl)}
                </p>
                <p className="text-xs text-gray-500">
                  {format(new Date(crypto.atl_date), "MMM dd, yyyy")}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
