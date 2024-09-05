import axios from "axios";

export const farmersAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/farmers`,
});

export const dashboardAPI = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/dashboard`,
});
