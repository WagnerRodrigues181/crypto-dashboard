import { useState, useMemo } from "react";
import { Header } from "./components/Header";
import { StatsOverview } from "./components/StatsOverview";
import { SearchBar } from "./components/SearchBar";
import { FilterTabs } from "./components/FilterTabs";
import { CryptoCard } from "./components/CryptoCard";
import { CryptoDetailModal } from "./components/CryptoDetailModal";
import { PriceAlertModal } from "./components/PriceAlertModal";
import { AlertsList } from "./components/AlertsList";
import { LoadingSkeleton } from "./components/LoadingSkeleton";
import { useCryptoData } from "./hooks/useCryptoData";
import { useCryptoStore } from "./store/useCryptoStore";
import { useTranslation } from "./contexts/I18nContext";
import type { Crypto } from "./types/crypto";
import { RefreshCw } from "lucide-react";

type FilterType = "all" | "watchlist" | "gainers" | "losers";

function App() {
  const { t } = useTranslation();
  const { fetchCryptos } = useCryptoData();
  const { cryptos, watchlist, isLoading, setSelectedCrypto, selectedCrypto } =
    useCryptoStore();

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchCryptos();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const filteredCryptos = useMemo(() => {
    let filtered = [...cryptos];

    // Apply filter
    switch (activeFilter) {
      case "watchlist":
        filtered = filtered.filter((crypto) => watchlist.includes(crypto.id));
        break;
      case "gainers":
        filtered = filtered
          .filter((crypto) => crypto.price_change_percentage_24h > 0)
          .sort(
            (a, b) =>
              b.price_change_percentage_24h - a.price_change_percentage_24h
          )
          .slice(0, 10);
        break;
      case "losers":
        filtered = filtered
          .filter((crypto) => crypto.price_change_percentage_24h < 0)
          .sort(
            (a, b) =>
              a.price_change_percentage_24h - b.price_change_percentage_24h
          )
          .slice(0, 10);
        break;
    }

    // Apply search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (crypto) =>
          crypto.name.toLowerCase().includes(query) ||
          crypto.symbol.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [cryptos, watchlist, activeFilter, searchQuery]);

  const handleCryptoClick = (crypto: Crypto) => {
    setSelectedCrypto(crypto);
  };

  const handleCloseModal = () => {
    setSelectedCrypto(null);
  };

  const handleSetAlert = () => {
    setShowAlertModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        {!isLoading && cryptos.length > 0 && (
          <div className="mb-8">
            <StatsOverview />
          </div>
        )}

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <SearchBar onSearch={setSearchQuery} />
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2 px-4 py-3 rounded-xl glass-hover font-medium transition-all disabled:opacity-50"
            >
              <RefreshCw
                className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">{t("modal.refresh")}</span>
            </button>
          </div>

          <FilterTabs
            activeFilter={activeFilter}
            onFilterChange={setActiveFilter}
          />
        </div>

        {/* Alerts Section */}
        <div className="mb-8">
          <AlertsList />
        </div>

        {/* Crypto Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : filteredCryptos.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-xl text-gray-400">
              {searchQuery
                ? t("empty.noResults")
                : activeFilter === "watchlist"
                ? t("empty.emptyWatchlist")
                : t("empty.noCryptos")}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCryptos.map((crypto) => (
              <CryptoCard
                key={crypto.id}
                crypto={crypto}
                onClick={() => handleCryptoClick(crypto)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedCrypto && (
        <CryptoDetailModal
          crypto={selectedCrypto}
          onClose={handleCloseModal}
          onSetAlert={handleSetAlert}
        />
      )}

      {showAlertModal && selectedCrypto && (
        <PriceAlertModal
          crypto={selectedCrypto}
          onClose={() => setShowAlertModal(false)}
        />
      )}
    </div>
  );
}

export default App;
