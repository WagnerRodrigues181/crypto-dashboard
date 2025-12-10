import { TrendingUp, Sparkles } from "lucide-react";

export const Header = () => {
  return (
    <header className="glass border-b border-gray-800/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 bg-primary-500 blur-xl opacity-50 animate-pulse-slow" />
              <TrendingUp className="w-8 h-8 text-primary-400 relative" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
                CryptoVue
              </h1>
              <p className="text-xs text-gray-500">Real-time market data</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-500/10 border border-primary-500/20">
              <Sparkles className="w-4 h-4 text-primary-400" />
              <span className="text-sm text-primary-300">Live</span>
              <div className="w-2 h-2 rounded-full bg-primary-400 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
