import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Homework from '../Homework';


const HomeworkModal = ({
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
      <View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => setCondition(false)}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Homeworks</Text>
        </View>

        <Homework 
          discipline='Informatics'
          name='John Pork'
          title='Graphs'
          date={{
            day: '11',
            month: '06',
            year: '2025'
          }}
          time={{
            hour: '21',
            minutes: '00'
          }}
          dueDate={{
            day: '11',
            month: '06',
            year: '2025'
          }}
          dueTime={{
            hour: '21',
            minutes: '00'
          }}
        />
        
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  titleContainer: {
    height: '30%',
    backgroundColor: '#867CF1',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  }
})

export default HomeworkModal;