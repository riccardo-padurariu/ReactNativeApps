import { useAuth } from "@/Authentification/AuthContext";
import { auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {

  const { currentUser, userLoggedIn } = useAuth();

  return (
    userLoggedIn
     ? <View style={styles.mainContainer}>
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
        <TouchableOpacity 
          style={styles.button}
          onPress={() => {router.replace('/(tabs)/home'),auth.signOut()}}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    : <View style={styles.mainContainer}>
        <View style={styles.notLoggedContainer}>
          <Text style={styles.title}>You're not logged in.Log in or register and start shopping!</Text>
          <TouchableOpacity 
            style={styles.checkOutButton}
            onPress={() => router.push('/login')}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
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
  },
  notLoggedContainer: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20
  },
  checkOutButton: {
    backgroundColor: '#FFE311',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 20
  }
});

export const unstable_settings  = {
  unmountOnBlur: false,
};

export default Profile;