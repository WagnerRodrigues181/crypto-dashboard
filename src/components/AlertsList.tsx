import { Bell, Trash2, TrendingUp, TrendingDown, Check } from "lucide-react";
import { useCryptoStore } from "../store/useCryptoStore";
import { formatPrice } from "../utils/formatters";
import { format } from "date-fns";

export const AlertsList = () => {
  const { alerts, removeAlert } = useCryptoStore();

  if (alerts.length === 0) {
    return (
      <div className="glass rounded-xl p-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-800/50 mb-4">
          <Bell className="w-8 h-8 text-gray-500" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          No Active Alerts
        </h3>
        <p className="text-gray-500">
          Set price alerts to get notified when your favorite cryptos reach
          target prices
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-white mb-4">
        Price Alerts ({alerts.length})
      </h3>
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`glass rounded-xl p-4 ${
            alert.triggered ? "border border-green-500/50 bg-green-500/5" : ""
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              {alert.triggered ? (
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Check className="w-5 h-5 text-green-400" />
                </div>
              ) : (
                <div
                  className={`p-2 rounded-lg ${
                    alert.condition === "above"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {alert.condition === "above" ? (
                    <TrendingUp
                      className={`w-5 h-5 ${
                        alert.condition === "above"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    />
                  ) : (
                    <TrendingDown className="w-5 h-5 text-red-400" />
                  )}
                </div>
              )}

              <div className="flex-1">
                <p className="font-medium text-white">{alert.cryptoName}</p>
                <p className="text-sm text-gray-400">
                  {alert.triggered ? "Triggered" : "Waiting"} •{" "}
                  {alert.condition} {formatPrice(alert.targetPrice)}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Created {format(new Date(alert.createdAt), "MMM dd, HH:mm")}
                </p>
              </div>
            </div>

            <button
              onClick={() => removeAlert(alert.id)}
              className="p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
            >
              <Trash2 className="w-5 h-5 text-gray-500 group-hover:text-red-400 transition-colors" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
