import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_BASE_URL = 'http://10.0.2.2:5144';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete apiClient.defaults.headers.common['Authorization'];
  }
};



export const login = async (userEmail, password) => {
    try {
      const response = await apiClient.post('/Auth/Login', {
        userEmail,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        if (error.response.status === 401) {
          console.error('Login failed: Invalid credentials');
          throw new Error('Invalid email or password');
        } else if (error.response.data === "Unauthorized access: Account is not fully set up") {
          throw error;
        } else {
          console.error('Error during login:', error.response.data);
          throw new Error('An error occurred during login');
        }
      } else {
        console.error('Error during login:', error);
        throw new Error('An error occurred during login');
      }
    }
  };

  export const refreshToken = async () => {
    try {
      
      const refreshToken = AsyncStorage.getItem('refreshToken');
      console.log(refreshToken);
      const userEmail = AsyncStorage.getItem('userEmail');
      console.log(userEmail);
  
      const response = await apiClient.post('/Auth/RefreshToken', { userEmail: userEmail, refreshToken: refreshToken});
  
      if (response.status === 200) {
        const { accessToken, refreshToken: newRefreshToken } = response.data;
        AsyncStorage.setItem('authToken', accessToken);
        AsyncStorage.setItem('refreshToken', newRefreshToken);
        setAuthToken(accessToken);
        console.log('Token actualizado con éxito.');
      } else {
        console.error('Error al actualizar el token:', response.status);
      }
    } catch (error) {
      console.error('Error al actualizar el token:', error);
    }
  };

  export const changePassword = async (userEmail, newPassword) => {

    try {
      const response = await apiClient.put(`/Auth/ChangePassword`, { userEmail: userEmail, newPassword: newPassword });
      
      if (response.status === 200) {
        console.log('Contraseña cambiada con éxito.');
      } else {
        console.error('Error al cambiar la contraseña:', response.status);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };
  
  export const forgotPassword = async (userEmail) => {
    try {
      const response = await apiClient.post('/Auth/RecoverPassword', {
        userEmail: userEmail
      });
  
      if (response.status === 200) {
        console.log('Correo enviado con éxito.');
      } else {
        console.error('Error al enviar el correo:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };
  
  export const logout = async (userEmail, refreshToken) => {
    try {
      const response = await apiClient.post('/Auth/Logout', {
        userEmail,
        refreshToken,
      });
  
      if (response.status === 200) {
        console.log('Sesión cerrada con éxito.');
      } else {
        console.error('Error al cerrar la sesión:', response.status);
      }
    } catch (error) {
      console.error('Error al cerrar la sesión:', error);
    }
  }

  export const handleIncompleteAccount = async (userEmail, password, newPassword) => {
    try {
      console.log("Entro a handleIncompleteAccount");
      const response = await apiClient.post('/Auth/HandleIncompleteAccount', {
        userEmail,
        password,
        newPassword
      });
  
      if (response.status === 200) {
        console.log('Cuenta incompleta reestablecida con éxito.');
        return response.data;
      } else {
        console.error('Error al reestablecer la cuenta incompleta:', response.status);
        throw new Error('Error al actualizar la contraseña.');
      }
    } catch (error) {
      console.log("El error en handleIncompleteAccount");
      console.error('Error al reestablecer la cuenta incompleta:', error);
      throw error;
    }
  };
  
  export const recordUserData = async (user) => {
    try {
      const response = await apiClient.post('/User/RecordUserData', user);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
        throw error; 
    }
  };

  export const getDriverById = async (userId) => {
    try {
      const response = await apiClient.get(`/User/GetDriverById/${userId}`);
      if (response.status === 200) {
        return response.data;
      }
    } catch (error) {
        throw error; 
    }
  };

  export const getAllSuppliers = async () => {
    try {
        const response = await apiClient.get('/Supplier/GetAllSuppliers');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los proveedores:', error);
        throw error;
    }
}

export default apiClient;
