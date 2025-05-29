import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ListenModal from './ListenModal';

const Music = ({
  songName,
  songAuthor,
  duration
} : {
  songName: string,
  songAuthor: string,
  duration: string
}) => {

  const [isListening,setIsListening] = React.useState(false);
  const [currentTime,setCurrentTime] = React.useState(0);

  /* 
    <ListenModal 
      condition={isListening} 
      setCondition={setIsListening}
      songName={songName}
      songAuthor={songAuthor}
      duration={duration}
      currentTime={currentTime}
      setCurrentTime={setCurrentTime}
    />
  */

  return (
    <View>
      <TouchableOpacity onPress={() => setIsListening(true)}>
        <View style={styles.mainContainer}>
          <View style={styles.coverPlaceholder}>
            <Feather name="music" size={30} color="#008A0B" />
          </View>
          <View>
            <Text numberOfLines={1} style={styles.songName}>{songName}</Text>
            <Text numberOfLines={1} style={styles.songAuthor}>{songAuthor}</Text>
          </View>
          <Text numberOfLines={1} style={styles.songAuthor}>{duration}</Text>
        </View>
      </TouchableOpacity>

      <ListenModal 
        condition={isListening} 
        setCondition={setIsListening}
        songName={songName}
        songAuthor={songAuthor}
        duration={duration}
        currentTime={currentTime}
        setCurrentTime={setCurrentTime}
      />

    </View>
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
    marginBottom: 10,
    paddingRight: 20
  },
  coverPlaceholder: {
    backgroundColor: "#2C2C2C",
    padding: 7,
    borderRadius: 7,
    marginRight: 7
  },
  songName: {
    color: 'white',
    fontSize: 18,
    flexWrap: 'wrap',
    width: 250
  },
  songAuthor: {
    color: '#888888',
    fontSize: 14
  }
});

export default Music;