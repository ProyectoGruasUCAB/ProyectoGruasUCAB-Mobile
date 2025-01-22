import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAuthToken, getDriverById } from '../apis/api';

const ProfileScreen = () => {
  const [driver, setDriver] = useState(null);

  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        setAuthToken(await AsyncStorage.getItem('authToken'));
        const driverData = await getDriverById(await AsyncStorage.getItem('userID'));
        console.log(driverData);
        setDriver(driverData.driver);
      } catch (error) {
        console.error('Error al obtener los datos del conductor:', error);
      }
    };

    fetchDriverData();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const [year, month, day] = date.split('-');
    return `${day}-${month}-${year}`;
  };

  if (!driver) {
    return (
      <View style={styles.container}>
        <Text>Cargando...</Text>
      </View>
    );
  }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.profileCard}>
          <Text style={styles.name}>{driver.name}</Text>
          <Text style={styles.email}>{driver.userEmail}</Text>
          <Text style={styles.phone}>{driver.phone}</Text>
          <Text style={styles.cedula}>{driver.cedula}</Text>
          <Text style={styles.label}>Fecha de Nacimiento:</Text>
          <Text style={styles.value}>{formatDate(driver.birthDate)}</Text>
          <Text style={styles.label}>Certificado Médico:</Text>
          <Text style={styles.value}>{driver.medicalCertificate}</Text>
          <Text style={styles.label}>Fecha de Expiración del Certificado Médico:</Text>
          <Text style={styles.value}>{formatDate(driver.medicalCertificateExpirationDate)}</Text>
          <Text style={styles.label}>Licencia de Conducir:</Text>
          <Text style={styles.value}>{driver.driverLicense}</Text>
          <Text style={styles.label}>Fecha de Expiración de la Licencia de Conducir:</Text>
          <Text style={styles.value}>{formatDate(driver.driverLicenseExpirationDate)}</Text>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
      paddingHorizontal: 15,
      backgroundColor: '#f5f5f5',
      flexGrow: 1,
    },
    profileCard: {
      backgroundColor: '#fff',
      borderRadius: 10,
      padding: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 5,
      marginBottom: 20,
    },
    name: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
      color: '#333',
    },
    email: {
      fontSize: 16,
      marginBottom: 5,
      color: '#555',
    },
    phone: {
      fontSize: 16,
      marginBottom: 5,
      color: '#555',
    },
    cedula: {
      fontSize: 16,
      marginBottom: 15,
      color: '#555',
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#888',
    },
    value: {
      fontSize: 16,
      marginBottom: 15,
      color: '#333',
    },
  });
  
  export default ProfileScreen;
  