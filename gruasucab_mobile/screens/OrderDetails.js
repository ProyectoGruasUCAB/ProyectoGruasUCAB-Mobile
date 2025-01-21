import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles de la Orden de Servicio</Text>
      <Text>Información de la orden...</Text>
      {/* Puedes agregar más detalles aquí */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default OrderDetails;
