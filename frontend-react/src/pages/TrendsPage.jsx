import { useState, useEffect } from 'react';
import { TrendingUp, Loader, RefreshCw, Flame, Target, Zap } from 'lucide-react';
import { apiService } from '../utils/apiService';
import { formatPercent, formatMetric } from '../utils/formatters';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

export default function TrendsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTrends();
  }, []);

  const fetchTrends = async () => {
    try {
      setLoading(true);
      const result = await apiService.getTrends();
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch trends data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pharma-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-rose-500 rounded-full">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 via-red-600 to-rose-600 bg-clip-text text-transparent mb-4">
            Market Trends & Intelligence
          </h1>
          <p className="text-xl text-gray-600">
            Discover emerging opportunities and trending therapeutic areas across the pharmaceutical landscape
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <Alert
            type="error"
            title="Error Loading Trends"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Content */}
        {data && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Therapeutic Areas */}
            {data.trending_therapeutic_areas && (
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-pharma-500 opacity-5 rounded-full -mr-24 -mt-24"></div>
                <h2 className="relative text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="p-2 bg-gradient-to-r from-pharma-500 to-pharma-600 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </span>
                  Top Therapeutic Areas by Growth
                </h2>
                <div className="space-y-4 relative">
                  {data.trending_therapeutic_areas.map((area, idx) => (
                    <div key={idx} className="group">
                      <div className="flex items-center justify-between p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200 hover:shadow-glow transition-all hover:border-pharma-300">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-10 h-10 bg-gradient-to-br from-pharma-500 to-pharma-600 text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-lg">
                            {idx + 1}
                          </div>
                          <div className="flex-1">
                            <p className="font-bold text-gray-900 text-lg">{area.area}</p>
                            <p className="text-sm text-gray-600 mt-1">{area.description}</p>
                          </div>
                        </div>
                        <div className="text-right min-w-fit ml-4">
                          <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                            {formatPercent(area.growth, 1)}
                          </div>
                          <p className="text-xs text-gray-600 mt-1 font-semibold">YoY Growth</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trending Conditions */}
            {data.trending_conditions && (
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                  <span className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg">
                    <Target className="w-6 h-6 text-white" />
                  </span>
                  Most Researched Conditions
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.trending_conditions.map((condition, idx) => (
                    <div
                      key={idx}
                      className="group relative bg-gradient-to-br from-blue-50 via-cyan-50 to-purple-50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-glow transition-all overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-5 transition"></div>
                      <div className="relative">
                        <h4 className="font-bold text-gray-900 mb-2 text-lg">{condition.condition}</h4>
                        <p className="text-sm text-gray-600 mb-4">{condition.description}</p>
                        <div className="flex justify-between items-center pt-4 border-t border-blue-200">
                          <span className="inline-block px-3 py-1 bg-blue-500 text-white rounded-full text-xs font-bold">
                            {formatMetric(condition.trials_count, 0)} trials
                          </span>
                          <span className="text-blue-600 font-bold text-lg flex items-center gap-1">
                            <Flame size={16} className="text-orange-500" />
                            {formatPercent(condition.interest_trend, 0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Web Trends */}
            {data.web_trends && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500 opacity-5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-white" />
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">Publication Growth</h3>
                    </div>
                    <p className="text-4xl font-bold text-green-600 mb-2">
                      {formatPercent(data.web_trends.publication_growth, 1)}
                    </p>
                    <p className="text-sm text-gray-600">Last 30 days</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500 opacity-5 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="p-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg">
                        <Zap className="w-6 h-6 text-white" />
                      </span>
                      <h3 className="text-lg font-bold text-gray-900">Sentiment Score</h3>
                    </div>
                    <p className="text-4xl font-bold text-yellow-600 mb-2">
                      {(data.web_trends.avg_sentiment * 100).toFixed(0)}/100
                    </p>
                    <p className="text-sm text-gray-600">Average Positivity</p>
                  </div>
                </div>
              </div>
            )}

            {/* Market Insights */}
            {data.market_insights && (
              <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-mesh opacity-5 rounded-full -mr-48 -mt-48"></div>
                <div className="relative">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                    <span className="p-2 bg-gradient-pharma rounded-lg">
                      <Target className="w-6 h-6 text-white" />
                    </span>
                    Strategic Market Insights
                  </h2>
                  <div className="prose prose-sm max-w-none">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {data.market_insights}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Refresh Button */}
            <div className="flex justify-center">
              <button
                onClick={fetchTrends}
                className="px-8 py-4 bg-gradient-pharma text-white rounded-xl hover:shadow-glow disabled:opacity-50 transition-all flex items-center gap-2 font-semibold text-lg"
              >
                <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
                Refresh Trends
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
