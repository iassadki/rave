// import * as React from 'react';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, Dimensions, StatusBar, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialCommunityIcons } from "@expo/vector-icons";

function HomeScreen() {
  return (
    <SafeAreaView style={style = styles.container}>
      <ScrollView >
        <Text> Songs </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function LikedSongsScreen() {
  return (
    <View style={style = styles.container}>
      <Text>Liked Songs</Text>
    </View>
  );
}

function SongScreen() {
  return (
    <View style={style = styles.container}>
      <Text>Song Infos</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: 'black',
        inactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Liked Songs" component={LikedSongsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
  },

});