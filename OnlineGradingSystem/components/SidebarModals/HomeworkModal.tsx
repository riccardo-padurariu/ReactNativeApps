import informaticsAssignments from '@/HomeworkData';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Homework from '../Homework';


const HomeworkModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const arr = informaticsAssignments;

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

        <ScrollView style={{marginBottom: 85}}>
          {arr.map(item => (
            <Homework
              discipline={item.discipline}
              name={item.name}
              title={item.title}
              date={item.date}
              time={item.time}
              dueDate={item.dueDate}
              dueTime={item.dueTime}
            />
          ))}
        </ScrollView>
        
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  titleContainer: {
    height: '10%',
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