import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import Notification from '@/components/Notification';
import SidebarModal from '@/components/SidebarModal';
import studentRecords from '@/NotificationData';
import Feather from '@expo/vector-icons/Feather';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DataContext } from '../DataContext';

type Not = {
  name: string;
  date: any;
  time: any;
  duetime: any;
  dueDate: any;
  type: string;
  grade: number;
  discipline: string;
  className: string;
  teacherName: string;
}

const Notifications = () => {

  const [sidebarActive,setSidebarActive] = React.useState(false);
  const [notificationList,setNotificationList] = React.useState<Not[]>();
  const { currentUser } = useAuth();
  const { studentsList, teachersList } = useContext(DataContext);  
  let displayArr: any = [];
  
  React.useEffect(() => {
    if(!currentUser) return;

    const tokens = currentUser.displayName.split('_');

    let firebaseId;
    const currentId = currentUser.displayName[0] === 'T' ? `${currentUser.displayName}` : currentUser.displayName;
    const activeArr = currentUser.displayName[0] === 'T' ? teachersList : studentsList;
    activeArr.forEach((element: any) => {
      if(element.id === currentId) firebaseId = element.firebaseKey;
    });

    if(!activeArr) return;

    const db = getDatabase(app);
    const link = currentUser.displayName[0] === 'T' ? `teachers/${firebaseId}/notifications` : `students/${tokens[1]}${tokens[2]}/${firebaseId}/notifications`;
    const userTasksRef = ref(db, link);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const idData = snapshot.val();
        const idArr = Object.entries(idData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))
        idArr.sort((a: any,b: any) => {
          if(a.date.year > b.date.year) return -1;
          else if(a.date.year < b.date.year) return 1;
          else if(a.date.month > b.date.month) return -1;
          else if(a.date.month < b.date.month) return 1;
          else if(a.date.day > b.date.day) return -1;
          else if(a.date.day < b.date.day) return 1;
          else if(a.time.hour > b.time.hour) return -1;
          else if(a.time.hour < b.time.hour) return 1;
          else if(a.time.minutes > b.time.minutes) return -1;
          else return 1;
        });
        setNotificationList(idArr);
      }else{
        setNotificationList([]);
      }
    }, (error: any) => {
      console.log("Error fetching id's: ", error);
    });

    return () => unsubscribe();

  },[currentUser, teachersList, studentsList]);

  const arr = studentRecords;
  /*const displayArr = arr.map(item => (
    <Notification 
      name={item.name}
      date={item.date}
      time={item.time}
      dueDate={item.dueDate}
      dueTime={item.dueTime}
      type={item.type}
      grade={item.value}
      discipline={item.discipline}
    />
  ))*/

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
        <TouchableOpacity
          onPress={() => setSidebarActive(true)}
        >
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      {(notificationList && notificationList.length === 0) && <Text style={{margin: 20,fontSize: 20,fontWeight: 'bold'}}>No notifications</Text>}

      <ScrollView>
        <View style={{padding: 15}}>
          {notificationList && notificationList.map((item: Not) => (
            <Notification 
              name={item.name}
              date={item.date}
              time={item.time}
              type={item.type}
              grade={item.grade}
              discipline={item.discipline}
              className={item.className}
              teacherName={item.teacherName}
            />
          ))}
        </View>
      </ScrollView>

      <SidebarModal 
        condition={sidebarActive}
        setCondition={setSidebarActive}
      />

    </View>
  ) 
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleContainer: {
    height: '18%',
    backgroundColor: '#867CF1',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  titleText: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  }
})

export default Notifications;