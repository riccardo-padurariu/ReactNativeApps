import { DataContext } from '@/app/DataContext';
import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import { subjects } from '@/GradesData';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useContext } from "react";
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
  const { studentsList } = useContext(DataContext); 
  const [subjectsList,setSubjectsList] = React.useState([]);
  const [absents,setAbsents] = React.useState(0);
  const [grade,setGrade] = React.useState(0);
  const [finalGrade,setFinalGrade] = React.useState(0);

  const arr = subjects;
  const displayArr = arr.map((item) => (
    <Subject 
      discipline={item.discipline}
    />
  ));

  React.useEffect(() => {
    if(!currentUser) return;
    
    let firebaseId;
    studentsList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
    });

    const tokens = currentUser.displayName.split('_');

    const db = getDatabase(app);
    const studentRef = ref(db,`students/${tokens[1]}${tokens[2]}/${firebaseId}`);
    
    const unsubscribe = onValue(studentRef, (snapshot) => {
      if(snapshot.exists()){
        const studentData = snapshot.val();

        const studentArr = Object.entries(studentData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }));

        const finalArr = studentArr.filter((item: any) => (item.firebaseKey !== 'gradesHistory' && item.firebaseKey !== 'id' && item.firebaseKey !== 'notifications'));

        setSubjectsList(finalArr);
      }else{
        setSubjectsList([]);
      }
    }, (error: any) => {
      console.log('Error fecthing subjects: ',error);
    })

    return () => unsubscribe();

  },[currentUser]);

  React.useEffect(() => {
    if(!subjectsList) return;

    let cntA = 0;
    let cntG = 0;
    let cntF = 0;

    subjectsList.forEach((item: any) => {
      if(item.absents) cntA += item.absents.length;
      if(item.grades){
        console.log(grade);
        let g = 0;
        const new_grades = Object.values(item.grades);
        cntG += new_grades.length;
        new_grades.forEach((item: any) => {
          g += item.grade;
        });
        const f = g / new_grades.length;
        cntF += Math.round(f);
      }
    });

    setAbsents(cntA);
    setGrade(cntG);
    setFinalGrade(cntF);

  },[subjectsList]);

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
          <Text style={styles.statsText}>Total grades: {grade}</Text>
          <Text style={styles.statsText}>Total absents: {absents}</Text>
          <Text style={styles.statsText}>Final grade: {(finalGrade/subjectsList.length).toFixed(2)}</Text>
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