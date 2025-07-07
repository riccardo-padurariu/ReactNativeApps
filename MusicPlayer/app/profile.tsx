import { useAuth } from "@/Authentification/AuthContext";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { doSignOut } from '../Authentification/Auth';

const Profile = () => {

  const { currentUser } = useAuth();

  const signOut = () => {
    router.replace('/login');
    doSignOut();
  }

  return (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => router.replace('/home')}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.infoContainer}>
        <View style={{borderWidth: 1, borderColor: '#A6A6A6',borderTopLeftRadius: 10,borderBottomLeftRadius: 10,borderTopRightRadius: 10,borderBottomRightRadius: 10,
          padding: 10,marginRight: 40
        }}>
          <Text style={styles.label}>Username:</Text>
          <View style={styles.flex}>
            <Text style={styles.infoText}>{currentUser.displayName}</Text>
            <TouchableOpacity
              style={styles.changeButton}
            >
              <Text style={styles.infoText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderWidth: 1, borderColor: '#A6A6A6',borderTopLeftRadius: 10,borderBottomLeftRadius: 10,borderTopRightRadius: 10,borderBottomRightRadius: 10,
          padding: 10,marginRight: 40
        }}>
          <Text style={styles.label}>Email: </Text>
          <View>
            <Text style={styles.infoText}>{currentUser.email}</Text>
            <TouchableOpacity
              style={styles.changeButton}
            >
              <Text style={styles.infoText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{borderWidth: 1, borderColor: '#A6A6A6',borderTopLeftRadius: 10,borderBottomLeftRadius: 10,borderTopRightRadius: 10,borderBottomRightRadius: 10,
          padding: 10,marginRight: 40
        }}>
          <Text style={styles.label}>Number playlists:</Text>
          <Text style={styles.infoText}>3</Text>
        </View>
        <View style={{borderWidth: 1, borderColor: '#A6A6A6',borderTopLeftRadius: 10,borderBottomLeftRadius: 10,borderTopRightRadius: 10,borderBottomRightRadius: 10,
          padding: 10,marginRight: 40
        }}>
          <Text style={styles.label}>Type of account:</Text>
          <Text style={styles.infoText}>Standard</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity style={styles.premiumButton}>
          <Text style={styles.infoText}>Switch to premium &#128081;</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={signOut}
        >
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
    paddingLeft: 40,
    justifyContent: 'space-around'
  },
  title: {  
    fontSize: 22,
    color: 'white',
    marginLeft: 10
  },
  infoContainer: {
    rowGap: 15
  },
  infoText: {
    fontSize: 17,
    color: 'white'
  },
  premiumButton: {
    backgroundColor: '#D2C107',
    marginRight: 40,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15
  },
  logoutButton: {
    backgroundColor: '#306F00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 40
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20
  },
  changeButton: {
    backgroundColor: '#454545',
    padding: 10,
    borderRadius: 5,
    maxWidth: 88,
    marginTop: 10
  },
  label: {
    color: '#A6A6A6'
  }
});

export default Profile;