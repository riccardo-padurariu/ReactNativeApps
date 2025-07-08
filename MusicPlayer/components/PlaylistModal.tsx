import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import { songs } from '@/data/songs';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, push, ref, remove } from 'firebase/database';
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MusicPlaylist from './MusicPlaylist';

const PlaylistModal = ({
  condition,
  setCondition,
  playlistsList,
  setPlaylistsList,
  isEditing,
  activeSongs,
  id,
  pName
}: {
  condition: boolean,
  setCondition: any,
  playlistsList: any[],
  setPlaylistsList: any,
  isEditing: boolean,
  activeSongs: any[],
  id: string,
  pName: string
}) => {

  const [playlist,setPlaylist] = React.useState(activeSongs ? activeSongs : []);
  const [name,setName] = React.useState(pName ? pName : '');
  const { currentUser } = useAuth();

  const exists = (id: string) => {
    let found = false;
    if(activeSongs){
      activeSongs.forEach((item: any) => {
        if(`${item.author}_${item.name}_${item.duration}` === id) found = true;
      })
    }
    return found;
  }

  const arr = songs;
  const displayArr = arr.map((item) => (
    <MusicPlaylist
      playlist={playlist}
      setPlaylist={setPlaylist}
      songAuthor={item.author}
      songName={item.name}
      duration={item.duration}
      id={`${item.author}_${item.name}_${item.duration}`}
      active={exists(`${item.author}_${item.name}_${item.duration}`)}
    />
  )) 

  const fetchData = async () => {
    try {
      const db = getDatabase(app);
      const userRef = ref(db, `users/${currentUser.uid}/playlists`);
      const newPlaylist = {
        songs: playlist,
        name: name,
        numberSongs: playlist.length
      };

      await push(userRef, newPlaylist);
      console.log("Playlist pushed successfully");
    } catch (error) {
      console.error("Error pushing playlist:", error);
    }
  }

  const deletePlaylist = async (pid: string) => {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/playlists/${pid}`);
    await remove(userRef);
  }

  const create = () => {
  
    if(isEditing){
      deletePlaylist(id).then(fetchData);
    }else{
      fetchData();
    }
    setCondition(false);
    setName('');
    setPlaylist([]);
  }

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => setCondition(false)}
          >
            <AntDesign name="down" size={24} color="white" />
          </TouchableOpacity>
          <View style={{display: 'flex',flexDirection: 'column',alignItems: 'flex-start'}} >
            <Text style={styles.title}>{isEditing ? 'Edit' : 'Create'} your playlist</Text>
            <TextInput defaultValue={name} onChangeText={text => setName(text)} style={styles.input} placeholder='Enter playlist name' />
          </View>
        </View>

        <Text style={styles.title2}>Select your songs: </Text>

        <ScrollView>
          {displayArr}
        </ScrollView>
        <TouchableOpacity 
          style={styles.createButton}
          onPress={create}
        >
          <Text style={styles.createButtonText}>{isEditing ? 'Edit': 'Create'}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    padding: 30
  },
  backButton: {
    backgroundColor: '#1E1E1E',
    width: 44,
    padding: 10,
    borderRadius: '50%'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginBottom: 0
  },
  title2: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20,
    marginBottom: 20
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  createButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 45,
    borderRadius: 10,
    backgroundColor: '#008A0B'
  },
  createButtonText: {
    fontSize: 19,
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    backgroundColor: 'white',
    marginLeft: 20,
    paddingLeft: 10,
    minWidth: 285,
    marginTop: 10,
    borderRadius: 8
  }
})

export default PlaylistModal;