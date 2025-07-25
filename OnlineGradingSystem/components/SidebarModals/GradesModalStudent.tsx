import { useAuth } from '@/Authentification/AuthContext';
import { stats, subjects } from '@/GradesData';
import AntDesign from '@expo/vector-icons/AntDesign';
import React from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Subject from '../Subject';

const GradesModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {


  const { currentUser } = useAuth();

  const arr = subjects;
  const displayArr = arr.map((item) => (
    <Subject 
      discipline={item.discipline}
    />
  ))

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
          <Text style={styles.titleText}>Grades</Text>
        </View>

        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>Total grades: {stats.numberGrades}</Text>
          <Text style={styles.statsText}>Total absents: {stats.numberAbsents}</Text>
          <Text style={styles.statsText}>Final grade: {stats.finalGrade.toFixed(2)}</Text>
        </View>
        <ScrollView style={{marginBottom: 200}}>{displayArr}</ScrollView>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  },
  statsContainer: {
    backgroundColor: '#867CF1',
    margin: 10,
    borderRadius: 15,
    padding: 12
  },
  statsText: {
    color: 'white',
    fontSize: 17
  }
});

export default GradesModal;