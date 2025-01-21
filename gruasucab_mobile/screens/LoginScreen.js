import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  TouchableWithoutFeedback, 
  Keyboard,
  Image 
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logo from '../assets/LOGO UCAB CON GRUA color.png';
import { login, setAuthToken, updateUserData, getUserData } from '../apis/apiAuth'; // Importar getUserData desde tu API
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';

const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled = authStatus === messaging.AuthorizationStatus.AUTHORIZED || 
                  authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    return await messaging().getToken();
  } else {
    alert('No se pudo obtener permiso para recibir notificaciones push.');
    return null;
  }
};

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('null');
  const navigation = useNavigation();

  useEffect(() => {
    const checkPermission = async () => {
      const token = await requestUserPermission();
      if (token) {
        console.log('FCM Token:', token);
      }
    };
    checkPermission();
  }, []);

  const handleLogin = async () => {
    try {
      const user = await login(userEmail, password);
      await AsyncStorage.setItem('authToken', user.token); 
      await AsyncStorage.setItem('refreshToken', user.refreshToken);
      await AsyncStorage.setItem('userEmail', user.userEmail);
      await AsyncStorage.setItem('userID', user.userID);
      setAuthToken(await AsyncStorage.getItem('authToken'));
      
      // Obtener el token FCM
      const fcmToken = await messaging().getToken();

      if (fcmToken) {
        // Obtener la información actual del conductor
        const driver = await getUserData(user.userID);

        // Actualizar solo el campo tokenFCM
        driver.tokenFCM = fcmToken;

        // Actualizar la información del conductor usando el endpoint updateUserData
        const updateResponse = await updateUserData(driver);
        if (updateResponse.success) {
          console.log('Token FCM guardado correctamente en el servidor.');
        } else {
          console.error('Error al guardar el token FCM en el servidor:', updateResponse.message);
        }
      }
      
      navigation.navigate('GRUAS UCAB');
    } catch (error) {
      setError('Usuario o contraseña incorrectos');
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
      <View style={styles.container}>
        <View style={styles.contentContainer}> 
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.megaTitle}>Gruas UCAB</Text>
          <Text style={styles.title}>Iniciar Sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            value={userEmail}
            onChangeText={setUserEmail}
            autoCapitalize="none" 
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => alert('Funcionalidad aún no implementada')} 
            style={styles.forgotPasswordContainer}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  megaTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    width: '80%',
    alignItems: 'center',
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
    width: 300,
  },
  button: {
    backgroundColor: '#4285F4', // Color azul más vibrante
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 300,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  forgotPasswordContainer: {
    marginTop: 20,
  },
  forgotPasswordText: {
    color: '#4285F4', // Color azul del enlace
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  logo: {
    width: 180,
    height: 150,
    marginBottom: 20,
  }
});

export default LoginScreen;
