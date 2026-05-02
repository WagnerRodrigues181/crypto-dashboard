export const formatPrice = (price: number | null | undefined): string => {
  if (price == null) return "$0.00";
  if (price >= 1) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
};

export const formatMarketCap = (
  marketCap: number | null | undefined,
): string => {
  if (marketCap == null) return "$0";
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toFixed(0)}`;
};

export const formatPercentage = (
  percentage: number | null | undefined,
): string => {
  if (percentage == null) return "0.00%";
  const sign = percentage >= 0 ? "+" : "";
  return `${sign}${percentage.toFixed(2)}%`;
};

export const formatVolume = (volume: number | null | undefined): string => {
  return formatMarketCap(volume);
};

export const getChangeColor = (change: number | null | undefined): string => {
  if (change == null) return "text-gray-400";
  if (change > 0) return "text-green-500";
  if (change < 0) return "text-red-500";
  return "text-gray-400";
};

export const getChangeBgColor = (change: number | null | undefined): string => {
  if (change == null) return "bg-gray-500/10";
  if (change > 0) return "bg-green-500/10";
  if (change < 0) return "bg-red-500/10";
  return "bg-gray-500/10";
};
