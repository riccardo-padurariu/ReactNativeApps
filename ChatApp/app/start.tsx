import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Start = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Welcome to chat app</Text>
        <Text style={styles.subtitle}>Please log in or register</Text>
        <TouchableOpacity
          onPress={() => router.push('/login')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push('/register')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8'
  },
  infoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  title: {
    color: '#03045E',
    fontSize: 28,
    fontWeight: '600'
  },
  subtitle: {
    fontSize: 18,
    color: '#0077B6'
  },
  button: {
    backgroundColor: '#03045E',
    padding: 10,
    width: '70%',
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center'
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default Start;