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
        setDriver(driverData);
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
      <Text style={styles.name}>{driver.name}</Text>
      <Text style={styles.email}>{driver.userEmail}</Text>
      <Text style={styles.phone}>{driver.phone}</Text>
      <Text style={styles.cedula}>{driver.cedula}</Text>
      <Text style={styles.birthDate}>Fecha de Nacimiento: {formatDate(driver.birthDate)}</Text>
      <Text style={styles.medicalCertificate}>Certificado Médico: {driver.medicalCertificate}</Text>
      <Text style={styles.medicalCertificateExpirationDate}>Fecha de Expiración del Certificado Médico: {formatDate(driver.medicalCertificateExpirationDate)}</Text>
      <Text style={styles.driverLicense}>Licencia de Conducir: {driver.driverLicense}</Text>
      <Text style={styles.driverLicenseExpirationDate}>Fecha de Expiración de la Licencia de Conducir: {formatDate(driver.driverLicenseExpirationDate)}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  email: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  phone: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  cedula: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  birthDate: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  medicalCertificate: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  medicalCertificateExpirationDate: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  driverLicense: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
  driverLicenseExpirationDate: {
    fontSize: 18,
    marginBottom: 10,
    color: 'black',
  },
});

export default ProfileScreen;
