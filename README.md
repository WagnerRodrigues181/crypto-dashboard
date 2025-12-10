# 🚀 CryptoVue - Real-Time Cryptocurrency Dashboard

<img width="1285" height="928" alt="Dashboard" src="https://github.com/user-attachments/assets/6b26f2f9-f432-452d-a083-a4b4abccc1c8" />


Dashboard moderno e profissional para acompanhamento de criptomoedas em tempo real.

![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3-blue)

## ✨ Features

- 📊 **Dados em Tempo Real** - Preços atualizados via CoinGecko API
- 📈 **Gráficos Interativos** - Charts com múltiplos períodos (24H, 7D, 30D, 90D, 1Y)
- ⭐ **Watchlist** - Acompanhe suas cryptos favoritas
- 🔔 **Alertas de Preço** - Notificações quando atingir valores alvo
- 🔍 **Busca Avançada** - Encontre qualquer criptomoeda instantaneamente
- 🎨 **UI Moderna** - Design glassmorphism com animações suaves
- 📱 **100% Responsivo** - Funciona perfeitamente em todos os dispositivos
- ⚡ **Alta Performance** - Cache inteligente e renderização otimizada

## 🛠️ Tecnologias

- **React 18** + **TypeScript** - Base da aplicação
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **Recharts** - Visualização de dados
- **CoinGecko API** - Dados de mercado
- **Vite** - Build tool
- **React Hot Toast** - Notificações

## 🚀 Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📖 Funcionalidades

<img width="1020" height="960" alt="Details" src="https://github.com/user-attachments/assets/695d7258-726a-4676-a2a1-5871d73bad16" />


### 1. Visualização de Mercado

- Top 50 criptomoedas por market cap
- Estatísticas globais de mercado
- Sparklines de 7 dias

### 2. Filtros Inteligentes

- **All Cryptos**: Todas as moedas
- **Watchlist**: Suas favoritas
- **Top Gainers**: Maiores altas 24h
- **Top Losers**: Maiores quedas 24h

### 3. Detalhes Completos

- Preço atual e variação 24h
- Market cap e volume
- High/Low 24h
- ATH/ATL (all-time high/low)
- Gráficos históricos interativos

### 4. Sistema de Alertas

- Configure alertas de preço personalizados
- Notificações quando metas são atingidas
- Histórico de alertas disparados

## 📁 Estrutura do Projeto

```
src/
├── components/       # Componentes React
│   ├── Header.tsx
│   ├── StatsOverview.tsx
│   ├── CryptoCard.tsx
│   ├── CryptoChart.tsx
│   ├── CryptoDetailModal.tsx
│   ├── PriceAlertModal.tsx
│   ├── AlertsList.tsx
│   ├── SearchBar.tsx
│   ├── FilterTabs.tsx
│   └── LoadingSkeleton.tsx
├── services/         # APIs externas
│   └── coingecko.ts
├── store/            # Zustand stores
│   └── useCryptoStore.ts
├── types/            # TypeScript types
│   └── crypto.ts
├── utils/            # Funções utilitárias
│   └── formatters.ts
├── hooks/            # Custom hooks
│   └── useCryptoData.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎯 Destaques Técnicos

- ✅ **TypeScript** com tipagem forte em 100% do código
- ✅ **Clean Architecture** (separação de concerns)
- ✅ **Custom Hooks** para lógica reutilizável
- ✅ **State Management** moderno com Zustand
- ✅ **API Integration** com cache inteligente
- ✅ **Error Handling** robusto
- ✅ **Loading States** e skeletons
- ✅ **Responsive Design** mobile-first
- ✅ **Performance** otimizada

## 📝 Commits

O projeto foi desenvolvido com **commits semânticos**:

```
feat: initialize project with react and typescript
feat: integrate coingecko api client
feat: create zustand store for state management
feat: add utility functions for formatting
feat: create custom hook for crypto data fetching
feat: create crypto list component with real-time data
feat: implement price chart with recharts
feat: add price alert system with notifications
feat: create detailed crypto info modal
style: implement glassmorphism design system
feat: add auto-refresh for real-time updates
perf: optimize api calls with caching strategy
feat: implement responsive mobile layout
docs: add comprehensive readme
```

## 📄 Licença

MIT License

## 🙏 Agradecimentos

- [CoinGecko](https://www.coingecko.com/) - API de dados
- [Lucide](https://lucide.dev/) - Ícones
- [Recharts](https://recharts.org/) - Gráficos
