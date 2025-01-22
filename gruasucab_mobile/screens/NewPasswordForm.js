import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { handleIncompleteAccount } from '../apis/api'; // Importar correctamente

const CreatePasswordForm = () => {
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleSubmit = async () => {
    try {
        const userEmail = await AsyncStorage.getItem('userEmail');
        await handleIncompleteAccount(userEmail, password, newPassword);
        navigation.navigate('Login');
    } catch (error) {
        alert('Error al intentar crear la contraseña permanente');
        console.error(error);
        navigation.navigate('Login'); // Regresar a la pantalla de inicio de sesión si hay algún error.
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Contraseña Permanente</Text>
      <TextInput
        style={styles.input}
        placeholder="Contraseña Temporal"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña nueva"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Establecer Contraseña</Text>
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

export default CreatePasswordForm;
