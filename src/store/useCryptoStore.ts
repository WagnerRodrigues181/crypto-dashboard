import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Crypto, PriceAlert } from "../types/crypto";

interface CryptoStore {
  cryptos: Crypto[];
  watchlist: string[];
  alerts: PriceAlert[];
  selectedCrypto: Crypto | null;
  isLoading: boolean;
  error: string | null;

  setCryptos: (cryptos: Crypto[]) => void;
  setSelectedCrypto: (crypto: Crypto | null) => void;
  toggleWatchlist: (cryptoId: string) => void;
  addAlert: (alert: Omit<PriceAlert, "id" | "createdAt" | "triggered">) => void;
  removeAlert: (alertId: string) => void;
  triggerAlert: (alertId: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCryptoStore = create<CryptoStore>()(
  persist(
    (set) => ({
      cryptos: [],
      watchlist: [],
      alerts: [],
      selectedCrypto: null,
      isLoading: false,
      error: null,

      setCryptos: (cryptos) => set({ cryptos }),

      setSelectedCrypto: (crypto) => set({ selectedCrypto: crypto }),

      toggleWatchlist: (cryptoId) =>
        set((state) => ({
          watchlist: state.watchlist.includes(cryptoId)
            ? state.watchlist.filter((id) => id !== cryptoId)
            : [...state.watchlist, cryptoId],
        })),

      addAlert: (alert) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              ...alert,
              id: crypto.randomUUID(),
              createdAt: Date.now(),
              triggered: false,
            },
          ],
        })),

      removeAlert: (alertId) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== alertId),
        })),

      triggerAlert: (alertId) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === alertId ? { ...alert, triggered: true } : alert
          ),
        })),

      setLoading: (loading) => set({ isLoading: loading }),

      setError: (error) => set({ error }),
    }),
    {
      name: "crypto-dashboard-storage",
      partialize: (state) => ({
        watchlist: state.watchlist,
        alerts: state.alerts,
      }),
    }
  )
);
