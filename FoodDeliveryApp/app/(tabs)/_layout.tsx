import { useColorScheme } from '@/hooks/useColorScheme';
import Feather from '@expo/vector-icons/Feather';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tabs 
        screenOptions={{
          tabBarActiveTintColor: 'white',
          headerShown: false,
          tabBarStyle: Platform.select({
            default: {
              backgroundColor: '#DAC734',
              paddingTop: 10,
              height: 95
            },
          })
        }}>
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Feather name="home" size={24} color="white" />,
            tabBarLabelStyle: {
              color: 'white',
              fontSize: 14,
              fontFamily: 'ABeeZee',
              marginTop: 2
            }
          }}
        />
        <Tabs.Screen
          name="cart"
          options={{
            title: 'Cart',
            tabBarIcon: ({ color }) => <Feather name="shopping-cart" size={24} color="white" />,
            tabBarLabelStyle: {
              color: 'white',
              fontSize: 14,
              fontFamily: 'ABeeZee',
              marginTop: 2
            }
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ color }) => <Feather name="user" size={24} color="white" />,
            tabBarLabelStyle: {
              color: 'white',
              fontSize: 14,
              fontFamily: 'ABeeZee',
              marginTop: 2
            }
          }}
        />
      </Tabs>
  );
}
