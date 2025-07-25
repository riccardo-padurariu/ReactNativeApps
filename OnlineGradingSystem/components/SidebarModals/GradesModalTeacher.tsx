import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ClassWidget from '../ClassWidget';

const GradesModalTeacher = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const { currentUser } = useAuth();
  const [classList,setClassList] = React.useState([]);
  const [data, setData] = React.useState([]);
  let displayArr: any = [];

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const classesRef = ref(db,`students`);
    
    const unsubscribe = onValue(classesRef, (snapshot) => {
      
      if(snapshot.exists()){
        const classData = snapshot.val();
        const arr = Object.keys(classData);
        setClassList(arr);
        console.log(classList);
      }else{
        setClassList([]);
      }

    }, (error: any) => {
      console.log('Error fetching classes: ',error);
    })

    return () => unsubscribe();

  },[currentUser]);

  React.useEffect(() => {
    const tokens = currentUser.displayName.split('_');
    setData(tokens);
  },[currentUser]);

  return (
    <Modal
      animationType="slide"
      visible={condition}
      style={{flex: 1}}
    >
      <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => setCondition(false)}
          >
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>Grades</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.subtitle}>All classes</Text>
          {classList.map((item: any,index: number) => (
            <ClassWidget
              className={item}
              discipline={data[4]}
            />
            ))
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    
  },
  headerContainer: {
    backgroundColor: '#867CF1',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 10
  },
  infoContainer: {
    padding: 20
  },
  subtitle: {
    fontSize: 19,
    fontWeight: 'bold'
  }
});

export default GradesModalTeacher;