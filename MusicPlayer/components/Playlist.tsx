import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Playlist = () => {
  return (
    <TouchableOpacity>
      <View style={styles.mainContainer}>
        <Ionicons name="menu-outline" size={48} color="#008A0B" />
        <View style={{marginLeft: 20}}>
          <Text style={styles.title}>Favourite songs</Text>
          <Text style={styles.subtitle}>Number of songs</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10
  },
  title: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 19
  },
  subtitle: {
    color: '#888888'
  }
});

export default Playlist;