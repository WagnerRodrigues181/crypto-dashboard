import { useEffect } from "react";
import { coinGeckoService } from "../services/coingecko";
import { useCryptoStore } from "../store/useCryptoStore";
import { useTranslation } from "../contexts/I18nContext";
import toast from "react-hot-toast";

export const useCryptoData = (autoRefresh = true) => {
  const { t } = useTranslation();
  const { setCryptos, setLoading, setError, alerts, triggerAlert } =
    useCryptoStore();

  const fetchCryptos = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await coinGeckoService.getTopCryptos(50);
      setCryptos(data);

      // Check price alerts
      data.forEach((crypto) => {
        alerts.forEach((alert) => {
          if (alert.cryptoId === crypto.id && !alert.triggered) {
            const shouldTrigger =
              (alert.condition === "above" &&
                crypto.current_price >= alert.targetPrice) ||
              (alert.condition === "below" &&
                crypto.current_price <= alert.targetPrice);

            if (shouldTrigger) {
              triggerAlert(alert.id);
              toast.success(
                `${t("priceAlert.triggered")}: ${crypto.name} ${t(
                  "priceAlert.isNow"
                )} ${t(`alerts.${alert.condition}`)} $${alert.targetPrice}!`,
                { duration: 5000 }
              );
            }
          }
        });
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : t("errors.fetchData");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptos();

    if (autoRefresh) {
      const interval = setInterval(fetchCryptos, 60000); // Refresh every 60 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  return { fetchCryptos };
};
