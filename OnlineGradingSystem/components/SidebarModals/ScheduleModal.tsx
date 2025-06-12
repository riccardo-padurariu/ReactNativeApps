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
  const [index,setIndex] = React.useState(0);

  const arr = schedule[index];
  const scheduleArr = arr.map((item,i) => 
    <View style={styles.objectContainer}>
      <Text style={styles.objectText}>{arr[i]}</Text>
    </View>
  )

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
          
          <View style={styles.scheduleMainContainer}>
            <View style={styles.scheduleContainer}>
              <View style={styles.scheduleTitleContainer}>
                <Text style={styles.scheduleTitleText}>{days[index]}</Text>
              </View>
              <View style={styles.scheduleInfoContainer}>
                {scheduleArr}
              </View>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.userButton}
                onPress={() => setIndex(index === 0 ? index : index - 1)}
              >
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.userButton}
                onPress={() => setIndex(index === 4 ? index : index + 1)}
              >
                <AntDesign name="arrowright" size={24} color="black" />
              </TouchableOpacity>
            </View>
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
    height: '25%',
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
  },
  scheduleMainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  scheduleContainer: {
    margin: 20,
    minWidth: 350,
    backgroundColor: '#e8e8e8',
    borderRadius: 10
  },
  scheduleTitleContainer: {
    backgroundColor: '#867CF1',
    alignItems: 'center',
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  scheduleTitleText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  },
  scheduleInfoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15
  },
  objectContainer: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
    padding: 5,
    borderRadius: 7
  },
  objectText: {
    
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: 65, 
    justifyContent: 'space-between'
  },
  userButton: {
    backgroundColor: '#e8e8e8',
    padding: 2
  }
})

export default ScheduleModal;