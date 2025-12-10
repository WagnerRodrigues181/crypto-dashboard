import { X, Bell, TrendingUp, TrendingDown } from "lucide-react";
import { useState } from "react";
import type { Crypto } from "../types/crypto";
import { useCryptoStore } from "../store/useCryptoStore";
import { formatPrice } from "../utils/formatters";
import toast from "react-hot-toast";
import { useTranslation } from "../contexts/I18nContext";

interface PriceAlertModalProps {
  crypto: Crypto;
  onClose: () => void;
}

export const PriceAlertModal = ({ crypto, onClose }: PriceAlertModalProps) => {
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState<"above" | "below">("above");
  const { addAlert } = useCryptoStore();
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const price = parseFloat(targetPrice);
    if (isNaN(price) || price <= 0) {
      toast.error(t("priceAlert.validPrice"));
      return;
    }

    addAlert({
      cryptoId: crypto.id,
      cryptoName: crypto.name,
      targetPrice: price,
      condition,
    });

    toast.success(`${t("priceAlert.success")} ${crypto.name}!`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="glass rounded-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary-500/10">
              <Bell className="w-6 h-6 text-primary-400" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {t("priceAlert.title")}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-800/50 transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Crypto Info */}
        <div className="glass rounded-xl p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <img
              src={crypto.image}
              alt={crypto.name}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="font-semibold text-white">{crypto.name}</p>
              <p className="text-sm text-gray-500">
                {crypto.symbol.toUpperCase()}
              </p>
            </div>
          </div>
          <p className="text-2xl font-bold text-white">
            {formatPrice(crypto.current_price)}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Condition Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("priceAlert.alertWhen")}
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCondition("above")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  condition === "above"
                    ? "bg-green-500 text-white"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                {t("priceAlert.above")}
              </button>
              <button
                type="button"
                onClick={() => setCondition("below")}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-all ${
                  condition === "below"
                    ? "bg-red-500 text-white"
                    : "glass text-gray-400 hover:text-white"
                }`}
              >
                <TrendingDown className="w-5 h-5" />
                {t("priceAlert.below")}
              </button>
            </div>
          </div>

          {/* Target Price Input */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">
              {t("priceAlert.targetPrice")}
            </label>
            <input
              type="number"
              step="0.00000001"
              value={targetPrice}
              onChange={(e) => setTargetPrice(e.target.value)}
              placeholder={t("priceAlert.targetPricePlaceholder")}
              className="w-full px-4 py-3 glass rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
              required
            />
          </div>

          {/* Preview */}
          {targetPrice && (
            <div className="glass rounded-xl p-4 border border-primary-500/20">
              <p className="text-sm text-gray-400 mb-1">
                {t("priceAlert.preview")}
              </p>
              <p className="text-white font-medium">
                {crypto.name} {t("priceAlert.goes")} {condition}{" "}
                <span
                  className={
                    condition === "above" ? "text-green-400" : "text-red-400"
                  }
                >
                  {formatPrice(parseFloat(targetPrice))}
                </span>
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg glass-hover font-medium transition-colors"
            >
              {t("priceAlert.cancel")}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium transition-colors"
            >
              {t("priceAlert.create")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
