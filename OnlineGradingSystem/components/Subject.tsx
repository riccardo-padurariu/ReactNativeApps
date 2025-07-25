import { DataContext } from "@/app/DataContext";
import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Grade = {
  grade: number;
  date: any;
}

type Absent = {
  day: string;
  month: string;
}

const Subject = ({
  discipline
} : {
  discipline: string;
}) => {

  const { currentUser } = useAuth();
  const { studentsList } = useContext(DataContext);
  const [grades,setGrades] = React.useState<Grade[]>();
  const [absents,setAbsents] = React.useState<Absent[]>();
  let displayGrades: any = [], displayAbsents: any = [];
  let grade = 0;

  React.useEffect(() => {
    if(!currentUser) return;

    const tokens = currentUser.displayName.split('_');

    let firebaseId;
    studentsList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
    });

    const db = getDatabase(app);
    const link = currentUser.displayName[0] === 'T' ? `teachers` : `students/${tokens[1]}${tokens[2]}/${firebaseId}/${discipline}/grades`;
    const studentRef = ref(db,link);

    const unsubscribe = onValue(studentRef, (snapshot) => {
      if(snapshot.exists()){
        const gradesData = snapshot.val();

        const gradesArr = Object.entries(gradesData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setGrades(gradesArr);
      }else{
        setGrades([]);
      }

      if(Array.isArray(grades)){
        grade = 0;
        grades.forEach(element => {
          grade+=Number(element.grade);
        });

        grade /= grades.length;
      }

    }, (error: any) => {
      console.log("Error fetching grades: ", error);
    });

    return () => unsubscribe();

  },[currentUser]);

  React.useEffect(() => {
    if(!currentUser) return;

    const tokens = currentUser.displayName.split('_');

    let firebaseId;
    studentsList.forEach((element: any) => {
      if(element.id === currentUser.displayName) firebaseId = element.firebaseKey;
    });

    const db = getDatabase(app);
    const link = currentUser.displayName[0] === 'T' ? `teachers` : `students/${tokens[1]}${tokens[2]}/${firebaseId}/${discipline}/absents`;
    const studentRef = ref(db,link);

    const unsubscribe = onValue(studentRef, (snapshot) => {
      if(snapshot.exists()){
        const absentsData = snapshot.val();

        const absentsArr = Object.entries(absentsData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setAbsents(absentsArr);
      }else{
        setAbsents([]);
      }

    }, (error: any) => {
      console.log("Error fetching absents: ", error);
    });

    return () => unsubscribe();

  },[currentUser]);

  

  const [showGrades,setShowGrades] = React.useState(true);
  const [showAbsents,setShowAbsents] = React.useState(false);
  

  const handle = (c1: boolean,c2: boolean) => {
    setShowAbsents(c2);
    setShowGrades(c1);
  }

  const getFinalGrade = () => {
    if(grades){
      grade = 0;
      grades.forEach(element => {
        grade+=Number(element.grade);
      });

      grade /= grades.length;
    }
    return grade.toFixed(2);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{discipline}</Text>
      </View>
      <View>
        <View style={styles.interactionContainer}>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => handle(true,false)}
          >
            <Text style={styles.interactionText}>Grades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => handle(false,true)}
          >
            <Text style={styles.interactionText}>Absents</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          {showGrades && grades && grades.map((item) => (
          <View style={styles.container}>
            <Text style={styles.containerText}>{item.grade}/{item.date.day}.{item.date.month}</Text>
          </View>
        ))}
          {showAbsents && absents && absents.map((item) => (
          <View style={styles.container}>
            <Text style={styles.containerText}>
              {item.day}.{item.month}
            </Text>
          </View>
        ))}
        </View>
        <Text style={styles.finalGrade}>Final grade: {(grades && grades.length === 0) ? 'No grades yet' : String(getFinalGrade())}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e8e8e8',
    margin: 10,
    borderRadius: 15
  },
  titleContainer: {
    backgroundColor: '#867CF1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 8
  },
  title: {
    marginLeft: 20,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  interactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    width: 140,
    justifyContent: 'space-between',
    marginTop: 10
  },
  interactionButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10
  },
  interactionText: {
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    maxWidth: 80,
    alignItems: 'center',
    marginRight: 10
  },
  containerText: {

  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  finalGrade: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Subject;