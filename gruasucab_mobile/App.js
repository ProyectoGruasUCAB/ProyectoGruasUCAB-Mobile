import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import DrawerNavigator from './screens/DrawerNavigator'; 

const Stack = createStackNavigator();

const App = () => {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;