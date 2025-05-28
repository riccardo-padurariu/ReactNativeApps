import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Music from './Music';

const AlbumModal = ({
  handle,
  condition,
  setCondition,
  albumName,
  albumAuthor,
  numberSongs,
  songs
} : {
  handle: any,
  condition: boolean,
  setCondition: any,
  albumName: string,
  albumAuthor: string,
  numberSongs: number,
  songs: any[]
}) => {

  const arr = songs;
  const displayArr = arr.map(item => 
    <Music
      songName={item.name}
      songAuthor={item.author}
      duration={item.duration}
    />
  )

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <View style={styles.startFlex}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={() => setCondition(false)}
            >
              <AntDesign name="down" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>
              {albumName}
            </Text>
          </View>
          <View style={styles.endFlex}>
            <TouchableOpacity style={styles.playButton}>
              <FontAwesome name="play" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.albumContainer}>
          <Text style={styles.author}>{albumAuthor}</Text>
          <ScrollView showsVerticalScrollIndicator={true} contentContainerStyle={styles.musicList}>
            {displayArr}
          </ScrollView>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2C2C2C'
  },
  titleContainer: {
    height: '25%',
    backgroundColor: '#1E1E1E',
    padding: 30
  },
  startFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1
  },
  backButton: {
    backgroundColor: '#454545',
    padding: 10,
    borderRadius: '50%'
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 30,
    flexWrap: 'wrap'
  },
  endFlex: {
    alignItems: "flex-end"
  },
  playButton: {
    backgroundColor: '#008A0B',
    padding: 15,
    paddingLeft: 19,
    borderRadius: '50%',
    marginBottom: -58
  },
  albumContainer: {
    flex: 1,
    padding: 20
  },
  musicList: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  author: {
    fontSize: 25,
    color: '#888888',
    marginBottom: 20
  }
})

export default AlbumModal;