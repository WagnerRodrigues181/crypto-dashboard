export const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="glass rounded-xl p-6 animate-pulse">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-800" />
              <div>
                <div className="h-5 w-24 bg-gray-800 rounded mb-2" />
                <div className="h-4 w-16 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
          <div className="mb-4">
            <div className="h-8 w-32 bg-gray-800 rounded mb-2" />
            <div className="h-6 w-24 bg-gray-800 rounded" />
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-800/50">
            <div className="h-12 bg-gray-800 rounded" />
            <div className="h-12 bg-gray-800 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};
