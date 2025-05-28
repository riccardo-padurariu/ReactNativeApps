import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Music from "./Music";

const LatestsHits = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Latests hits
      </Text>
      <View style={styles.mainContainer}>
        <Music songName="Can't tell me nothing" songAuthor="Kanye West" duration="3:44" />
        <Music songName="Fair Trade" songAuthor="Drake" duration="4:02" />
        <Music songName="R U Mine" songAuthor="Arctic Monkeys" duration="3:57" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginTop: 60,
    marginBottom: 10
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  }
});

export default LatestsHits;