import LatestsHits from '@/components/LatestsHits';
import Scroll from '@/components/Scroll';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  const [albumOpen,setAlbumOpen] = React.useState(false);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.greet}>
        <Text style={styles.title}>
          Hello User!
        </Text>
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={30} color="#888888" />
        </TouchableOpacity>
      </View>
      <LatestsHits />
      <Scroll 
        type='album' 
        margin={0} 
        condition={albumOpen} 
        setCondition={setAlbumOpen} 
      />
      <Scroll 
        type='playlist' 
        margin={90} 
        condition={albumOpen} 
        setCondition={setAlbumOpen}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30
  },
  greet: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  musicModal: {
    backgroundColor: "#2C2C2C",
    flex: 1,
    padding: 30
  },
  backButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    width: 56,
    padding: 15,
    paddingLeft: 17
  },
  coverPlaceholder: {
    marginTop: 50,
    height: 380,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  musicName: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  musicAuthor: {
    fontSize: 18,
    color: '#888888',
  },
  support: {
    width: '100%',
    height: 4,
    borderRadius: 10,
    backgroundColor: '#454545',
  },
  progress: {
    position: 'relative',
    backgroundColor: '#888888',
    height: 4,
    width: '34%',
    borderRadius: 10
  },
  time: {
    color: 'white',
    marginBottom: 5
  },
  playButton: {
    backgroundColor: 'white',
    padding: 17,
    borderRadius: 40
  }
});
