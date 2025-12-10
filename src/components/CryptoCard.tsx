import { Star, TrendingUp, TrendingDown, Eye } from "lucide-react";
import type { Crypto } from "../types/crypto";
import { useCryptoStore } from "../store/useCryptoStore";
import {
  formatPrice,
  formatMarketCap,
  formatPercentage,
  getChangeColor,
  getChangeBgColor,
} from "../utils/formatters";
import { useTranslation } from "../contexts/I18nContext";

interface CryptoCardProps {
  crypto: Crypto;
  onClick: () => void;
}

export const CryptoCard = ({ crypto, onClick }: CryptoCardProps) => {
  const { watchlist, toggleWatchlist } = useCryptoStore();
  const { t } = useTranslation();
  const isInWatchlist = watchlist.includes(crypto.id);
  const isPositive = crypto.price_change_percentage_24h > 0;

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWatchlist(crypto.id);
  };

  return (
    <div
      onClick={onClick}
      className="glass-hover rounded-xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-[1.02] group"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <img
            src={crypto.image}
            alt={crypto.name}
            className="w-12 h-12 rounded-full ring-2 ring-gray-800 group-hover:ring-primary-500/50 transition-all"
          />
          <div>
            <h3 className="font-semibold text-lg text-white">{crypto.name}</h3>
            <p className="text-sm text-gray-500 uppercase">{crypto.symbol}</p>
          </div>
        </div>

        <button
          onClick={handleWatchlistClick}
          className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
        >
          <Star
            className={`w-5 h-5 transition-colors ${
              isInWatchlist
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-white mb-2">
          {formatPrice(crypto.current_price)}
        </p>
        <div className="flex items-center gap-2">
          <span
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${getChangeBgColor(
              crypto.price_change_percentage_24h
            )} ${getChangeColor(crypto.price_change_percentage_24h)}`}
          >
            {isPositive ? (
              <TrendingUp className="w-4 h-4" />
            ) : (
              <TrendingDown className="w-4 h-4" />
            )}
            {formatPercentage(crypto.price_change_percentage_24h)}
          </span>
          <span className="text-sm text-gray-500">{t("time.h24")}</span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/50">
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("card.marketCap")}</p>
          <p className="text-sm font-semibold text-gray-300">
            {formatMarketCap(crypto.market_cap)}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">{t("card.volume24h")}</p>
          <p className="text-sm font-semibold text-gray-300">
            {formatMarketCap(crypto.total_volume)}
          </p>
        </div>
      </div>

      {/* Mini Sparkline */}
      {crypto.sparkline_in_7d && (
        <div className="mt-4 h-16 relative overflow-hidden rounded-lg bg-gray-900/50">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <polyline
              fill="none"
              stroke={isPositive ? "#10b981" : "#ef4444"}
              strokeWidth="2"
              points={crypto.sparkline_in_7d.price
                .map((price, i) => {
                  const x =
                    (i / (crypto.sparkline_in_7d!.price.length - 1)) * 100;
                  const minPrice = Math.min(...crypto.sparkline_in_7d!.price);
                  const maxPrice = Math.max(...crypto.sparkline_in_7d!.price);
                  const y =
                    100 - ((price - minPrice) / (maxPrice - minPrice)) * 100;
                  return `${x},${y}`;
                })
                .join(" ")}
            />
          </svg>
        </div>
      )}

      {/* View Details */}
      <button className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors text-sm text-gray-300 group-hover:text-white">
        <Eye className="w-4 h-4" />
        {t("card.viewDetails")}
      </button>
    </div>
  );
};
