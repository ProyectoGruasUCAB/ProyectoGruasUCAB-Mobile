import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './screens/LoginScreen';
import DrawerNavigator from './screens/DrawerNavigator';
import OrderNotification from './screens/OrderNotification';
import { messaging } from './firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const Stack = createStackNavigator();

const App = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onMessage(messaging, (payload) => {
      console.log('Mensaje recibido:', payload);
      navigation.navigate('OrderNotification', { orderData: payload.notification });
    });

    return () => {
      unsubscribe();
    };
  }, [navigation]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GRUAS UCAB" 
          component={DrawerNavigator} 
        />
        <Stack.Screen 
          name="OrderNotification" 
          component={OrderNotification} 
          options={{ title: 'Notificación de Orden' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
