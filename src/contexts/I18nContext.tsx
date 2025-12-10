import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Language = "en" | "pt-BR";

interface Translations {
  [key: string]: string | Translations;
}

const translations: Record<Language, Translations> = {
  en: {
    header: {
      title: "CryptoVue",
      subtitle: "Real-time market data",
      live: "Live",
    },
    search: {
      placeholder: "Search cryptocurrencies...",
    },
    filters: {
      all: "All Cryptos",
      watchlist: "Watchlist",
      gainers: "Top Gainers",
      losers: "Top Losers",
    },
    stats: {
      totalMarketCap: "Total Market Cap",
      volume24h: "24h Volume",
      avgChange: "Avg 24h Change",
      gainersLosers: "Gainers / Losers",
    },
    alerts: {
      title: "Price Alerts",
      count: "Price Alerts",
      noAlerts: "No Active Alerts",
      noAlertsDescription:
        "Set price alerts to get notified when your favorite cryptos reach target prices",
      setAlert: "Set Price Alert",
      created: "Created",
      triggered: "Triggered",
      waiting: "Waiting",
      above: "above",
      below: "below",
    },
    card: {
      marketCap: "Market Cap",
      volume24h: "Volume 24h",
      viewDetails: "View Details",
    },
    modal: {
      refresh: "Refresh",
      priceChart: "Price Chart",
      high24h: "24h High",
      low24h: "24h Low",
      circulatingSupply: "Circulating Supply",
      allTimeHigh: "All-Time High",
      allTimeLow: "All-Time Low",
      marketCapRank: "Market Cap Rank",
      coingecko: "CoinGecko",
      volume24h: "24h Volume",
    },
    priceAlert: {
      title: "Set Price Alert",
      alertWhen: "Alert me when price goes",
      above: "Above",
      below: "Below",
      targetPrice: "Target Price (USD)",
      targetPricePlaceholder: "Enter target price...",
      preview: "You'll be notified when",
      goes: "goes",
      cancel: "Cancel",
      create: "Create Alert",
      validPrice: "Please enter a valid price",
      success: "Alert set for",
      triggered: "Price Alert",
      isNow: "is now",
    },
    empty: {
      noResults: "No cryptocurrencies found matching your search",
      emptyWatchlist:
        "Your watchlist is empty. Star some cryptos to add them here!",
      noCryptos: "No cryptocurrencies found",
    },
    errors: {
      fetchData: "Failed to fetch data",
      fetchCrypto: "Failed to fetch crypto data",
      fetchDetails: "Failed to fetch crypto details",
      fetchChart: "Failed to fetch chart data",
      search: "Failed to search cryptos",
    },
    time: {
      h24: "24h",
    },
  },
  "pt-BR": {
    header: {
      title: "CryptoVue",
      subtitle: "Dados de mercado em tempo real",
      live: "Ao Vivo",
    },
    search: {
      placeholder: "Buscar criptomoedas...",
    },
    filters: {
      all: "Todas as Criptos",
      watchlist: "Favoritos",
      gainers: "Maiores Altas",
      losers: "Maiores Quedas",
    },
    stats: {
      totalMarketCap: "Capitalização Total",
      volume24h: "Volume 24h",
      avgChange: "Variação Média 24h",
      gainersLosers: "Altas / Quedas",
    },
    alerts: {
      title: "Alertas de Preço",
      count: "Alertas de Preço",
      noAlerts: "Nenhum Alerta Ativo",
      noAlertsDescription:
        "Configure alertas de preço para ser notificado quando suas criptomoedas favoritas atingirem valores alvo",
      setAlert: "Configurar Alerta de Preço",
      created: "Criado",
      triggered: "Acionado",
      waiting: "Aguardando",
      above: "acima de",
      below: "abaixo de",
    },
    card: {
      marketCap: "Valor de Mercado",
      volume24h: "Volume 24h",
      viewDetails: "Ver Detalhes",
    },
    modal: {
      refresh: "Atualizar",
      priceChart: "Gráfico de Preço",
      high24h: "Máxima 24h",
      low24h: "Mínima 24h",
      circulatingSupply: "Fornecimento Circulante",
      allTimeHigh: "Máxima Histórica",
      allTimeLow: "Mínima Histórica",
      marketCapRank: "Ranking de Mercado",
      coingecko: "CoinGecko",
      volume24h: "Volume 24h",
    },
    priceAlert: {
      title: "Configurar Alerta de Preço",
      alertWhen: "Me alertar quando o preço",
      above: "Subir",
      below: "Cair",
      targetPrice: "Preço Alvo (USD)",
      targetPricePlaceholder: "Digite o preço alvo...",
      preview: "Você será notificado quando",
      goes: "estiver",
      cancel: "Cancelar",
      create: "Criar Alerta",
      validPrice: "Por favor, insira um preço válido",
      success: "Alerta configurado para",
      triggered: "Alerta de Preço",
      isNow: "está agora",
    },
    empty: {
      noResults: "Nenhuma criptomoeda encontrada para sua busca",
      emptyWatchlist:
        "Sua lista de favoritos está vazia. Favorite algumas criptos para adicioná-las aqui!",
      noCryptos: "Nenhuma criptomoeda encontrada",
    },
    errors: {
      fetchData: "Falha ao buscar dados",
      fetchCrypto: "Falha ao buscar dados da criptomoeda",
      fetchDetails: "Falha ao buscar detalhes da criptomoeda",
      fetchChart: "Falha ao buscar dados do gráfico",
      search: "Falha ao buscar criptomoedas",
    },
    time: {
      h24: "24h",
    },
  },
};

interface I18nContextType {
  language: Language;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("cryptovue-language");
    return (saved as Language) || "en";
  });

  useEffect(() => {
    localStorage.setItem("cryptovue-language", language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "en" ? "pt-BR" : "en"));
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      if (value && typeof value === "object") {
        value = value[k];
      } else {
        return key;
      }
    }

    return typeof value === "string" ? value : key;
  };

  return (
    <I18nContext.Provider value={{ language, toggleLanguage, t }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useTranslation must be used within I18nProvider");
  }
  return context;
};
