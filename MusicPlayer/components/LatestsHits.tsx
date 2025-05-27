import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Music from "./Music";

const LatestsHits = ({handle} : {handle: any}) => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>
        Latests hits
      </Text>
      <View style={styles.mainContainer}>
        <Music handle={handle} />
        <Music handle={handle} />
        <Music handle={handle} />
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