import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import CartList from "@/components/CartList";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartHistory = () => {
  
  const { currentUser } = useAuth();
  const [cartHistory,setCartHistory] = React.useState([]);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const cartHistoryRef = ref(db,`users/${currentUser.uid}/cartHistory`);

    const unsubscribe = onValue(cartHistoryRef, (snapshot) => {
      if(snapshot.exists()){
        const historyData = snapshot.val();

        const historyArr = Object.entries(historyData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }));

        setCartHistory(historyArr);
      }else{
        setCartHistory([]);
      }
    }, (error: any) => {
      console.log('Error fetching cart history: ',error);
    });

    return () => unsubscribe();

  },[currentUser]);

  return (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Cart History</Text>
      </View>
      {cartHistory.length !== 0 
      ? cartHistory.map((item: any) => 
          <CartList 
            cartItems={item.cartContent}
            adress={item.adress}
            totalPrice={item.totalPrice}
            date={item.date}
            id={item.firebaseKey}
          />
        )
      : <Text style={styles.title}>No cart history</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 22,
    margin: 10
  }
});

export default CartHistory;