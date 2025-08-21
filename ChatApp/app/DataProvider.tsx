import { useAuth } from "@/Authentification/AuthContext";
import React from "react";

export const DataContext = React.createContext(undefined);

const DataProvider = ({children} : {children: React.ReactNode}) => {

  const [usersList,setUsersList] = React.useState([]);
  const { currentUser } = useAuth();

  /*React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const usersRef = ref(db,``);
    
    const unsubscribe = onValue(usersRef, (snapshot) => {
      if(snapshot.exists()){
        const data = snapshot.val();

        const finalArr = Object.entries(data).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }))

        setUsersList(finalArr);
      }else{
        setUsersList([]);
      }
    }, (error: any) => {
      console.log('Error fetching users: ',error);
    })

    return () => unsubscribe();
 
  },[currentUser]);*/

  return (
    <DataContext.Provider value={{usersList}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;