import React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapContainer = ({ orderData, onAcceptOrder }) => {
  const initialRegion = {
    latitude: 10.48801,
    longitude: -66.87919,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapStyle = [
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ color: '#ffffff' }],
    },
    {
      elementType: 'labels.text.stroke',
      stylers: [{ color: '#000000' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ color: '#ffffff' }],
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#000000' }],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [{ color: '#e5e5e5' }],
    },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        provider={PROVIDER_GOOGLE}
        customMapStyle={mapStyle}
      />
      <View style={styles.orderDetails}>
        <Text style={styles.title}>Nueva Orden de Servicio</Text>
        <Text style={styles.text}>{orderData.body}</Text>
        <Button title="Aceptar Orden" onPress={onAcceptOrder} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    height: '70%', // Adjust the height to leave space for OrderDetails
    width: '100%', // Ensure the map takes full width of the container
  },
  orderDetails: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default MapContainer;
