// filepath: /c:/Users/marco/OneDrive/Documents/GitHub/ProyectoGruasUCAB-Mobile/gruasucab_mobile/notificationService.js
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const registerForPushNotificationsAsync = async () => {
  let token;
  console.log('1');
  console.log("plataforma ", Platform.OS);
  if (Platform.OS === 'android') {
    console.log('5');
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  console.log('1');
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    console.log(existingStatus);
    if (existingStatus !== 'granted') {
        console.log('2');
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      console.log('3');
      return;
    }
    console.log('4');
    try {
    token = (await Notifications.getExpoPushTokenAsync()).data;
    } catch (error) {
      console.log('Error al obtener el token de notificaciones', error);
    }
    console.log("Token:", token);
 
    console.log('6');
  return token;
};