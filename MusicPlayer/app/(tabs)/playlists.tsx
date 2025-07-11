import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import Playlist from "@/components/Playlist";
import PlaylistModal from "@/components/PlaylistModal";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Playlists = () => {

  const [isCreating,setIsCreating] = React.useState(false);
  const [playlistsList,setPlaylistsList] = React.useState([]);
  const { currentUser } = useAuth();
  const [loading,setLoading] = React.useState(false);
  const [favs,setFavs] = React.useState([]);

  React.useEffect(() => {
    if(!currentUser) return;
    setLoading(true);

    const db = getDatabase(app);
    const userTasksRef = ref(db, `users/${currentUser.uid}/playlists`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const playlistsData = snapshot.val();

        const playlistsArray = Object.entries(playlistsData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setPlaylistsList(playlistsArray);
        setLoading(false);
      }else{
        setPlaylistsList([]);
      }
    }, (error: any) => {
      console.log('Error fetching playlists: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `users/${currentUser.uid}/favourites`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const playlistsData = snapshot.val();

        const favsArr = Object.entries(playlistsData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setFavs(favsArr);
      }else{
        setFavs([]);
      }
    }, (error: any) => {
      console.log('Error fetching playlists: ', error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  console.log("favs: ");
  console.log(favs);

  const displayArr = playlistsList.map((item: any) => (
    <Playlist 
      name={item.name}
      numberSongs={item.numberSongs}
      songs={item.songs}
      id={item.firebaseKey}
    />
  ))

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Your playlists</Text>
      <TouchableOpacity 
        style={styles.createPlaylist}
        onPress={() => setIsCreating(true)}
      >
        <Text style={styles.createPlaylistText}>
          Create a playlist
        </Text>
      </TouchableOpacity>
      {Array.isArray(favs) && <Playlist
        name="Favourite songs"
        numberSongs={favs.length}
        songs={favs}
        type="fav"
      />}

      {loading
      ? <ActivityIndicator size={'large'} color={'white'} /> 
      : displayArr}

      <PlaylistModal 
        playlistsList={playlistsList}
        setPlaylistsList={setPlaylistsList}
        condition={isCreating}
        setCondition={setIsCreating}
      />
    </View>
  )
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
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20
  },
  createPlaylistText: {
    fontSize: 22,
    color: 'white',
    fontWeight: "bold"
  },
  createPlaylist: {
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#008A0B',
    borderRadius: 7,
    marginBottom: 30
  },
})

export default Playlists;