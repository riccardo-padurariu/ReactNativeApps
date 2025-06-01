import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";



const MusicPlaylist = ({
  songName,
  songAuthor,
  duration,
  setPlaylist,
  playlist
} : {
  songName: string,
  songAuthor: string,
  duration: string,
  setPlaylist: any,
  playlist: any[]
}) => {

  const [isSelected,setIsSelected] = React.useState(false);

  const toggleToPlaylist = () => {
    setIsSelected(prev => !prev);
    if(isSelected){
      const newArr = playlist.filter(item => item.songName !== songName);
      setPlaylist(newArr);
    }else{
      setPlaylist(prevArr => [
        ...prevArr,
        {
          name: songName,
          author: songAuthor,
          duration: duration
        }
      ])
    }
  }

  return (
    <View>
      <TouchableOpacity style={{opacity: isSelected ? 0.4 : 1}} onPress={toggleToPlaylist}>
        <View style={styles.mainContainer}>
          <View style={styles.coverPlaceholder}>
            <Feather name="music" size={30} color="#008A0B" />
          </View>
          <View>
            <Text numberOfLines={1} style={styles.songName}>{songName}</Text>
            <Text numberOfLines={1} style={styles.songAuthor}>{songAuthor}</Text>
          </View>
          <Text numberOfLines={1} style={styles.songAuthor}>{duration}</Text>
          {isSelected 
            ? <AntDesign style={styles.interaction} name="minuscircleo" size={22} color="#888888" />
            : <AntDesign style={styles.interaction} name="pluscircleo" size={22} color="#888888" />}
        </View>
      </TouchableOpacity>

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
    minWidth: 100,
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
    width: 210
  },
  songAuthor: {
    color: '#888888',
    fontSize: 14
  },
  interaction: {
    marginLeft: 10
  }
});

export default MusicPlaylist;