import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";

export const DataContext = React.createContext<DataContextType | undefined>(undefined);

export type CartItem = {
  name: string;
  quantity: number;
  price: number;
  id: string;
  location: string;
  index: number
};

export type DataContextType = {
  cartList: CartItem[];
  setCartList: React.Dispatch<React.SetStateAction<CartItem[]>>;
};

const DataProvider = ({children} : {children: React.ReactNode}) => {
  
  const [cartList,setCartList] = React.useState<CartItem[]>([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const cartRef = ref(db,`users/${currentUser.uid}/cart`);

    const unsubscribe = onValue(cartRef, (snapshot) => {
      if(snapshot.exists()){
        const userData = snapshot.val();

        const userArr = Object.entries(userData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }));

        setCartList(userArr);
      }else{
        setCartList([]);
      }
    }, (error: any) => {
      console.log('Error fetching the cart: ',error);
    })

    return () => unsubscribe();

  },[currentUser]);

  return (
    <DataContext.Provider value={{cartList, setCartList}}>
      {children}
    </DataContext.Provider>
  )
}

export default DataProvider;