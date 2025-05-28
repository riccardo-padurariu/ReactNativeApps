import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AlbumModal from './AlbumModal';

const Album = ({
  albumName,
  albumAuthor,
  numberSongs,
  songs,
} : {
  albumName: string, 
  albumAuthor: string,
  numberSongs: number,
  songs: any[],
}) => {

  const [active,setActive] = React.useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setActive(true)}>
        <View style={styles.mainContainer}>
          <View style={styles.coverPlaceholder}>
            <Feather name="music" size={60} color="#008A0B" />
          </View>
          <Text numberOfLines={1} style={styles.albumName}>
            {albumName}
          </Text>
          <Text style={styles.albumAuthor}>
            {albumAuthor}
          </Text>
        </View>
      </TouchableOpacity>

      {active && 
        <AlbumModal 
          condition={active} 
          setCondition={setActive} 
          albumName={albumName}
          albumAuthor={albumAuthor}
          numberSongs={numberSongs}
          songs={songs}
        />
      }
    </View>
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
    marginTop: 5,
    width: 100,
    textAlign: 'center'
  },
  albumAuthor: {
    color: '#888888'
  }
});

export default Album;