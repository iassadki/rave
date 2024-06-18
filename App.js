import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen.js';
import RaveScreen from './screens/RaveScreen.js';
import RecordsListScreen from './screens/RecordsListScreen';
import RecordingScreen from './screens/RecordingScreen';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RecordingProvider } from './context/RecordingContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LoginScreenNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { backgroundColor: '#000', borderTopWidth: 0 },
      }}
    >
      <Tab.Screen
        name="Recording"
        component={RecordingScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="microphone" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Rave Steps"
        component={RaveScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="violin" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <RecordingProvider>
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              headerShown: false,
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#000',
            }}
          >
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreenNavigator}
            />
            <Stack.Screen
              name="RaveScreen"
              component={RaveScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </RecordingProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});
