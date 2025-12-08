/// <reference types="vite/client" />

import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

// Tipos basados en la API del backend
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest extends LoginRequest {
  firstName: string;
  lastName: string;
}

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

export interface AuthResponse {
  user: User;
  token: string;
}

const getApiBaseUrl = () => {
  // 1. Prioridad: Variable de entorno VITE_API_URL (configurada en Vercel/Railway)
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  // 2. Si estamos en desarrollo, usar localhost
  if (import.meta.env.DEV) {
    return 'http://localhost:3000/api';
  }
  
  // 3. En producción sin variable definida, intentar inferir
  // Si el frontend está en Vercel y backend en Railway, necesitarás configurar VITE_API_URL
  console.warn('⚠️ VITE_API_URL no está definida. Usando URL relativa como fallback.');
  return '/api'; // Fallback a URL relativa
};

const API_BASE_URL = getApiBaseUrl();

// Configuración de Axios
const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('aura_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para respuestas
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aura_token');
      localStorage.removeItem('aura_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;