import React from 'react';
import { Button } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import ServiceScreen from './ServiceScreen';
import ProfileScreen from './ProfileScreen';
import HistoryScreen from './HistoryScreen';
import { logout } from '../apis/api'; // Importa la función logout
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation(); // Usa useNavigation para navegar

  const handleLogout = async () => {
    try {
      const userEmail =  await AsyncStorage.getItem('userEmail');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      await logout(userEmail, refreshToken);
      navigation.navigate('Login');
    } catch (error) {
      alert('Error al cerrar sesión');
    }
  };

  return (
    <Drawer.Navigator initialRouteName="Servicio" screenOptions={{
      drawerActiveTintColor: "green",
    }}>
      <Drawer.Screen name="Servicio" component={ServiceScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Historial" component={HistoryScreen} />
      <Drawer.Screen name="Logout" component={() => null}
        options={{
          drawerLabel: () => (
            <Button title="Logout" onPress={handleLogout} />
          ),
        }}/>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
