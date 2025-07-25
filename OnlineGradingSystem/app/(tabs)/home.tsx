import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import RecentGradeAdded from '@/components/RecentGradeAdded';
import SidebarModal from '@/components/SidebarModal';
import Feather from '@expo/vector-icons/Feather';
import { getDatabase, onValue, ref } from 'firebase/database';
import React, { useContext } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataContext } from '../DataContext';

type Grade = {
  name: string,
  discipline: string,
  date: any,
  time: any,
  grade: number,
  teacherName: string
};

export default function HomeScreen() {

  const [sidebarActive,setSidebarActive] = React.useState(false);
  const [recentGrades,setRecentGrades] = React.useState<Grade[]>();
  const { currentUser } = useAuth();
  const { studentsList, teachersList } = useContext(DataContext);

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

    console.log(currentId);
    

    const db = getDatabase(app);
    const link = currentUser.displayName[0] === 'T' ? `teachers/${firebaseId}/gradesHistory` : `students/${tokens[1]}${tokens[2]}/${firebaseId}/gradesHistory`;
    const userTasksRef = ref(db, link);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const idData = snapshot.val();
        const idArr = Object.entries(idData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }));
        console.log('teacher arr: ',idArr);
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
        setRecentGrades(idArr);
      }else{
        setRecentGrades([]);
      }
    }, (error: any) => {
      console.log("Error fetching grades history: ", error);
    });

    return () => unsubscribe();

  },[currentUser,teachersList,studentsList]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome back {currentUser.displayName[0] === 'S' ? 'student' : currentUser.displayName[0] === 'T' ? 'teacher' : 'parent'}!</Text>
        <TouchableOpacity
          onPress={() => setSidebarActive(true)}
        >
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.subtitle}>{recentGrades && (recentGrades.length === 0 ? 'No grade history' : 'Grades history')}</Text>

        <ScrollView>
          {recentGrades && recentGrades.map(item => (
          <RecentGradeAdded 
            name={item.name}
            discipline={item.discipline}
            date={item.date}
            time={item.time}
            grade={item.grade}
            teacherName={item.teacherName}
          />
        ))}
        </ScrollView>


      </View>

      <SidebarModal 
        condition={sidebarActive}
        setCondition={setSidebarActive}
      />

    </View>
  );
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