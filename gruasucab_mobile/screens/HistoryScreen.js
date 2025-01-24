import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { getServiceOrderByDriverId, setAuthToken } from '../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderHistoryScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = await AsyncStorage.getItem('authToken');
        await setAuthToken(token);
        const driverId = await AsyncStorage.getItem('userID');
        const orderData = await getServiceOrderByDriverId(driverId);
        setOrders(orderData.serviceOrders);
        console.log(orders);
      } catch (error) {
        console.error('Error al cargar las órdenes:', error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Órdenes</Text>
      <ScrollView>
        {orders.map((item) => (
          <View key={item.serviceOrderId} style={styles.orderItem}>
            <Text style={styles.orderText}>Orden ID: {item.serviceOrderId}</Text>
            <Text style={styles.orderText}>Descripción: {item.statusServiceOrder}</Text>
            <Text style={styles.orderText}>Costo del incidente: {item.incidentCost}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  orderItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  orderText: {
    fontSize: 16,
  },
});

export default OrderHistoryScreen;