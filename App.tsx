import * as React from 'react';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import StackNavigator from './app/navigation/Stack';
import {AuthContextProvider} from './app/context/AuthContext';

export default function App() {
  return (
    <AuthContextProvider>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </AuthContextProvider>
  );
}
