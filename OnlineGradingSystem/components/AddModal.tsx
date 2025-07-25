import { DataContext } from '@/app/DataContext';
import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getDatabase, push, ref } from 'firebase/database';
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const AddModal = ({
  condition,
  setCondition,
  type,
  name,
  className,
  grade,
  id
} : {
  condition: boolean,
  setCondition: any,
  type: string,
  name: string,
  className: string,
  grade: string,
  id: string
}) => {

  const arr = [1,2,3,4,5,6,7,8,9,10];
  const [newArr,setNewArr] = React.useState(arr.map((item) => ({value: item,selected: false})));
  const [selectedGrade,setSelectedGrade] = React.useState(0);
  const { currentUser } = useAuth();
  const { teachersList, studentsList } = useContext(DataContext);

  console.log('student list: ',studentsList);

  const select = (index: any) => {
    const a = newArr.map((item,i) => ({
      ...item,
      selected: i === index
    }))
    setNewArr(a);
    a.forEach((item) => {if(item.selected) setSelectedGrade(item.value)}) 
  }

  const addToTeacher = async() => {

    try{
      let firebaseId;
      teachersList.forEach((element: any) => {
        if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
      });

      const db = getDatabase(app);
      const teacherRef = ref(db,`teachers/${firebaseId}/gradesHistory`);
      const date = new Date();
      const tokens = currentUser.displayName.split('_');

      const data = {
        grade: selectedGrade,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4] 
      };

      await push(teacherRef,data);
    }catch(error: any){
      alert(`Error pushing data: ${error}`);
    }

  }

  const addToStudent = async() => {

    try{

      const db = getDatabase(app);
      const teacherRef = ref(db,`students/${grade}${className}/${id}/gradesHistory`);
      const date = new Date();
      const tokens = currentUser.displayName.split('_');
      const data = {
        grade: selectedGrade,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4]
      };

      await push(teacherRef,data);
    }catch(error: any){
      alert(`Error pushing data: ${error}`);
    }

  }

  const addToTeacherNot = async() => {
    try{
      let firebaseId;
      teachersList.forEach((element: any) => {
        if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
      });

      const db = getDatabase(app);
      const teacherRef = ref(db,`teachers/${firebaseId}/notifications`);
      const date = new Date();
      const tokens = currentUser.displayName.split('_');
      const data = {
        grade: selectedGrade,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4],
        className: className,
        type: 'grade'
      };

      await push(teacherRef,data);
    }catch(error: any){
      alert(`Error pushing data: ${error}`);
    }
  }

  const addToStudentGrade = async() => {

    try{

      const tokens = currentUser.displayName.split('_');
      const db = getDatabase(app);
      const teacherRef = ref(db,`students/${grade}${className}/${id}/${tokens[4]}/grades`);
      const date = new Date();
      const data = {
        grade: selectedGrade,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
        }
      };

      await push(teacherRef,data);
    }catch(error: any){
      alert(`Error pushing data: ${error}`);
    }

  }

  const addToStudentNot = async() => {

    try{

      const db = getDatabase(app);
      const teacherRef = ref(db,`students/${grade}${className}/${id}/notifications`);
      const date = new Date();
      const tokens = currentUser.displayName.split('_');
      const data = {
        grade: selectedGrade,
        date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4],
        type: 'grade'
      };

      await push(teacherRef,data);
    }catch(error: any){
      alert(`Error pushing data: ${error}`);
    }

  }

  const addGrade = () => {
    addToTeacher().then(() => addToTeacherNot().then(() => addToStudent().then(() => addToStudentGrade().then(addToStudentNot))));
    setCondition(false);
  }

  const addAbsentTeacher = async() => {

    let firebaseId;
    teachersList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
    });

    const tokens = currentUser.displayName.split('_');
    const db = getDatabase(app);
    const absentRef = ref(db,`teachers/${firebaseId}/notifications`);
    const date = new Date();
    const data = {
      date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4],
        type: 'absent'
    };

    await push(absentRef,data);
  }

  const addAbsentStudent = async() => {

    const tokens = currentUser.displayName.split('_');

    const db = getDatabase(app);
    const studentRef = ref(db,`students/${grade}${className}/${id}/notifications`);
    const date = new Date();
    const data = {
      date: {
          day: date.getDate(),
          month: date.getMonth() + 1,
          year: date.getFullYear()
        },
        time: {
          minutes: date.getMinutes(),
          hour: date.getHours()
        },
        teacherName: tokens[3],
        name: name,
        discipline: tokens[4],
        type: 'absent'
    };

    await push(studentRef,data);
  }

  const addAbsentStudentSubject = async() => {
    const tokens = currentUser.displayName.split('_');

    const db = getDatabase(app);
    const studentRef = ref(db,`students/${grade}${className}/${id}/${tokens[4]}/absents`);
    const date = new Date();
    const data = {
      day: date.getDate(),
      month: date.getMonth() + 1,
    };

    await push(studentRef,data);
  }

  const addAbsent = () => {
    addAbsentTeacher().then(() => addAbsentStudent().then(() => addAbsentStudentSubject()));
    setCondition(false);
  }

  return (
    <Modal
      animationType="slide"
      visible={condition}
      transparent={true}
    >
      <View style={styles.cover}></View>
      <View style={styles.mainContainer}>
        {type === 'grade' 
        ? <View style={styles.infoContainer}>
            <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.title}>{type === 'grade' ? 'Add grade' : 'Add absent'}</Text>
              <TouchableOpacity
                onPress={() => setCondition(false)}
              >
                <MaterialIcons name="cancel" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <Text style={{marginTop: 10,fontSize: 16, fontWeight: '500'}}>Select grade: </Text>
            <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'space-between', marginTop: 15}}>
              {newArr.map ((item: any) => (
                <TouchableOpacity
                  style={item.selected ? styles.selected : styles.normal}
                  onPress={() => select(Number(item.value) - 1)}
                >
                  <Text style={item.selected ? styles.selectedText : styles.normalText}>{item.value}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{fontSize: 16}}>Selected grade: {selectedGrade}</Text>
            <TouchableOpacity
              style={styles.addGradeButton}
              onPress={addGrade}
            >
              <Text style={styles.addGradeText}>Add grade</Text>
            </TouchableOpacity>
          </View>
        : <View style={type === 'grade' ? {backgroundColor: 'white',padding: 25,width: '88%',height: '30%',borderRadius: 15} : {backgroundColor: 'white',padding: 25,width: '88%',height: '19%',borderRadius: 15}}>
          <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center',justifyContent: 'flex-start'}}>
            <Text style={{fontSize: 17,fontWeight: 'bold'}}>Do you you want to add absent to student {name}?</Text>
            <TouchableOpacity
              onPress={() => setCondition(false)}
              style={{marginLeft: -20}}
            >
              <MaterialIcons name="cancel" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={addAbsent}
            style={styles.addGradeButton}
          >
            <Text style={styles.addGradeText} >Add absent</Text>
          </TouchableOpacity>
        </View>
        }
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,alignItems: 'center',justifyContent: 'center'
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 25,
    width: '88%',
    height: '30%',
    borderRadius: 15
  },
  title: {
    fontSize: 19,
    fontWeight: 'bold'
  },
  normal: {
    padding: 10
  },
  normalText: {
    color: '#867CF1'
  },
  selected: {
    backgroundColor: '#867CF1',
    padding: 10,
    borderRadius: 5,
  },
  selectedText: {
    color: 'white',
    fontWeight: 'bold'
  },
  addGradeButton: {
    backgroundColor: '#867CF1',
    padding: 10,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: 10
  },
  addGradeText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500'
  }
});

export default AddModal;