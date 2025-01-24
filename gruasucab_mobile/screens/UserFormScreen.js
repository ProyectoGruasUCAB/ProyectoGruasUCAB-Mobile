import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { getAllSuppliers, recordUserData, setAuthToken } from '../apis/api';

const UserForm = () => {
  const [driver, setDriver] = useState({
    userEmail: '',
    userId: '',
    name: '',
    phone: '',
    cedula: '',
    role: '',
    birthDate: '',
    medicalCertificate: '',
    medicalCertificateExpirationDate: '',
    driverLicense: '',
    driverLicenseExpirationDate: '',
    position: 'Conductor',
    workplaceId: ''
  });

  const [showBirthDatePicker, setShowBirthDatePicker] = useState(false);
  const [showMedicalDatePicker, setShowMedicalDatePicker] = useState(false);
  const [showLicenseDatePicker, setShowLicenseDatePicker] = useState(false);
  const [suppliers, setSuppliers] = useState([]);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchStoredData = async () => {
      const storedEmail = await AsyncStorage.getItem('userEmail');
      const storedUserId = await AsyncStorage.getItem('userID');
      const storedRole = await AsyncStorage.getItem('role');
      const storedWorkerId = await AsyncStorage.getItem('workerId');
      
      setDriver(prevDriver => ({
        ...prevDriver,
        userEmail: storedEmail || '',
        userId: storedUserId || '',
        role: storedRole || '',
        workplaceId: storedWorkerId || ''
      }));
    };
    
    fetchStoredData();
  }, []);

  useEffect(() => {
    const fetchAllSuppliers = async () => {
        try {
        setAuthToken(await AsyncStorage.getItem('authToken'));
        const suppliersData = await getAllSuppliers();
        setSuppliers(suppliersData.suppliers);
      } catch (error) {
        console.error('Error al obtener proveedores:', error);
      }
    };

    fetchAllSuppliers();
  }, []);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  const handleChange = (name, value) => {
    setDriver(prevDriver => ({
      ...prevDriver,
      [name]: value
    }));
  };

  const handleBirthDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(driver.birthDate);
    setShowBirthDatePicker(false);
    handleChange('birthDate', formatDate(currentDate.toISOString().split('T')[0]));
  };

  const handleMedicalDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(driver.medicalCertificateExpirationDate);
    setShowMedicalDatePicker(false);
    handleChange('medicalCertificateExpirationDate', formatDate(currentDate.toISOString().split('T')[0]));
  };

  const handleLicenseDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date(driver.driverLicenseExpirationDate);
    setShowLicenseDatePicker(false);
    handleChange('driverLicenseExpirationDate', formatDate(currentDate.toISOString().split('T')[0]));
  };

  const handleSubmit = async () => {
    try {
      console.log(driver);
      setAuthToken(await AsyncStorage.getItem('authToken'));
      await recordUserData(driver);
      navigation.navigate('GRUAS UCAB');
    } catch (error) {
      alert('Error al registrar el usuario');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro de Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={driver.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        value={driver.phone}
        onChangeText={(value) => handleChange('phone', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Cédula"
        value={driver.cedula}
        onChangeText={(value) => handleChange('cedula', value)}
      />

      <View style={styles.row}>
        <View style={styles.column}>
          <TouchableOpacity onPress={() => setShowBirthDatePicker(true)} style={styles.datePickerButton}>
            <Ionicons name="calendar" size={24} color="gray" />
            <Text style={styles.datePickerText}>
              {driver.birthDate ? driver.birthDate : 'Fecha de Nacimiento'}
            </Text>
          </TouchableOpacity>
          {showBirthDatePicker && (
            <DateTimePicker
              value={driver.birthDate ? new Date(driver.birthDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleBirthDateChange}
            />
          )}
        </View>
      </View>
      
      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Certificado Médico"
            value={driver.medicalCertificate}
            onChangeText={(value) => handleChange('medicalCertificate', value)}
          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={() => setShowMedicalDatePicker(true)} style={styles.datePickerButton}>
            <Ionicons name="calendar" size={24} color="gray" />
            <Text style={styles.datePickerText}>
              {driver.medicalCertificateExpirationDate ? driver.medicalCertificateExpirationDate : 'Fecha de Expiración del Certificado Médico'}
            </Text>
          </TouchableOpacity>
          {showMedicalDatePicker && (
            <DateTimePicker
              value={driver.medicalCertificateExpirationDate ? new Date(driver.medicalCertificateExpirationDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleMedicalDateChange}
            />
          )}
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.column}>
          <TextInput
            style={styles.input}
            placeholder="Licencia de Conducir"
            value={driver.driverLicense}
            onChangeText={(value) => handleChange('driverLicense', value)}
          />
        </View>
        <View style={styles.column}>
          <TouchableOpacity onPress={() => setShowLicenseDatePicker(true)} style={styles.datePickerButton}>
            <Ionicons name="calendar" size={24} color="gray" />
            <Text style={styles.datePickerText}>
              {driver.driverLicenseExpirationDate ? driver.driverLicenseExpirationDate : 'Fecha de Expiración de la Licencia de Conducir'}
            </Text>
          </TouchableOpacity>
          {showLicenseDatePicker && (
            <DateTimePicker
              value={driver.driverLicenseExpirationDate ? new Date(driver.driverLicenseExpirationDate) : new Date()}
              mode="date"
              display="default"
              onChange={handleLicenseDateChange}
            />
          )}
        </View>
      </View>

      
      
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
    padding: 5,
  },
  datePickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  datePickerText: {
    marginLeft: 10,
    color: 'gray',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#4285F4', // Color azul vibrante
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default UserForm;