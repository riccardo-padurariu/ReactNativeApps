import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const ScheduleModal = ({
  schedule,
  condition,
  setCondition
} : {
  schedule: any[],
  condition: boolean,
  setCondition: any
}) => {

  const days = ['Monday','Tuesday','Wednsday','Thursday','Friday'];

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View>
        <View>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => setCondition(false)}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.titleText}>Schedule</Text>
        </View>
        


      </View>
      </View>
    </Modal> 
  )
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  titleContainer: {
    height: '50%',
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

export default ScheduleModal;