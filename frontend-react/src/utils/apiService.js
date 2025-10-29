import axios from 'axios';
import { API_BASE_URL, API_ENDPOINTS } from './config';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const apiService = {
  queryMolecule: async (moleculeName) => {
    const response = await apiClient.get(`${API_ENDPOINTS.queryMolecule}/${moleculeName}`);
    return response.data;
  },

  getTrends: async () => {
    const response = await apiClient.get(API_ENDPOINTS.getTrends);
    return response.data;
  },

  generateReport: async (moleculeName, data) => {
    const response = await apiClient.post(API_ENDPOINTS.generateReport, {
      molecule_name: moleculeName,
      analysis_data: data,
    });
    return response.data;
  },

  generateReportPdf: async (moleculeName, data) => {
    const response = await apiClient.post(API_ENDPOINTS.generateReportPdf, {
      molecule_name: moleculeName,
      analysis_data: data,
    }, {
      responseType: 'blob',
    });
    return response.data;
  },

  batchAnalyze: async (molecules) => {
    const response = await apiClient.post(API_ENDPOINTS.batchAnalyze, {
      molecules: molecules,
    });
    return response.data;
  },

  checkHealth: async () => {
    const response = await apiClient.get(API_ENDPOINTS.health);
    return response.data;
  },
};

export default apiClient;
