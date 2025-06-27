import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoMainContainer}>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.infoText}>Contact Info</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.infoText}>About Us</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.infoText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.infoText}>Cart History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.infoContainer}>
          <Text style={styles.infoText}>Payment Info</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 50,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 22
  },
  infoMainContainer: {
    marginTop: 40,
    backgroundColor: '#D9D9D9',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    paddingBottom: 50,
    borderRadius: 20,
  },
  infoContainer: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    padding: 10,
    marginBottom: 20
  },
  infoText: {
    fontFamily: 'ABeeZee',
    fontSize: 17
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#FFE311',
    maxHeight: 50,
    borderRadius: 15
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    fontSize: 17,
    color: 'white'
  }
});

export default Profile;