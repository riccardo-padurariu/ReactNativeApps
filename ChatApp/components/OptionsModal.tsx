import { auth } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const OptionsModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {
  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View style={styles.mainContainer}>
        <TouchableOpacity
          style={{marginBottom: 15}}
          onPress={() => setCondition(false)}
        >
          <AntDesign name="arrowleft" size={24} color="#03045E" />
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={() => { router.replace('/start');auth.signOut();}}
        >
          <Text style={styles.buttonText}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Edit profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Add conversation</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8',
    padding: 40
  },
  button: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#03045E',
    padding: 15,
    marginBottom: 15
  }, 
  buttonText: {
    color: '#03045E',
    fontSize: 16
  }
});

export default OptionsModal;