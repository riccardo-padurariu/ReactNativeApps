import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.mainContainer}>
      <Text>salut</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default Profile;