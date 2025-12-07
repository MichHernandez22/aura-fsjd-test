import api, { LoginRequest, RegisterRequest, AuthResponse, ApiResponse } from './api';

class AuthService {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', credentials);
    const { data } = response.data;
    
    localStorage.setItem('aura_token', data.token);
    localStorage.setItem('aura_user', JSON.stringify(data.user));
    
    return data;
  }

  async register(userData: RegisterRequest): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/register', userData);
    const { data } = response.data;
    
    localStorage.setItem('aura_token', data.token);
    localStorage.setItem('aura_user', JSON.stringify(data.user));
    
    return data;
  }

  logout(): void {
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
  }

  getCurrentUser(): any {
    const userStr = localStorage.getItem('aura_user');
    return userStr ? JSON.parse(userStr) : null;
  }

  getToken(): string | null {
    return localStorage.getItem('aura_token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export default new AuthService();