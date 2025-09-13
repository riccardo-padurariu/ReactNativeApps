import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E0E1DD',
        headerShown: false,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {
            backgroundColor: '#1B263B',
            paddingTop: 10,
            height: 105
          },
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={28} color="#E0E1DD" />,
          tabBarLabelStyle: {
            fontSize: 13,
            marginTop: 5,
            color: '#E0E1DD'
          }
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: 'Cards',
          tabBarIcon: ({ color }) => <Feather name="credit-card" size={28} color="#E0E1DD" />,
          tabBarLabelStyle: {
            fontSize: 13,
            marginTop: 5,
            color: '#E0E1DD'
          }
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <Feather name="user" size={28} color="#E0E1DD" />,
          tabBarLabelStyle: {
            fontSize: 13,
            marginTop: 5,
            color: '#E0E1DD'
          }
        }}
      />
    </Tabs>
  );
}
