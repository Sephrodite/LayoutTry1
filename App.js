import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';

import Meditate from './Screens/Meditate'
import Pomodoro from './Screens/Pomodoro'
import Graphs from './Screens/Graphs';
import Logs from './Screens/Logs';
import Settings from './Screens/Settings';
import ManageScreens from './components/ManageScreens';


const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function NavBar() {
  return (
    <BottomTabs.Navigator
      screenOption={({ navigation }) => ({
        headerStyle: { backgroundColor: '#FFEFD5' },
        headerTintColor: '#BDB76B',
        tabBarStyle: { backgroundColor: '#FFEFD5' },
        tabBarActiveTintColor: '#FFE4B5',
      })}
    >
      <BottomTabs.Screen
        name="Home"
        component={Graphs}
        options={{
          title: 'Graphs',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Pomodoro"
        component={Pomodoro}
        options={{
          title: 'Pomodoro',
          tabBarLabel: 'Pomodoro',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Meditate"
        component={Meditate}
        options={{
          title: 'Meditate',
          tabBarLabel: 'Meditate',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flower-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Logs"
        component={Logs}
        options={{
          title: 'Logs',
          tabBarLabel: 'Logs',
          tabBarIcon: ({ color}) => (
            <Ionicons name="library-outline" size={33} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" size={33} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: { backgroundColor: '#FFEFD5' },
            headerTintColor: '#BDB76B',
          }}
        >
          <Stack.Screen
            name="Navbar"
            component={NavBar}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="leScreen"
            component={ManageScreens}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}



