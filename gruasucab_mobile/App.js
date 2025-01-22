import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreatePasswordForm from './screens/NewPasswordForm';
import LoginScreen from './screens/LoginScreen';
import DrawerNavigator from './screens/DrawerNavigator'; 
import UserForm from './screens/UserFormScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

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
          name="UserForm" 
          component={UserForm}  
        /> 
        <Stack.Screen 
          name="GRUAS UCAB" 
          component={DrawerNavigator} 
        />
        <Stack.Screen 
          name="CreatePasswordForm" 
          component={CreatePasswordForm}  
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />  
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;