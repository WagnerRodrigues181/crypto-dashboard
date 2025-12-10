interface FilterTabsProps {
  activeFilter: "all" | "watchlist" | "gainers" | "losers";
  onFilterChange: (filter: "all" | "watchlist" | "gainers" | "losers") => void;
}

export const FilterTabs = ({
  activeFilter,
  onFilterChange,
}: FilterTabsProps) => {
  const tabs = [
    { id: "all" as const, label: "All Cryptos" },
    { id: "watchlist" as const, label: "Watchlist" },
    { id: "gainers" as const, label: "Top Gainers" },
    { id: "losers" as const, label: "Top Losers" },
  ];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onFilterChange(tab.id)}
          className={`px-6 py-2.5 rounded-lg font-medium whitespace-nowrap transition-all ${
            activeFilter === tab.id
              ? "bg-primary-500 text-white shadow-lg shadow-primary-500/50"
              : "glass text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
