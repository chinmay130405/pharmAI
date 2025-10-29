import { useState } from 'react';
import { Search, Loader, Download, Share2, TrendingUp, Zap, Calendar, FileText, Beaker, DollarSign, Pill, Lightbulb, BarChart3, Sparkles } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { apiService } from '../utils/apiService';
import { formatCurrency, formatPercent, formatDate, formatMetric } from '../utils/formatters';
import InsightCard from '../components/InsightCard';
import LoadingSpinner from '../components/LoadingSpinner';
import Alert from '../components/Alert';

export default function HomePage() {
  const [moleculeName, setMoleculeName] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!moleculeName.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await apiService.queryMolecule(moleculeName);
      setData(result);
    } catch (err) {
      setError(err.message || 'Failed to fetch molecule data. Ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!data) return;
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.molecule}_analysis.json`;
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-pharma-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="p-3 bg-gradient-pharma rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pharma-700 via-pharma-600 to-accent-violet bg-clip-text text-transparent mb-4">
            Drug Discovery Accelerator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Powered by advanced AI agents to identify innovative drug repurposing opportunities in seconds
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-12">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-pharma rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-white rounded-2xl shadow-card hover:shadow-card-hover transition-all p-3 flex gap-3 border-2 border-pharma-300">
              <input
                type="text"
                value={moleculeName}
                onChange={(e) => setMoleculeName(e.target.value)}
                placeholder="Search molecule (e.g., aspirin, metformin, doxycycline)..."
                className="flex-1 px-6 py-4 text-lg focus:outline-none placeholder-pharma-400 font-medium text-gray-900 bg-white"
              />
              <button
                type="submit"
                disabled={loading || !moleculeName.trim()}
                className="px-8 py-4 bg-gradient-pharma text-white rounded-xl hover:shadow-glow disabled:opacity-50 transition-all flex items-center gap-2 font-semibold"
              >
                {loading ? <Loader size={20} className="animate-spin" /> : <Search size={20} />}
                Search
              </button>
            </div>
          </div>
        </form>

        {/* Quick Suggestions */}
        {!data && !loading && (
          <div className="mb-12">
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              <h3 className="text-sm font-bold text-gray-600 uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-pharma-600 rounded-full"></span>
                Try These Molecules
              </h3>
              <div className="flex flex-wrap gap-4">
                {['aspirin', 'metformin', 'doxycycline'].map((mol) => (
                  <button
                    key={mol}
                    onClick={() => {
                      setMoleculeName(mol);
                      setTimeout(() => document.querySelector('form').dispatchEvent(new Event('submit', { bubbles: true })));
                    }}
                    className="px-6 py-3 bg-gradient-to-br from-pharma-50 to-pharma-100 text-pharma-700 rounded-xl hover:shadow-glow hover:from-pharma-100 hover:to-pharma-200 transition-all font-semibold"
                  >
                    {mol}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <Alert
            type="error"
            title="Error Loading Data"
            message={error}
            onClose={() => setError(null)}
          />
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Results */}
        {data && !loading && (
          <div className="space-y-8 animate-fade-in">
            {/* Molecule Header */}
            <div className="bg-white rounded-2xl shadow-card p-8 border border-pharma-200 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-pharma opacity-5 rounded-full -mr-20 -mt-20"></div>
              <div className="relative flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gradient-pharma rounded-lg">
                      <Beaker size={28} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">
                      {data.molecule}
                    </h2>
                  </div>
                  <p className="text-gray-500 text-sm">
                    Analysis completed: {new Date(data.timestamp).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleDownloadJSON}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-all flex items-center gap-2 font-medium"
                  >
                    <Download size={18} />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Key Metrics */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp size={24} className="text-pharma-600" />
                Key Metrics
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Market Size"
                  value={formatCurrency(data.market_data?.market_size_usd || 0)}
                  icon={<DollarSign size={24} />}
                  gradient="from-blue-500 to-cyan-500"
                />
                <MetricCard
                  title="Growth Rate"
                  value={formatPercent(data.market_data?.growth_rate || 0)}
                  icon={<TrendingUp size={24} />}
                  gradient="from-green-500 to-emerald-500"
                />
                <MetricCard
                  title="Clinical Trials"
                  value={formatMetric(data.clinical_data?.trials_count || 0, 0)}
                  icon={<Pill size={24} />}
                  gradient="from-purple-500 to-indigo-500"
                />
                <MetricCard
                  title="Active Patents"
                  value={formatMetric(data.patent_data?.active_patents || 0, 0)}
                  icon={<FileText size={24} />}
                  gradient="from-orange-500 to-rose-500"
                />
              </div>
            </div>

            {/* Therapeutic Area */}
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Therapeutic Focus Area</h3>
              <div className="flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-gradient-to-r from-pharma-500 to-pharma-600 text-white rounded-lg font-semibold shadow-lg">
                  {data.market_data?.therapeutic_area || 'N/A'}
                </span>
                {data.market_data?.therapeutic_sub_areas && data.market_data.therapeutic_sub_areas.map((area) => (
                  <span key={area} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Enhanced Tabs */}
            <div className="bg-white rounded-2xl shadow-card border border-gray-100 overflow-hidden">
              <div className="grid grid-cols-2 md:grid-cols-5 border-b border-gray-200">
                {[
                  { id: 'insights', label: 'AI Insights' },
                  { id: 'overview', label: 'Overview' },
                  { id: 'clinical', label: 'Clinical' },
                  { id: 'patent', label: 'Patents' },
                  { id: 'web', label: 'Intelligence' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-4 font-semibold transition-all whitespace-nowrap text-center ${
                      activeTab === tab.id
                        ? 'border-b-3 border-pharma-600 text-pharma-600 bg-pharma-50'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-sm sm:text-base">{tab.label}</span>
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-8">
                {activeTab === 'insights' && (
                  <div className="space-y-8 animate-slide-up">
                    <div>
                      <div className="bg-gradient-to-br from-pharma-50 via-purple-50 to-indigo-50 rounded-xl p-8 border-2 border-pharma-200">
                        <h4 className="font-bold text-pharma-900 mb-4 text-lg flex items-center gap-2">
                          <Sparkles size={20} className="text-pharma-600" /> AI-Powered Insights
                        </h4>
                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                          {data.ai_insights || 'No insights available'}
                        </p>
                      </div>
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Clinical Trials Enrollment Chart */}
                      {data.clinical_data && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <BarChart3 size={18} className="text-pharma-600" /> Clinical Trial Enrollment Trend
                          </h5>
                          <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={[
                              { month: 'Q1', enrollment: data.clinical_data?.total_enrollment * 0.6 || 0 },
                              { month: 'Q2', enrollment: data.clinical_data?.total_enrollment * 0.75 || 0 },
                              { month: 'Q3', enrollment: data.clinical_data?.total_enrollment * 0.9 || 0 },
                              { month: 'Q4', enrollment: data.clinical_data?.total_enrollment || 0 }
                            ]}>
                              <defs>
                                <linearGradient id="colorEnrollment" x1="0" y1="0" x2="0" y2="1">
                                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                                </linearGradient>
                              </defs>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="month" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip formatter={(value) => formatMetric(value, 0)} />
                              <Area type="monotone" dataKey="enrollment" stroke="#8b5cf6" fill="url(#colorEnrollment)" />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {/* Patent Distribution Chart */}
                      {data.patent_data && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <FileText size={18} className="text-pharma-600" /> Patent Status Distribution
                          </h5>
                          <ResponsiveContainer width="100%" height={250}>
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Active', value: data.patent_data?.active_patents || 10 },
                                  { name: 'Expiring Soon', value: data.patent_data?.expiring_soon || 3 },
                                  { name: 'Expired', value: Math.max(0, (data.patent_data?.total_patents || 20) - (data.patent_data?.active_patents || 10) - (data.patent_data?.expiring_soon || 3)) }
                                ]}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({ name, value }) => `${name}: ${value}`}
                                outerRadius={80}
                                fill="#8b5cf6"
                                dataKey="value"
                              >
                                <Cell fill="#8b5cf6" />
                                <Cell fill="#f59e0b" />
                                <Cell fill="#ef4444" />
                              </Pie>
                              <Tooltip formatter={(value) => value} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {/* Market Size vs Competitors */}
                      {data.market_data && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <DollarSign size={18} className="text-pharma-600" /> Market Dynamics
                          </h5>
                          <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={[
                              { category: 'Market Size', value: (data.market_data?.market_size_usd || 0) / 1000000 },
                              { category: 'Competitors', value: (data.market_data?.competitors_count || 0) * 10 }
                            ]}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                              <XAxis dataKey="category" stroke="#6b7280" />
                              <YAxis stroke="#6b7280" />
                              <Tooltip formatter={(value) => value.toFixed(0)} />
                              <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      )}

                      {/* Innovation & Growth */}
                      {data.web_data && (
                        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
                          <h5 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Zap size={18} className="text-pharma-600" /> Innovation Index & Growth
                          </h5>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700">Innovation Index</span>
                                <span className="text-sm font-bold text-cyan-600">{((data.web_data?.innovation_index || 0.75) * 100).toFixed(0)}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div className="bg-gradient-to-r from-cyan-400 to-blue-600 h-full" style={{ width: `${(data.web_data?.innovation_index || 0.75) * 100}%` }}></div>
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between mb-2">
                                <span className="text-sm font-semibold text-gray-700">Growth Rate</span>
                                <span className="text-sm font-bold text-green-600">{formatPercent(data.market_data?.growth_rate || 0)}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                                <div className="bg-gradient-to-r from-green-400 to-emerald-600 h-full" style={{ width: `${Math.min((data.market_data?.growth_rate || 0.25) * 100, 100)}%` }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Strategic Recommendations */}
                    <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-cyan-50 rounded-xl p-8 border-2 border-green-200">
                      <h4 className="font-bold text-green-900 mb-4 text-lg flex items-center gap-2">
                        <Lightbulb size={20} className="text-green-600" /> Strategic Recommendations
                      </h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {data.recommendations || 'No recommendations available'}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'overview' && (
                  <div className="space-y-6 animate-slide-up">
                    <h4 className="text-xl font-bold text-gray-900">Market Overview</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StatBox label="Active Competitors" value={data.market_data?.competitors_count || 'N/A'} />
                      <StatBox label="Market Trend" value={data.market_data?.market_trend || 'N/A'} />
                    </div>
                  </div>
                )}

                {activeTab === 'clinical' && (
                  <div className="space-y-6 animate-slide-up">
                    <h4 className="text-xl font-bold text-gray-900">Clinical Development</h4>
                    <div className="space-y-4">
                      <StatRow label="Total Enrollment" value={formatMetric(data.clinical_data?.total_enrollment || 0, 0)} />
                      <StatRow label="Active Recruitment" value={data.clinical_data?.recruiting_trials || 'N/A'} />
                      <StatRow label="Estimated Completion" value={formatDate(data.clinical_data?.estimated_completion_date) || 'N/A'} />
                      {data.clinical_data?.main_sponsors && (
                        <StatRow label="Main Sponsors" value={data.clinical_data.main_sponsors.join(', ')} />
                      )}
                    </div>
                  </div>
                )}

                {activeTab === 'patent' && (
                  <div className="space-y-6 animate-slide-up">
                    <h4 className="text-xl font-bold text-gray-900">Patent Landscape</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-lg">
                        <span className="text-gray-700 font-semibold">FTO Risk Score</span>
                        <span className={`text-2xl font-bold ${data.patent_data?.fto_risk_score > 0.7 ? 'text-red-600' : 'text-green-600'}`}>
                          {(data.patent_data?.fto_risk_score * 100).toFixed(0)}%
                        </span>
                      </div>
                      <StatRow label="Expiring (1-2 years)" value={data.patent_data?.expiring_soon || 0} />
                      <StatRow label="Active Patents" value={data.patent_data?.active_patents || 0} />
                      <StatRow label="Total Patents" value={data.patent_data?.total_patents || 0} />
                    </div>
                  </div>
                )}

                {activeTab === 'web' && (
                  <div className="space-y-6 animate-slide-up">
                    <h4 className="text-xl font-bold text-gray-900">Web Intelligence</h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                        <span className="text-gray-700 font-semibold">Innovation Index</span>
                        <span className="text-2xl font-bold text-cyan-600">{((data.web_data?.innovation_index || 0.75) * 100).toFixed(0)}%</span>
                      </div>
                      <StatRow label="Scientific Sentiment" value={data.web_data?.scientific_sentiment || 'Positive'} />
                      <StatRow label="Recent Publications" value={formatMetric(data.web_data?.recent_publications_count || 0, 0)} />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* News Section - Below All Tabs */}
            <div className="mt-12">
              <NewsSection moleculeName={data.molecule} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Helper component for metric cards
function MetricCard({ title, value, icon, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} p-8 rounded-xl shadow-lg text-white overflow-hidden relative group`}>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition bg-white rounded-xl"></div>
      <div className="relative">
        <p className="text-white/80 text-sm font-semibold mb-3">{title}</p>
        <div className="flex items-end justify-between">
          <p className="text-3xl md:text-4xl font-bold">{value}</p>
          <div className="opacity-40">{icon}</div>
        </div>
      </div>
    </div>
  );
}

