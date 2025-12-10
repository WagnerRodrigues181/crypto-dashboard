import { TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { useCryptoStore } from "../store/useCryptoStore";
import { formatMarketCap } from "../utils/formatters";
import { useTranslation } from "../contexts/I18nContext";

export const StatsOverview = () => {
  const { t } = useTranslation();
  const { cryptos } = useCryptoStore();

  const totalMarketCap = cryptos.reduce(
    (acc, crypto) => acc + crypto.market_cap,
    0
  );
  const total24hVolume = cryptos.reduce(
    (acc, crypto) => acc + crypto.total_volume,
    0
  );
  const avgChange =
    cryptos.reduce(
      (acc, crypto) => acc + crypto.price_change_percentage_24h,
      0
    ) / cryptos.length;
  const gainersCount = cryptos.filter(
    (c) => c.price_change_percentage_24h > 0
  ).length;

  const stats = [
    {
      title: t("stats.totalMarketCap"),
      value: formatMarketCap(totalMarketCap),
      icon: DollarSign,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      title: t("stats.volume24h"),
      value: formatMarketCap(total24hVolume),
      icon: Activity,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      title: t("stats.avgChange"),
      value: `${avgChange > 0 ? "+" : ""}${avgChange.toFixed(2)}%`,
      icon: avgChange > 0 ? TrendingUp : TrendingDown,
      color: avgChange > 0 ? "text-green-400" : "text-red-400",
      bgColor: avgChange > 0 ? "bg-green-500/10" : "bg-red-500/10",
    },
    {
      title: t("stats.gainersLosers"),
      value: `${gainersCount} / ${cryptos.length - gainersCount}`,
      icon: TrendingUp,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div
          key={stat.title}
          className="glass-hover rounded-xl p-6 transform transition-all duration-300 hover:scale-105"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`p-3 rounded-lg ${stat.bgColor}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
          </div>
          <p className="text-sm text-gray-400 mb-1">{stat.title}</p>
          <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};
