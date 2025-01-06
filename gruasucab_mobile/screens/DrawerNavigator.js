import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import ServiceScreen from './ServiceScreen'; // Asegúrate de ajustar la importación según tu estructura de archivos
import ProfileScreen from './ProfileScreen'; // Crea una pantalla de perfil
import HistoryScreen from './HistoryScreen'; // Crea una pantalla de historial

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (   
      <Drawer.Navigator initialRouteName="Servicio" screenOptions={{
        drawerActiveTintColor: "green",
      }}>
        <Drawer.Screen name="Servicio" component={ServiceScreen} />
        <Drawer.Screen name="Perfil" component={ProfileScreen}/>
        <Drawer.Screen name="Historial" component={HistoryScreen} />
      </Drawer.Navigator>
  );
};

export default DrawerNavigator;
