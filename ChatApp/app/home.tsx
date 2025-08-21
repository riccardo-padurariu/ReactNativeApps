import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Chat app</Text>
          <View style={styles.flex}>
            <TouchableOpacity>
              <AntDesign style={{marginRight: 10}} name="search1" size={24} color="#90E0EF" />
            </TouchableOpacity>
            <TouchableOpacity>
              <Feather name="more-vertical" size={24} color="#90E0EF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.newButton}
        onPress={() => router.push('/search-page')}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8',
    position: 'relative'
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#0077B6',
  },
  title: {
    fontSize: 22,
    color: 'white'
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  newButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#03045E',
    padding: 10,
    borderRadius: '50%'
  }
});

export default Home;