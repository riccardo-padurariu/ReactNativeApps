import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'green',
        headerShown: false,

        tabBarStyle: Platform.select({
          default: {
            backgroundColor: '#1E1E1E',
            paddingTop: 10,
          },
        }),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
          tabBarLabelStyle: {
            fontSize: 15
          }
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
          tabBarLabelStyle: {
            fontSize: 15
          }
        }}
      />
      <Tabs.Screen
        name="playlists"
        options={{
          title: 'Playlists',
          tabBarIcon: ({ color }) => <Fontisto name="favorite" size={24} color={color} />,
          tabBarLabelStyle: {
            fontSize: 15
          }
        }}
      />

    </Tabs>
  );
}
