import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Music = ({handle} : {handle: any}) => {
  return (
    <TouchableOpacity onPress={() => handle(prev => !prev)}>
      <View style={styles.mainContainer}>
        <View style={styles.coverPlaceholder}>
          <Feather name="music" size={30} color="#008A0B" />
        </View>
        <View>
          <Text style={styles.songName}>Song name</Text>
          <Text style={styles.songAuthor}>Song author</Text>
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
    backgroundColor: '#454545',
    flex: 1,
    maxHeight: 62,
    padding: 10,
    borderRadius: 10,
    minWidth: 350,
    marginBottom: 10
  },
  coverPlaceholder: {
    backgroundColor: "#2C2C2C",
    padding: 7,
    borderRadius: 7,
    marginRight: 7
  },
  songName: {
    color: 'white',
    fontSize: 18
  },
  songAuthor: {
    color: '#888888',
    fontSize: 14
  }
});

export default Music;