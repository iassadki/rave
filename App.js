import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaView, StyleSheet } from 'react-native';
import LoginScreen from './screens/LoginScreen.js';
import ModelScreen from './screens/ModelScreen';
import RecordScreen from './screens/RecordScreen';
import { MaterialCommunityIcons } from "@expo/vector-icons";
// import { Provider } from 'react-redux';
// import store from './redux/store';
// import { LikedSongsProvider } from './context/LikedSongsContext';

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
        name="Login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="login" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Record"
        component={RecordScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="microphone" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Models"
        component={ModelScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="LoginScreen" // Changer le nom de l'écran initial si nécessaire
            screenOptions={{
              headerShown: false, // Cacher l'en-tête pour tous les écrans par défaut
              headerStyle: { backgroundColor: '#fff' },
              headerTintColor: '#000',
            }}
          >
            <Stack.Screen
              name="LoginScreen" // Renommer l'écran "Login" en "LoginScreen"
              component={LoginScreenNavigator}
            />
            <Stack.Screen
              name="ModelScreen"
              component={ModelScreen}
              options={{ headerShown: false }} // Cacher l'en-tête pour l'écran ModelScreen
            />
          </Stack.Navigator>

        </NavigationContainer>
      </SafeAreaView>
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
