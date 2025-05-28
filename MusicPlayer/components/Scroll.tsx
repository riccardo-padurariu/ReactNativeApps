import { albums } from "@/data/albums";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import Album from "./Album";

const Scroll = ({type,margin,condition,setCondition} : {type: string,margin: number,condition: boolean,setCondition: any}) => {

  const arr = albums;
  const displayArr = arr.map(item => 
    <Album 
      albumName={item.albumName}
      albumAuthor={item.author}
      numberSongs={item.numberOfSongs}
      songs={item.songs}
    />
  )

  return (
    <View style={{marginTop: 20,marginBottom: margin}}>
      <Text style={styles.title}>{type === "album" ? "Albums that you might want to listen..." : "Custom made playlists"}</Text>
      <ScrollView contentContainerStyle={{display: 'flex',flexDirection: 'row', alignItems: 'center'}} horizontal={true}>
        {displayArr}
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