import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapContainer from './MapContainer';
import OrderDetails from './OrderDetails';

const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <MapContainer />
      <OrderDetails />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ServiceScreen;
