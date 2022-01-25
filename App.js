/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import DetailTaskScreen from './src/screens/DetailTaskScreen';
import IndexScreen from './src/screens/IndexScreen';
import {Provider as ToDoProvider} from './src/context/toDoContext';

const Stack = createNativeStackNavigator();
const CompApps = () => (
  <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={IndexScreen}
        options={{
          title: "Today's tasks",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailTaskScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  </NavigationContainer>
);
const App = () => {
  return (
    <ToDoProvider>
      <CompApps />
    </ToDoProvider>
  );
};

export default App;
