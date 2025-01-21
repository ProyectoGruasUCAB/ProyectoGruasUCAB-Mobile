// OrderNotification.js
import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import MapContainer from './MapContainer';

const OrderNotification = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [orderData, setOrderData] = useState(route.params?.orderData || null);

  useEffect(() => {
    if (route.params?.orderData) {
      setOrderData(route.params.orderData);
    }
  }, [route.params?.orderData]);

  const handleAcceptOrder = () => {
    if (orderData) {
      Alert.alert('Orden aceptada', `Has aceptado la orden: ${orderData.body}`);
      // Aquí puedes agregar la lógica para manejar la aceptación de la orden
      setOrderData(null); // Limpia la orden después de aceptarla
      navigation.goBack(); // Regresa a la pantalla anterior
    }
  };

  return (
    <MapContainer 
      orderData={orderData} 
      onAcceptOrder={handleAcceptOrder} 
    />
  );
};

export default OrderNotification;
