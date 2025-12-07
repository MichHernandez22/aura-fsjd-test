import api, { User, UpdateProfileRequest, ApiResponse } from './api';

class UsersService {
  async getProfile(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/users/profile');
    return response.data.data;
  }

  async updateProfile(data: UpdateProfileRequest): Promise<User> {
    const response = await api.put<ApiResponse<User>>('/users/profile', data);
    const updatedUser = response.data.data;
    
    localStorage.setItem('aura_user', JSON.stringify(updatedUser));
    return updatedUser;
  }

  async getAllUsers(): Promise<User[]> {
    const response = await api.get<ApiResponse<User[]>>('/users');
    return response.data.data;
  }
}

export default new UsersService();