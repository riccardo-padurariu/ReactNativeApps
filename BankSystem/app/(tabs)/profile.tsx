import { auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Profile = () => {

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.optionsContainer}>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.text}>Edit profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.text}>View transactions</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.option}>
                <Text style={styles.text}>Add limits</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.option}
                onPress={() => {router.replace('/login');auth.signOut();}}
              >
                <Text style={styles.text}>Log-out</Text>
              </TouchableOpacity> 
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#0D1B2A',
        flex: 1,
        padding: 30,
        paddingBottom: 0
    },
    title: {
        color: '#E0E1DD',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15
    },
    optionsContainer: {
      marginTop: 50
    },
    option: {
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#778DA9',
      padding: 15,
      marginBottom: 20
    },
    text: {
      color: '#E0E1DD',
      fontSize: 16
    }
});

export default Profile;