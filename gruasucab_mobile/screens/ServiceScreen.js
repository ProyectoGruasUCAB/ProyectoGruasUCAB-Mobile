import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapContainer from './MapContainer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getServiceOrderByDriverId, setAuthToken } from '../apis/api';

const ServiceScreen = () => {
  const [orders, setOrders] = useState([]);
  const [actualOrder, setActualOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        await setAuthToken(token);
        const driverId = await AsyncStorage.getItem('userID');
        const orderData = await getServiceOrderByDriverId(driverId);
        setOrders(orderData.serviceOrders);

        // Filtra la orden con statusServiceOrder igual a 'PorAceptar'
        const orderToAccept = orders.find(order => order.statusServiceOrder === 'PorAceptado');
        setActualOrder(orderToAccept);
        console.log(orderToAccept);
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
    <View style={styles.content}>
      {actualOrder ? (
        <MapContainer order={actualOrder} />
      ) : (
        <Text style={styles.noOrderText}>No hay órdenes por aceptar</Text>
      )}
    </View>
  </View>
  );
};

const styles = StyleSheet.create({
  title: { 
    fontSize: 30, // Ajusta el tamaño según tus preferencias
    fontWeight: 'bold', 
    textAlign: 'left', // Justifica el texto a la izquierda
    flexGrow: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f0f0f0',
  },
  optionsButton: {
    padding: 10,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ServiceScreen;