import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getDatabase, ref, remove } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AlbumModal from './AlbumModal';
import PlaylistModal from './PlaylistModal';

const Playlist = ({
  name,
  numberSongs,
  songs,
  id,
  type
} : {
  name: string,
  numberSongs: number,
  songs: any[],
  id: string,
  type: string
}) => {

  const [isOpen,setIsOpen] = React.useState(false);
  const { currentUser } = useAuth();
  const [pressed,setPressed] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);

  const deletePlaylist = async (pid: string) => {
    const db = getDatabase(app);
    const userRef = ref(db, `users/${currentUser.uid}/playlists/${pid}`);
    await remove(userRef);
  }

  return (
    <View>
      <TouchableOpacity onPress={() => setIsOpen(true)}>
        <View style={styles.mainContainer}>
          <Ionicons name="menu-outline" size={48} color="#008A0B" />
          <View style={{marginLeft: 20,flex:1}}>
            <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.title}>{name}</Text>
              {type != 'fav' && <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => deletePlaylist(id)}
                >
                  <AntDesign name="delete" size={24} color="#888888" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setPressed(true)}
                >
                  <Feather name="more-vertical" size={24} color="#888888" />
                </TouchableOpacity>
              </View>}
            </View>
            <Text style={styles.subtitle}>{`${numberSongs} songs`}</Text>
          </View>
          {pressed && <View style={{position: 'absolute',backgroundColor: '#454545',padding: 10,borderRadius: 10,right: 10,top: 10,zIndex: 1000}}>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
              >
                <Text style={{fontSize: 16,marginRight: 10,color: '#888888'}}>Edit playlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setPressed(false)}
              >
                <MaterialIcons name="cancel" size={24} color="#888888" />
              </TouchableOpacity>
            </View>
          </View>}
        </View>
        
      </TouchableOpacity>

      <PlaylistModal 
        condition={isEditing}
        setCondition={setIsEditing}
        isEditing={true}
        playlistsList={[]}
        setPlaylistsList={() =>  {}}
        activeSongs={songs}
        id={id}
        pName={name}
      />

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
    marginBottom: 10,
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