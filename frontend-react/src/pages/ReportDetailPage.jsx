import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Download, Share2, Loader, AlertCircle, Copy, Check } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import axios from 'axios';

export default function ReportDetailPage() {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { token, isAuthenticated } = useAuth();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchReport();
  }, [isAuthenticated, reportId]);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReport(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch report');
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadJSON = () => {
    if (!report) return;
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${report.molecule_name}_report_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
  };

  const handleCopyJSON = () => {
    if (!report) return;
    const dataStr = JSON.stringify(report.data, null, 2);
    navigator.clipboard.writeText(dataStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pharma-50 pt-24 pb-12 px-4 flex items-center justify-center">
        <Loader size={48} className="text-pharma-600 animate-spin" />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pharma-50 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/reports')}
            className="mb-6 flex items-center gap-2 text-pharma-600 hover:text-pharma-700 font-semibold"
          >
            <ArrowLeft size={20} />
            Back to Reports
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
            <AlertCircle size={24} className="text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 mb-1">Error Loading Report</h3>
              <p className="text-red-700">{error || 'Report not found'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const marketData = report.data?.market_data || {};
  const clinicalData = report.data?.clinical_data || {};
  const patentData = report.data?.patent_data || {};

  // Chart data
  const regionalData = marketData.regional_breakdown ? 
    Object.entries(marketData.regional_breakdown).map(([region, value]) => ({
      name: region,
      value: value
    })) : [];

  const competitorData = marketData.competitors ? 
    marketData.competitors.map((name, index) => ({
      name: name,
      marketShare: Math.random() * 20
    })) : [];

  const trialPhases = clinicalData.trial_phases_breakdown ? 
    Object.entries(clinicalData.trial_phases_breakdown).map(([phase, count]) => ({
      name: phase,
      value: count
    })) : [];

  const COLORS = ['#0ea5e9', '#06b6d4', '#14b8a6', '#10b981', '#84cc16', '#fbbf24', '#f97316', '#ef4444'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pharma-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(location.state?.from === 'reports' ? '/reports' : '/search')}
          className="mb-8 flex items-center gap-2 text-pharma-600 hover:text-pharma-700 font-semibold transition"
        >
          <ArrowLeft size={20} />
          Back to {location.state?.from === 'reports' ? 'Reports' : 'Search'}
        </button>

        {/* Header */}
        <div className="bg-white rounded-2xl shadow-card p-8 border border-pharma-200 mb-8">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                {report.molecule_name}
              </h1>
              <p className="text-gray-600">
                Report created: {new Date(report.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleCopyJSON}
                className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 font-medium ${
                  copied
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
                title="Copy JSON to clipboard"
              >
                {copied ? (
                  <>
                    <Check size={18} />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={18} />
                    Copy JSON
                  </>
                )}
              </button>
              <button
                onClick={handleDownloadJSON}
                className="px-4 py-2 bg-pharma-100 hover:bg-pharma-200 text-pharma-700 rounded-lg transition-all flex items-center gap-2 font-medium"
              >
                <Download size={18} />
                Download
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Market Size"
            value={`$${((marketData.market_size_usd || 0) / 1e9).toFixed(2)}B`}
            subtitle="USD"
          />
          <MetricCard
            title="Growth Rate"
            value={`${(marketData.growth_rate || 0).toFixed(1)}%`}
            subtitle="CAGR"
          />
          <MetricCard
            title="Clinical Trials"
            value={clinicalData.trials_count || 0}
            subtitle="Active"
          />
          <MetricCard
            title="Patents"
            value={patentData.active_patents || 0}
            subtitle="Active"
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Market by Region */}
          {regionalData.length > 0 && (
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Market by Region</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={regionalData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Trial Phases */}
          {trialPhases.length > 0 && (
            <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-6">Trial Phases Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={trialPhases}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {trialPhases.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* AI Insights */}
        {report.data?.ai_insights && (
          <div className="bg-gradient-to-br from-pharma-50 via-purple-50 to-indigo-50 rounded-2xl shadow-card p-8 border-2 border-pharma-200 mb-8">
            <h3 className="text-xl font-bold text-pharma-900 mb-4">AI-Powered Insights</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {report.data.ai_insights}
            </p>
          </div>
        )}

        {/* Recommendations */}
        {report.data?.recommendations && (
          <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-2xl shadow-card p-8 border-2 border-green-200">
            <h3 className="text-xl font-bold text-green-900 mb-4">Strategic Recommendations</h3>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {report.data.recommendations}
            </p>
          </div>
        )}

        {/* Therapeutic Area */}
        {marketData.therapeutic_area && (
          <div className="bg-white rounded-2xl shadow-card p-8 border border-gray-100 mt-8">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Therapeutic Focus</h3>
            <div className="flex flex-wrap gap-3">
              <span className="px-4 py-2 bg-gradient-to-r from-pharma-500 to-pharma-600 text-white rounded-lg font-semibold">
                {marketData.therapeutic_area}
              </span>
              {marketData.therapeutic_sub_areas && marketData.therapeutic_sub_areas.map((area) => (
                <span key={area} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium">
                  {area}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MetricCard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 border border-gray-100 hover:shadow-lg transition">
      <p className="text-gray-600 text-sm font-semibold uppercase tracking-wide mb-2">{title}</p>
      <p className="text-3xl font-bold text-pharma-600 mb-1">{value}</p>
      {subtitle && <p className="text-gray-500 text-xs">{subtitle}</p>}
    </div>
  );
}
