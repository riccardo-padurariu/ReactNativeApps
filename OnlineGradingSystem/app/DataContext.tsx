import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React, { createContext } from "react";

export const DataContext = createContext();

export const DataProvider = ({children}) => {

  const [id,setId] = React.useState('');
  const [idList,setIdList] = React.useState([]);
  const { currentUser } = useAuth();
  const [studentsList,setStudentsList] = React.useState([]);
  const [teachersList,setTeachersList] = React.useState([]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const userTasksRef = ref(db, `loggedUsers`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const idData = snapshot.val();
        const idArr = Object.values(idData);
        setIdList(idArr);
      }else{
        setIdList([]);
      }
    }, (error: any) => {
      console.log("Error fetching id's: ", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  React.useEffect(() => {
    if(!currentUser) return;

    const tokens = currentUser.displayName.split('_');

    const db = getDatabase(app);
    const userTasksRef = ref(db, `students`);

    const unsubscribe = onValue(userTasksRef, (snapshot) => {
      if(snapshot.exists()){
        const idData = snapshot.val();
        const idArr = Object.values(idData);
        //const finalArr = Object.entries(idArr).map(([key,value]) => ({
        //  ...value,
        //  firebaseKey: key
        //}))
        const finalArr = Object.values(idArr);
        const newArr = finalArr.map((entry) => {
          const [firebaseKey, data] = Object.entries(entry)[0];
          return {firebaseKey, id: data.id}
        })
        setStudentsList(newArr);
      }else{
        setStudentsList([]);
      }
    }, (error: any) => {
      console.log("Error fetching id's: ", error);
    });

    return () => unsubscribe();
  }, [currentUser]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const teacherRef = ref(db,`teachers`);

    const unsubscribe = onValue(teacherRef, (snapshot) => {
      if(snapshot.exists()){
        const teacherData = snapshot.val();
      
        const teachersArr = Object.entries(teacherData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setTeachersList(teachersArr);
      }else{
        setTeachersList([]);
      }
    }, (error: any) => {
      console.log('Error fetching teachers: ',error);
    });

    return () => unsubscribe();

  },[currentUser]);

  return (
    <DataContext.Provider value={{id, setId, idList,setIdList,studentsList,teachersList}}>
      {children}
    </DataContext.Provider>
  )
}