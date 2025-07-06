import { useAuth } from "@/Authentification/AuthContext";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {

  const { currentUser } = useAuth();

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Username:</Text>
        <View style={styles.flex}>
          <Text style={styles.infoText}>{currentUser.displayName}</Text>
          <TouchableOpacity>
            <Text style={styles.infoText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>Email: </Text>
        <View>
          <Text style={styles.infoText}>{currentUser.email}</Text>
          <TouchableOpacity>
            <Text style={styles.infoText}>Change</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.infoText}>Number playlists: 3</Text>
        <Text style={styles.infoText}>Type of account: standard</Text>
      </View>
      <View>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.infoText}>Switch to premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.infoText}>Log-out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    paddingLeft: 50,
    justifyContent: 'space-around'
  },
  title: {  
    fontSize: 22,
    color: 'white',
    marginTop: -50
  },
  infoContainer: {
    rowGap: 15
  },
  infoText: {
    fontSize: 17,
    color: 'white'
  },
  premiumButton: {

  },
  logoutButton: {

  },
  flex: {
    
  }
});

export default Profile;