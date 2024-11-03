const { VITE_API_URL: API_URL } = import.meta.env;

export const isBackedEnabled = !!API_URL;
