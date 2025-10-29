/**
 * Utility functions for formatting data
 */

/**
 * Format large numbers to M (millions) or B (billions)
 * @param {number} value - The number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} Formatted string like "2.1B", "450M", "1.2T"
 */
export const formatMetric = (value, decimals = 1) => {
  if (!value || value === 0) return '0';
  
  const abs = Math.abs(value);
  
  if (abs >= 1e12) {
    return (value / 1e12).toFixed(decimals) + 'T';
  }
  if (abs >= 1e9) {
    return (value / 1e9).toFixed(decimals) + 'B';
  }
  if (abs >= 1e6) {
    return (value / 1e6).toFixed(decimals) + 'M';
  }
  if (abs >= 1e3) {
    return (value / 1e3).toFixed(decimals) + 'K';
  }
  
  return value.toFixed(decimals);
};

/**
 * Format percentage values
 * @param {number} value - The decimal value (e.g., 0.05 for 5%)
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage string
 */
export const formatPercent = (value, decimals = 1) => {
  if (!value) return '0%';
  return ((value * 100).toFixed(decimals)) + '%';
};

/**
 * Format currency values
 * @param {number} value - The amount
 * @param {string} currency - Currency code (default: USD)
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (value, currency = 'USD') => {
  if (!value) return `$0`;
  
  const formatted = formatMetric(value);
  const symbol = currency === 'USD' ? '$' : currency;
  
  return `${symbol}${formatted}`;
};

/**
 * Format date to readable format
 * @param {string} dateString - ISO date string
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  try {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return dateString;
  }
};

/**
 * Format trial enrollment numbers
 * @param {number} value - Enrollment count
 * @returns {string} Formatted enrollment
 */
export const formatEnrollment = (value) => {
  if (!value) return '0';
  return formatMetric(value, 0);
};
