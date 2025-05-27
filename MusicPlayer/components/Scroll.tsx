import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Album from "./Album";

const Scroll = ({type,margin} : {type: string,margin: number}) => {
  return (
    <View style={{marginTop: 20,marginBottom: margin}}>
      <Text style={styles.title}>{type === "album" ? "Albums that you might want to listen..." : "Custom made playlists"}</Text>
      <ScrollView contentContainerStyle={{display: 'flex',flexDirection: 'row', alignItems: 'center'}} horizontal={true}>
        <Album 
          albumName={type === "album" ? "Album name" : "Playlist name"}
          albumAuthor={type === "album" ? "Album author" : "Playlist author"}
        />
        <Album 
          albumName={type === "album" ? "Album name" : "Playlist name"}
          albumAuthor={type === "album" ? "Album author" : "Playlist author"}
        />
        <Album 
          albumName={type === "album" ? "Album name" : "Playlist name"}
          albumAuthor={type === "album" ? "Album author" : "Playlist author"}
        />
        <Album 
          albumName={type === "album" ? "Album name" : "Playlist name"}
          albumAuthor={type === "album" ? "Album author" : "Playlist author"}
        />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 10
  }
});

export default Scroll;