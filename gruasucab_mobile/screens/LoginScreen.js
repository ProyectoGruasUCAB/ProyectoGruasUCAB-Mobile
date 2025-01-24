import React, { useEffect, useState } from 'react';
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
import { login, setAuthToken, getDriverById, updateUserData } from '../apis/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from '../functions/notificationsService';

const LoginScreen = () => {
  const [userEmail, setUserEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('null');
  const [tokenFCM, setTokenFCM] = useState('');
  const navigation = useNavigation();

  
  const handleLogin = async () => {
    try {
      await AsyncStorage.setItem('userEmail', userEmail);
      const user = await login(userEmail, password);
      await AsyncStorage.setItem('userID', user.userID);  // Guardar el ID del usuario en AsyncStorage
      await AsyncStorage.setItem('authToken', user.token);
      await AsyncStorage.setItem('role', user.role);  
      await AsyncStorage.setItem('refreshToken', user.refreshToken);
      await AsyncStorage.setItem('workerId', user.workerId);
      console.log('User:', user);
      setAuthToken(await AsyncStorage.getItem('authToken'));

      if (user.role === "Conductor") {
        try {
          setAuthToken(await AsyncStorage.getItem('authToken'));
          await getDriverById(await AsyncStorage.getItem('userID'));
          navigation.navigate('GRUAS UCAB');
        } catch (error) {
          if (error.status === 500) {
            navigation.navigate('UserForm');
            console.log("el error",error.response.status);
            return;
          } else {
            console.log("Error al obtener conductor: ", error);
            alert("No se puede iniciar sesión como conductor aún");
          }
        }
      }
      console.log('Previus token:');
      const token = await registerForPushNotificationsAsync();
      setTokenFCM(token);
      console.log('Expo Push Token:', token);

      if (tokenFCM) {
        // Obtener la información actual del conductor
        const driver = await getDriverById(user.userID);

        // Actualizar solo el campo tokenFCM
        driver.tokenFCM = tokenFCM;

        // Actualizar la información del conductor usando el endpoint updateUserData
        const updateResponse = await updateUserData(driver);
        if (updateResponse.success) {
          console.log('Token de notificaciones guardado correctamente en el servidor.');
        } else {
          console.error('Error al guardar el token de notificaciones en el servidor:', updateResponse.message);
        }
      }

      navigation.navigate('GRUAS UCAB');
    } catch (error) {
      console.log("Error: ", error.response.data);
      if (error.response.data === "Unauthorized access: Account is not fully set up") {
        console.log("Redirigir a CreatePasswordForm");
        navigation.navigate('CreatePasswordForm'); // Navegar al formulario de creación de contraseña
      } else {
        setError('Usuario o contraseña incorrectos');
        alert(error.message);
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword'); // Navegar al formulario de recuperación de contraseña
  }

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
            onPress={handleForgotPassword} 
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
