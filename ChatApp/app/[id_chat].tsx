import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ChatPage = () => {

  const { id_chat, name } = useLocalSearchParams();
  console.log(id_chat);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{marginRight: 10}}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.flex}>
            <TouchableOpacity>
              <AntDesign style={{marginRight: 10}} name="search1" size={24} color="#90E0EF" />
            </TouchableOpacity>
            <TouchableOpacity
              
            >
              <Feather name="more-vertical" size={24} color="#90E0EF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.sendContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Type a message" placeholderTextColor={'#03045E'} />
        </View>
        <TouchableOpacity style={styles.sendButton}>
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
  sendContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    padding: 2,
    borderRadius: 40,
    marginRight: 15
  },
  input: {
    fontSize: 16
  },
  sendButton: {
    backgroundColor: '#03045E',
    padding: 12,
    borderRadius: '50%'
  }
});

export default ChatPage;