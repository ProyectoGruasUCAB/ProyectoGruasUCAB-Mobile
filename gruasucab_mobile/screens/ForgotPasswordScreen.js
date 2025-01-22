import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { forgotPassword } from '../apis/api'; // Asegúrate de tener una función para manejar la solicitud de restablecimiento de contraseña en tu API

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const handleForgotPassword = async () => {
    try {
      await forgotPassword(email);
      setMessage('Se ha enviado un enlace de restablecimiento de contraseña a tu correo electrónico.');
      navigation.navigate('Login');
    } catch (error) {
      console.log('Error al solicitar el restablecimiento de contraseña:', error);
      setError('Error al solicitar el restablecimiento de contraseña');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olvidé mi Contraseña</Text>
      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      {message ? <Text style={styles.messageText}>{message}</Text> : null}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    width: '100%',
  },
  button: {
    backgroundColor: '#4285F4',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  messageText: {
    color: 'green',
    marginBottom: 15,
  },
  errorText: {
    color: 'red',
    marginBottom: 15,
  },
});

export default ForgotPasswordScreen;