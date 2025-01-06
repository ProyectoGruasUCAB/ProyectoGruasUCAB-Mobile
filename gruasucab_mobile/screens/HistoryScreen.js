import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const OrderHistoryScreen = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Órdenes</Text>
      
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

});

export default OrderHistoryScreen;