const API_BASE_URL = import.meta.env.VITE_API_URL
  || (import.meta.env.PROD ? 'https://fyp-backend-cg9b.onrender.com/api' : '/api');

export const getBackendOrigin = () => {
  if (/^https?:\/\//i.test(API_BASE_URL)) {
    return API_BASE_URL.replace(/\/api\/?$/i, '');
  }
  return 'http://localhost:5001';
};

export const buildBackendUrl = (path) => {
  if (!path) return '';
  if (/^https?:\/\//i.test(path) || path.startsWith('data:image')) {
    return path;
  }
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getBackendOrigin()}${normalizedPath}`;
};

export const buildProgressReportFileLink = (fileUrl) => {
  if (!fileUrl) return '';
  if (/^https?:\/\//i.test(fileUrl)) {
    return fileUrl;
  }
  if (fileUrl.startsWith('/uploads/')) {
    return buildBackendUrl(fileUrl);
  }
  return buildBackendUrl(`/uploads/progress-reports/${fileUrl}`);
};
