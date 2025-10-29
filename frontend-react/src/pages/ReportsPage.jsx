import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, Download, Loader, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, token, isAuthenticated } = useAuth();

  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    fetchReports();
  }, [isAuthenticated]);

  const fetchReports = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${API_BASE}/api/reports/user-reports`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to fetch reports');
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (reportId) => {
    if (!window.confirm('Are you sure you want to delete this report?')) return;

    try {
      await axios.delete(`${API_BASE}/api/reports/${reportId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReports(reports.filter((r) => r._id !== reportId));
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to delete report');
    }
  };

  const handleView = (reportId) => {
    navigate(`/report/${reportId}`, { state: { from: 'reports' } });
  };

  const handleDownload = (report) => {
    const dataStr = JSON.stringify(report.data, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);

    const exportFileDefaultName = `${report.molecule_name}_report_${new Date().toISOString().split('T')[0]}.json`;

    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-pharma-50 pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Reports</h1>
          <p className="text-gray-600">View and manage your saved analysis reports</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
            <AlertCircle size={20} className="text-red-600" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader size={32} className="text-pharma-600 animate-spin" />
          </div>
        )}

        {/* Empty State */}
        {!loading && reports.length === 0 && !error && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No reports yet</h3>
            <p className="text-gray-600 mb-6">Create your first analysis to save it here</p>
            <button
              onClick={() => navigate('/search')}
              className="px-6 py-3 bg-gradient-pharma text-white font-semibold rounded-lg hover:shadow-glow-lg transition"
            >
              Start Analysis
            </button>
          </div>
        )}

        {/* Reports Grid */}
        {!loading && reports.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports.map((report) => (
              <div
                key={report._id}
                className="bg-white rounded-xl shadow-card border border-gray-200 hover:shadow-lg transition-all overflow-hidden group"
              >
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 mb-2 truncate group-hover:text-pharma-600 transition">
                    {report.molecule_name}
                  </h3>

                  {/* Date */}
                  <p className="text-sm text-gray-500 mb-4">
                    Created: {new Date(report.created_at).toLocaleDateString()}
                  </p>

                  {/* Info */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-pharma-600">Data points:</span> {Object.keys(report.data).length}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3">
                    <button
                      onClick={() => handleView(report._id)}
                      className="flex-1 py-2 px-4 bg-pharma-100 text-pharma-700 rounded-lg hover:bg-pharma-200 transition font-medium flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye size={16} />
                      View
                    </button>
                    <button
                      onClick={() => handleDownload(report)}
                      className="flex-1 py-2 px-4 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium flex items-center justify-center gap-2 text-sm"
                    >
                      <Download size={16} />
                      Download
                    </button>
                    <button
                      onClick={() => handleDelete(report._id)}
                      className="py-2 px-4 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
