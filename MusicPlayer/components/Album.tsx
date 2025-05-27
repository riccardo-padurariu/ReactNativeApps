import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Album = ({albumName,albumAuthor} : {albumName: string, albumAuthor: string}) => {
  return (
    <TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.coverPlaceholder}>
          <Feather name="music" size={60} color="#008A0B" />
        </View>
        <Text style={styles.albumName}>
          {albumName}
        </Text>
        <Text style={styles.albumAuthor}>
          {albumAuthor}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 15
  },
  coverPlaceholder: {
    backgroundColor: '#1E1E1E',
    padding: 35,
    borderRadius: 15
  },
  albumName: {
    color: 'white',
    fontWeight: 'semibold',
    fontSize: 16,
    marginTop: 5
  },
  albumAuthor: {
    color: '#888888'
  }
});

export default Album;