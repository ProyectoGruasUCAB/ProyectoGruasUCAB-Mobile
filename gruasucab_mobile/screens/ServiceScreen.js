import React from 'react';
import { View, StyleSheet } from 'react-native';
import MapContainer from './MapContainer'


const ServiceScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <MapContainer />
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