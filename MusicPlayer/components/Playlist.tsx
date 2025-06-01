import Ionicons from '@expo/vector-icons/Ionicons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AlbumModal from './AlbumModal';

const Playlist = ({
  name,
  numberSongs,
  songs
} : {
  name: string,
  numberSongs: number,
  songs: any[]
}) => {

  const [isOpen,setIsOpen] = React.useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <View style={styles.mainContainer}>
          <Ionicons name="menu-outline" size={48} color="#008A0B" />
          <View style={{marginLeft: 20}}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.subtitle}>{`${numberSongs} songs`}</Text>
          </View>
        </View>
      </TouchableOpacity>

      <AlbumModal 
        albumName={name} 
        albumAuthor='user'
        numberSongs={numberSongs}
        songs={songs}
        condition={isOpen}
        setCondition={setIsOpen}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    marginBottom: 10
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