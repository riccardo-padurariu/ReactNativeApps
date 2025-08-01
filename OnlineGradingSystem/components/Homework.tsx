import { DataContext } from "@/app/DataContext";
import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { getDatabase, onValue, ref, remove } from "firebase/database";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Homework = ({
  discipline,
  name,
  title,
  date,
  time,
  dueDate,
  dueTime,
  className,
  firebaseKey
} : {
  discipline: string,
  name: string,
  title: string,
  date: any,
  time: any,
  dueDate: any,
  dueTime: any,
  className: string,
  firebaseKey: string
}) => {

  const { currentUser } = useAuth();
  const { teachersList } = useContext(DataContext);
  const [homeworks,setHomeworks] = React.useState([]);
  const [teacherNot,setTeacherNot] = React.useState([]);
  const [general,setGeneral] = React.useState([]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const hmRef = ref(db,`students/${className}/homeworks`);
    
    const unsubscribe = onValue(hmRef, (snapshot) => {
      if(snapshot.exists()){
        const hmData = snapshot.val();
        const hmArr = Object.entries(hmData).map(([key,value]) => ({
          ...value,
          firebaseKey: key,
        }));
        setHomeworks(hmArr);
      }else{
        setHomeworks([]);
      }
    }, (error: any) => {
      console.log('Error fetching homeworks: ',error);
    })

    return () => unsubscribe();

  },[currentUser, className]);

  React.useEffect(() => {
    if(!currentUser) return;

    let firebaseId;
    teachersList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;      
    });

    const db = getDatabase(app);
    const hmRef = ref(db,`teachers/${firebaseId}/notifications`);
    
    const unsubscribe = onValue(hmRef, (snapshot) => {
      if(snapshot.exists()){
        const hmData = snapshot.val();
        const hmArr = Object.entries(hmData).map(([key,value]) => ({
          ...value,
          firebaseKey: key,
        }));
        console.log(hmArr);
        setTeacherNot(hmArr);
      }else{
        setTeacherNot([]);
      }
    }, (error: any) => {
      console.log('Error fetching notifications: ',error);
    })

    return () => unsubscribe();

  },[currentUser, teachersList]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const hmRef = ref(db,`students/${className}/general`);
    
    const unsubscribe = onValue(hmRef, (snapshot) => {
      if(snapshot.exists()){
        const hmData = snapshot.val();
        const hmArr = Object.entries(hmData).map(([key,value]) => ({
          ...value,
          firebaseKey: key,
        }));
        console.log(hmArr);
        setGeneral(hmArr);
      }else{
        setGeneral([]);
      }
    }, (error: any) => {
      console.log('Error fetching notifications: ',error);
    })

    return () => unsubscribe();

  },[currentUser, className]);

  const deleteHmStudent = async() => {

    const current_date = new Date();
    let firebaseId;
    homeworks.forEach((item: any) => {
      if(item.id === `${currentUser.displayName}_${className}_${title}`) firebaseId = item.firebaseKey;
    })

    const db = getDatabase(app);
    const deleteRef = ref(db,`students/${className}/homeworks/${firebaseId}`);

    console.log('student hm id: ',deleteRef);
    
    await remove(deleteRef);
  }

  const deleteHmTeacher = async () => {
    let firebaseId;
    teachersList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;      
    });

    const db = getDatabase(app);
    const deleteRef = ref(db,`teachers/${firebaseId}/homeworks/${firebaseKey}`);

    await remove(deleteRef);
  }

  const deleteTeacherNot = async() => {

    let finalId;
    teacherNot.forEach((item: any) => {
      if(item.id === `${currentUser.displayName}_${className}_${title}`) finalId = item.firebaseKey;
    });

    let tId;
    teachersList.forEach((element: any) => {
      if(element.id === currentUser.displayName) tId = element.firebaseKey;
    });

    const db = getDatabase(app);
    const tRef = ref(db,`teachers/${tId}/notifications/${finalId}`);

    console.log('teacher hm id not: ',tRef);

    await remove(tRef);
  }

  const deleteStudentNot = async() => {

    let firebaseId;
    general.forEach((item: any) => {
      if(item.id === `${currentUser.displayName}_${className}_${title}`) firebaseId = item.firebaseKey;
    })

    const db = getDatabase(app);
    const studentRef = ref(db,`students/${className}/general/${firebaseId}`);

    await remove(studentRef);
  }

  const deleteHomework = async() => {
    try{
      await deleteHmTeacher();
      await deleteHmStudent();
      await deleteTeacherNot();
      await deleteStudentNot();
    }catch(error: any){
      console.log('Error deleting homework: ',error);
    }
  }


  return (
    <TouchableOpacity
      style={styles.mainContainer}
    >
      <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between'}}>
        <View style={styles.discipline}>
          <Text style={styles.disciplineText}>{discipline}</Text>
        </View>
        {currentUser.displayName[0] === 'T' && 
          <TouchableOpacity 
            style={{padding: 10}}
            onPress={deleteHomework}
          >
            <MaterialIcons name="cancel" size={28} color="#867CF1" />
          </TouchableOpacity>
        }
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{currentUser.displayName[0] === 'T' ? `You added the homework ${title} to the class ${className}` : `Professor ${name} added the homework: ${title}`}</Text>
        <Text>Due on: {dueDate.day < 10 ? `0${dueDate.day}` : dueDate.day}.{dueDate.month < 10 ? `0${dueDate.month}` : `${dueDate.month}`}.{dueDate.year} at {dueTime.hour < 10 ? `0${dueTime.hour}` : dueTime.hour}:{dueTime.minutes < 10 ? `0${dueTime.minutes}` : `${dueTime.minutes}`}</Text>
      </View>
      <View style={styles.postDate}>
        <Text style={styles.postDateText}>On {date.day}.{date.month < 10 ? `0${date.month}` : `${date.month}`}.{date.year} at {time.hour}:{time.minutes < 10 ? `0${time.minutes}` : `${time.minutes}`}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    margin: 10
  },
  discipline: {
    backgroundColor: '#867CF1',
    maxWidth: 190,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    padding: 5,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center'
  },
  disciplineText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600
  },
  infoContainer: {
    marginLeft: 15,
    marginTop: 10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  postDate: {
    alignItems: 'flex-end',
    padding: 10
  },
  postDateText: {
    color: '#9C9C9C'
  }
});

export default Homework;