import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Student from './Student';

const ClassWidget = ({
  className,
  discipline
} : {
  className: string,
  discipline: string
}) => {
  
  const [extend,setExtend] = React.useState(false);
  const [classStudentsList,setClassStudentsList] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const listRef = ref(db,`students/${className}`);

    const unsubscribe = onValue(listRef, (snapshot) => {
      if(snapshot.exists()){
        const listData = snapshot.val();

        const arr = Object.entries(listData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))
        const new_arr = arr.filter((item: any) => (item.firebaseKey !== 'homeworks' && item.firebaseKey !== 'general'));
        setClassStudentsList(new_arr);
      }else{
        setClassStudentsList([]);
      }
    }, (error: any) => {
      console.log('Error fetching students: ',error);
    });

    return () => unsubscribe();

  },[currentUser]);

  return (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
        <Text style={styles.title}>{className}</Text>
        <TouchableOpacity
          onPress={() => setExtend(prev => !prev)}
        >
          {extend
          ? <AntDesign name="upcircle" size={24} color="black" />
          : <AntDesign name="downcircle" size={24} color="black" />
          }
        </TouchableOpacity>
      </View>
      
      {extend && 
        <ScrollView>
          {classStudentsList.map((item: any) => (
            <Student 
              id={item.firebaseKey}
              className={className}
              discipline={discipline}
            />
          ))}
        </ScrollView>
      }

    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E8E8E8',
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: '100%'
  },
  title: {
    fontSize: 17
  }
});

export default ClassWidget;