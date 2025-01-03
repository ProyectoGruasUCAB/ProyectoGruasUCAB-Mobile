import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import MapContainer from './MapContainer'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>GRUAS UCAB</Text> 
        <TouchableOpacity style={styles.optionsButton}>
          <MaterialIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        {/* Aquí va el contenido principal de tu pantalla */}
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

export default HomeScreen;