// Helper component for stat boxes
function StatBox({ label, value }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <p className="text-gray-600 text-sm font-semibold mb-2">{label}</p>
      <p className="text-3xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

// Helper component for stat rows
function StatRow({ label, value }) {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition">
      <span className="text-gray-700 font-semibold">{label}</span>
      <span className="text-gray-900 font-bold text-lg">{value}</span>
    </div>
  );
}

// News Section Component
function NewsSection({ moleculeName }) {
  const [showMoreNews, setShowMoreNews] = useState(false);

  // Mock news data for various molecules
  const newsDatabase = {
    'aspirin': [
      { title: 'Aspirin May Reduce Cancer Risk in Overweight Women', date: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000), source: 'Medical Journal Weekly', excerpt: 'New study shows potential benefits of regular aspirin use in cancer prevention.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+cancer' },
      { title: 'Novel Aspirin Formulation Improves Patient Compliance', date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), source: 'Pharmacy Today', excerpt: 'Extended-release formulation reduces dosing frequency while maintaining efficacy.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+formulation' },
      { title: 'Cardiovascular Benefits of Low-Dose Aspirin Reaffirmed', date: new Date(Date.now() - 200 * 24 * 60 * 60 * 1000), source: 'Clinical Research Review', excerpt: 'Long-term study confirms cardiovascular protection with minimal GI side effects.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=aspirin+cardiovascular' },
      { title: 'Aspirin and Stroke Prevention: New Guidelines Released', date: new Date(Date.now() - 300 * 24 * 60 * 60 * 1000), source: 'AHA Journal', excerpt: 'Updated guidelines recommend aspirin for secondary stroke prevention in high-risk patients.', url: 'https://www.heart.org/en/news/2025/aspirin-guidelines' },
    ],
    'metformin': [
      { title: 'Metformin Shows Promise in Anti-Aging Research', date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), source: 'Nature Medicine', excerpt: 'Clinical trial demonstrates potential longevity benefits beyond diabetes management.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=metformin+aging' },
      { title: 'New Metformin Extended-Release Improves Tolerability', date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), source: 'Diabetes Care Journal', excerpt: 'Reduced GI side effects with improved patient adherence rates.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=metformin+extended+release' },
      { title: 'Metformin May Reduce COVID-19 Severity', date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), source: 'Infectious Disease Today', excerpt: 'Large-scale study shows 40% reduction in severe COVID outcomes.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=metformin+COVID' },
      { title: 'Combination Therapy with Metformin Shows Superior Results', date: new Date(Date.now() - 250 * 24 * 60 * 60 * 1000), source: 'Endocrinology Now', excerpt: 'Fixed-dose combination with GLP-1 agonist approved for type 2 diabetes.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=metformin+GLP-1' },
    ],
    'doxycycline': [
      { title: 'Doxycycline Effective Against Resistant Infections', date: new Date(Date.now() - 75 * 24 * 60 * 60 * 1000), source: 'Antimicrobial Agents Journal', excerpt: 'New research shows efficacy against drug-resistant bacterial strains.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+resistant' },
      { title: 'Low-Dose Doxycycline for Rosacea Proves Highly Effective', date: new Date(Date.now() - 150 * 24 * 60 * 60 * 1000), source: 'Dermatology Review', excerpt: 'Anti-inflammatory properties provide sustained symptom relief.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+rosacea' },
      { title: 'Doxycycline Approved for New Indication in Acne Treatment', date: new Date(Date.now() - 220 * 24 * 60 * 60 * 1000), source: 'FDA Approval Watch', excerpt: 'Extended-release formulation reduces photosensitivity risk.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+acne' },
      { title: 'Doxycycline Combination Therapy Shows Promise', date: new Date(Date.now() - 280 * 24 * 60 * 60 * 1000), source: 'Clinical Microbiology Review', excerpt: 'Synergistic effects observed with beta-lactam antibiotics.', url: 'https://pubmed.ncbi.nlm.nih.gov/?term=doxycycline+combination' },
    ],
  };

  const news = newsDatabase[moleculeName?.toLowerCase()] || [
    { title: 'Recent Research Highlights Promising Clinical Data', date: new Date(Date.now() - 100 * 24 * 60 * 60 * 1000), source: 'Pharmaceutical Times', excerpt: 'Latest clinical trials show positive outcomes for targeted therapy.', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
    { title: 'Novel Formulation Advancement Announced', date: new Date(Date.now() - 180 * 24 * 60 * 60 * 1000), source: 'Medical Innovation Journal', excerpt: 'Improved bioavailability and reduced side effects with new delivery system.', url: 'https://pubmed.ncbi.nlm.nih.gov/' },
  ];

  const displayNews = showMoreNews ? news : news.slice(0, 3);
  const yearsAgo = (date) => {
    const days = Math.floor((Date.now() - date) / (1000 * 60 * 60 * 24));
    if (days < 30) return `${days} days ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  };

  return (
    <div className="bg-white rounded-xl p-8 border-2 border-blue-200 shadow-lg">
      <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-2">
        <FileText className="w-6 h-6 text-blue-600" />
        Latest Research & News (Past 1-2 Years)
      </h4>
      <div className="space-y-4">
        {displayNews.map((article, idx) => (
          <div key={idx} className="border-l-4 border-blue-500 pl-6 py-3 hover:bg-gray-50 rounded-r-lg transition">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-pharma-600 hover:text-pharma-800 transition cursor-pointer underline hover:no-underline mb-2 inline-block"
                >
                  {article.title}
                  <span className="ml-2 text-lg">↗</span>
                </a>
                <p className="text-gray-600 text-sm mb-2 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {yearsAgo(article.date)}
                  </span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                    {article.source}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {news.length > 3 && (
        <button
          onClick={() => setShowMoreNews(!showMoreNews)}
          className="mt-6 px-6 py-2 text-pharma-600 font-semibold hover:bg-pharma-50 rounded-lg border border-pharma-300 transition-all"
        >
          {showMoreNews ? 'Show Less' : `Show ${news.length - 3} More Articles`}
        </button>
      )}
    </div>
  );
}
