import { useEffect, useRef } from "react";
import { coinGeckoService } from "../services/coingecko";
import { useCryptoStore } from "../store/useCryptoStore";
import { useTranslation } from "../contexts/I18nContext";
import toast from "react-hot-toast";

export const useCryptoData = (autoRefresh = true) => {
  const { t } = useTranslation();
  const { setCryptos, setLoading, setError, alerts } = useCryptoStore();

  const alertsRef = useRef(alerts);
  useEffect(() => {
    alertsRef.current = alerts;
  }, [alerts]);

  const fetchCryptos = async () => {
    console.log("[1] fetchCryptos iniciado");
    try {
      setLoading(true);
      setError(null);
      console.log("[2] chamando CoinGecko...");
      const data = await coinGeckoService.getTopCryptos(50);
      console.log("[3] dados recebidos:", data?.length, "itens", data?.[0]);
      setCryptos(data);
      console.log("[4] setCryptos executado");
    } catch (error) {
      console.error("[ERRO] fetchCryptos falhou:", error);
      const message =
        error instanceof Error ? error.message : t("errors.fetchData");
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
      console.log("[5] isLoading -> false");
    }
  };

  useEffect(() => {
    console.log("[MOUNT] useCryptoData montado");
    fetchCryptos();

    if (!autoRefresh) return;
    const interval = setInterval(() => {
      console.log("[INTERVAL] re-fetch disparado");
      fetchCryptos();
    }, 60000);
    return () => {
      console.log("[UNMOUNT] intervalo limpo");
      clearInterval(interval);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { fetchCryptos };
};
