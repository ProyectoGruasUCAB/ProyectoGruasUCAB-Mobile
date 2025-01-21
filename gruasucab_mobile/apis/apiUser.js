import { apiClient } from './api'

export const updateUserData = async (userData) => {
    try {
      const response = await apiClient.put('/User/UpdateUserData', userData);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
      console.error('Error al actualizar los datos del usuario:', error);
      throw error;
    }
  };