import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from "react";
import { ActivityIndicator, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddModal from './AddModal';

const StudentModal = ({
  condition,
  setCondition,
  name,
  grade,
  className,
  discipline,
  id
} : {
  condition: boolean,
  setCondition: any,
  name: string,
  grade: string,
  className: string,
  discipline: string,
  id: string
}) => {

  const [gradesList,setGradesList] = React.useState([]);
  const [absentsList,setAbsentsList] = React.useState([]);
  const [finalGrade,setFinalGrade] = React.useState(0);
  const [absents,setAbsents] = React.useState(0);
  const { currentUser } = useAuth();

  const [loadingGrade,setLoadingGrades] = React.useState(false);
  const [loadingAbsent,setLoadingAbsent] = React.useState(false);

  const [isSetting,setIsSetting] = React.useState(false);
  const [type,setType] = React.useState('');

  React.useEffect(() => {
    if(!currentUser) return;

    setLoadingGrades(true);

    const db = getDatabase(app);
    const disciplineRef = ref(db,`students/${grade}${className}/${id}/${discipline}/grades`);

    const unsubscribe = onValue(disciplineRef, (snapshot) => {
      if(snapshot.exists()){
        const disciplineData = snapshot.val();

        const gradesArr = Object.entries(disciplineData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setGradesList(gradesArr);
      }else{
        setGradesList([]);
      }
      setLoadingGrades(false);
    }, (error: any) => {
      console.log('Error fetching grades: ',error);
    });

    return () => unsubscribe();

  },[currentUser, grade, className, name]);

  React.useEffect(() => {
    if(!currentUser) return;

    setLoadingAbsent(true);

    const db = getDatabase(app);
    const disciplineRef = ref(db,`students/${grade}${className}/${id}/${discipline}/absents`);

    const unsubscribe = onValue(disciplineRef, (snapshot) => {
      if(snapshot.exists()){
        const disciplineData = snapshot.val();

        const absentsArr = Object.entries(disciplineData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))
        setAbsents(absentsArr.length);
        setAbsentsList(absentsArr);
      }else{
        setAbsentsList([]);
      }
      setLoadingAbsent(false);
    }, (error: any) => {
      console.log('Error fetching grades: ',error);
    });

    return () => unsubscribe();

  },[currentUser, grade, className, name]);

  const getFinalGrade = () => {

    let grade = 0;

    if(gradesList){
      grade = 0;
      gradesList.forEach((element: any) => {
        grade+=Number(element.grade);
      });

      grade /= gradesList.length;
    }
    return grade.toFixed(2);
  }

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => setCondition(false)}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>
            Student: {name} {grade}{className}
          </Text>
        </View>
        <View style={styles.infoContainer}> 
          <View style={styles.infoHeader}>
            <Text style={styles.subtitle}>{discipline}</Text>
          </View>
          <View style={styles.section}>
            <View style={styles.flex}>
              <Text style={styles.sectionTitle}>Grades</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  setType('grade');
                  setIsSetting(true);
                }}
              >
                <Text style={styles.addText}>Add grade</Text>
              </TouchableOpacity>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {loadingGrade ? 

                <ActivityIndicator size={'small'} color={'#867CF1'}/>            
              : gradesList.length === 0
              ? <Text>No grades</Text>
              : gradesList.map((item: any) => (
                <View style={{backgroundColor: 'white',padding: 5,marginRight: 5,borderRadius: 8}}>
                   <Text>{item.grade}/{item.date.day}.{item.date.month}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <View style={styles.flex}>
              <Text style={styles.sectionTitle}>Absent</Text>
              <TouchableOpacity 
                style={styles.addButton}
                onPress={() => {
                  setType('absent');
                  setIsSetting(true);
                }}  
              >
                <Text style={styles.addText}>Add absent</Text>
              </TouchableOpacity>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
              {loadingAbsent ? 
              
                <ActivityIndicator size={'small'} color={'#867CF1'} />

              : absentsList.length === 0
              ? <Text>No absents</Text>
              : absentsList.map((item: any) => (
                <View style={{backgroundColor: 'white',padding: 5,marginRight: 5,borderRadius: 8}}>
                  <Text>{item.day}.{item.month}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Final grade: {gradesList.length === 0 ? 'No grades' : String(getFinalGrade())}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Total absents: {absents}</Text>
          </View>
        </View>
      </View>

      <AddModal 
        condition={isSetting}
        setCondition={setIsSetting}
        type={type}
        name={name}
        grade={grade}
        className={className}
        id={id}
      />

    </Modal>
  );
} 

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#867CF1',
    padding: 20
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10
  },
  infoContainer: {
    margin: 30,
    borderRadius: 15,
    backgroundColor: '#E8E8E8',
    paddingBottom: 15
  },
  infoHeader: {
    backgroundColor: '#867CF1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 5,
    alignItems: 'center'
  },
  subtitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  section: {
    margin: 10
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500'
  },
  addButton: {
    backgroundColor: '#867CF1',
    padding: 5,
    borderRadius: 7
  },
  addText: {
    color: 'white'
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 20
  }
});

export default StudentModal;