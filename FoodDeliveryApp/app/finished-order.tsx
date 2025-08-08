import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const FinishedOrder = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>You order is preparing...</Text>
      <TouchableOpacity
        onPress={() => router.replace('/(tabs)/home')}
      >
        <Text style={styles.buttonText}>Go home</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 22
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'ABeeZee',
    textDecorationLine: 'underline'
  }
});

export default FinishedOrder;