import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GradesModal from './SidebarModals/GradesModal';
import HomeworkModal from './SidebarModals/HomeworkModal';
import ScheduleModal from './SidebarModals/ScheduleModal';

const SidebarModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const [homeworkActive,setHomeworkActive] = React.useState(false);
  const [scheduleActive,setScheduleActive] = React.useState(false);
  const [gradeACtive,setGradesActive] = React.useState(false);

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View style={styles.mainContainer}>
        <View style={styles.titleContainer}>
          <TouchableOpacity
            onPress={() => setCondition(false)}
            style={styles.backButton}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Padurariu Riccardo</Text>
        </View>

        <View style={styles.routeContainer}>
          <TouchableOpacity
            onPress={() => setHomeworkActive(true)}
          >
            <View style={styles.route}>
              <Text style={styles.routeText}>Homeworks</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => setScheduleActive(true)}
          >
            <View style={styles.route}>
              <Text style={styles.routeText}>Schedule</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setGradesActive(true)}
          >
            <View style={styles.route}>
              <Text style={styles.routeText}>Grades</Text>
            </View>
          </TouchableOpacity>
          
        </View>

        <HomeworkModal 
          condition={homeworkActive}
          setCondition={setHomeworkActive}
        />

        <ScheduleModal 
          condition={scheduleActive}
          setCondition={setScheduleActive}
          schedule={[
            [
              'Physics',
              'Maths',
              'Economics',
              'English',
              'Maths',
              'PE'
            ],
            [
              'Informatics',
              'Informatics',
              'Informatics',
              'Geography',
              'Maths',
              'Romanian'
            ],
            [
              'Chimie',
              'English',
              'French',
              'Physics',
              'French',
              'Romanian'
            ],
            [
              'Informatics',
              'Informatics',
              'Informatics',
              'Biology',
              'Maths',
              'Physics'
            ],
            [
              'History',
              'Romanian',
              'History of jews',
              'Maths',
              'Romanian',
              'Religion'
            ]
          ]}
        />

        <GradesModal 
          condition={gradeACtive}
          setCondition={setGradesActive}
        /> 

      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#867CF1',
    padding: 30
  },
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    marginLeft: 20,
    fontSize: 23,
    color: 'white',
    fontWeight: 'bold'
  },
  backButton: {

  },
  route: {
    backgroundColor: '#6F65DA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  routeText: {
    fontSize: 16,
    color: 'white',
    fontWeight: '600',
    marginLeft: 10
  },
  routeContainer: {
    marginTop: 50
  }
})

export default SidebarModal;