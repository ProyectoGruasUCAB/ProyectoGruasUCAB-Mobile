import React from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

const MapComponent = () => {
  const initialRegion = {
    latitude: 10.48801,
    longitude: -66.87919,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const mapStyle = [
    
    {
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }], // Oculta íconos de etiquetas
    },
    {
      elementType: 'labels.text.fill',
      stylers: [{ visibility: 'off' }], // Oculta el relleno de texto de las etiquetas
    },
    {
      featureType: 'road',
      elementType: 'geometry',
      stylers: [{ visibility: 'on' }, { color: '#ffffff' }], // Muestra solo las geometrías de las calles en blanco
    },
    {
      featureType: 'road',
      elementType: 'labels.text.stroke',
      stylers: [{ visibility: 'on' }, { color: '#000000' }], // Añade un contorno negro al texto de las calles para mejor contraste
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        { visibility: 'on' },
        { color: '#e5e5e5' }, // Set background color to gray
      ],
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
    width: 400, // Adjust width as needed
  },
});

export default MapComponent;