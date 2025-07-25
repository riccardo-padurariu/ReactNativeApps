import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import informaticsAssignments from '@/HomeworkData';
import { DataContext } from '@/app/DataContext';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useContext } from "react";
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddHomework from '../AddHomework';
import Homework from '../Homework';


type Hm = {
  name: string;
  date: any;
  time: any;
  dueDate: any;
  dueTime: any;
  grade: number;
  discipline: string;
  title: string;
};

const HomeworkModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const arr = informaticsAssignments;
  const { currentUser } = useAuth();
  const { studentsList, teachersList } = useContext(DataContext);
  const [homeworkList,setHomeworkList] = React.useState<Hm[]>();
  const [isAdding,setIsAdding] = React.useState(false);
  let displayArr: any = [];

  React.useEffect(() => {
    if(!currentUser) return;

    const tokens = currentUser.displayName.split('_');

    let firebaseId;
    const currentId = currentUser.displayName;
    const activeArr = currentUser.displayName[0] === 'T' ? teachersList : studentsList;
    activeArr.forEach((element: any) => {
      if(element.id === currentId) firebaseId = element.firebaseKey;
    });

    if(!activeArr) return;

    const db = getDatabase(app);
    const link = currentUser.displayName[0] === 'T' ? `teachers/${firebaseId}/homeworks` : `students/${tokens[1]}${tokens[2]}/homeworks`;   
    const userTasksRef = ref(db, link);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const idData = snapshot.val();
        const idArr = Object.entries(idData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))
        setHomeworkList(idArr);
      }else{
        setHomeworkList([]);
      }
    }, (error: any) => {
      console.log("Error fetching id's: ", error);
    });

    return () => unsubscribe();

  },[currentUser, teachersList, studentsList]);

  return (
    <Modal
      animationType="slide"
      visible={condition}
    >
      <View>
        <View style={styles.titleContainer}>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => setCondition(false)}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.titleText}>Homeworks</Text>
          </View>
          <TouchableOpacity
            onPress={() => setIsAdding(true)}
          >
            <AntDesign name="plus" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {homeworkList && homeworkList.length === 0 && <Text style={{margin: 20,fontSize: 20,fontWeight: 'bold'}}>No homeworks</Text>}

        <ScrollView style={{marginBottom: 85}}>
          {homeworkList && homeworkList.map((item: any) => (
          <Homework
            discipline={item.discipline}
            name={item.name}
            title={item.title}
            date={item.date}
            time={item.time}
            dueDate={item.dueDate}
            dueTime={item.dueTime}
            className={item.className}
          />
        ))}
        </ScrollView>
      </View>

      <AddHomework 
        condition={isAdding}
        setCondition={setIsAdding}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {

  },
  titleContainer: {
    height: '22%',
    backgroundColor: '#867CF1',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 20
  }
})

export default HomeworkModal;