import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StudentModal from "./StudentModal";

type Student = {
  id: string;
  gradesHistory: any[];
  grades: any[];
  absents: any[];
}

const Student = ({
  id,
  className,
  discipline
} : {
  id: string,
  className: string,
  discipline: string
}) => {

  const [data,setData] = React.useState<Student | {}>({
    id: '',
    gradesHistory: [],
    grades: [],
    absents: []
  });
  const [extend,setExtend] = React.useState(false);
  const [processedData,setProcessedData] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const studentRef = ref(db,`students/${className}/${id}`);

    const unsubscribe = onValue(studentRef, (snapshot) => {
      
      let studentData;
      
      if(snapshot.exists()){
        studentData = snapshot.val();

        setData(studentData);
      }else{
        setData({});
      }

      if(studentData && studentData.id){
        const constant = studentData.id;
        console.log('constant: ',constant);
        const tokens = constant.split('_');
        setProcessedData(tokens);
      }

    }, (error: any) => {
      console.log('Error loading student data: ',error);
    })
    
    return () => unsubscribe();

  },[currentUser]);

  return (
    <View>
      <TouchableOpacity
        onPress={() => setExtend(true)}
        style={styles.button}
      >
        <Text style={styles.info}>{processedData[3]}</Text>
      </TouchableOpacity>

      <StudentModal 
        condition={extend}
        setCondition={setExtend}
        name={processedData[3]}
        className={processedData[2]}
        grade={processedData[1]}
        discipline={discipline}
        id={id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10
  },
  info: {
    fontSize: 16
  }
});

export default Student;