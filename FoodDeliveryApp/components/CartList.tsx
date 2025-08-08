import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, ref, remove } from 'firebase/database';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartList = ({
  cartItems,
  totalPrice,
  adress,
  date,
  id
} : {
  cartItems: any[],
  totalPrice: number,
  adress: string,
  date: any,
  id: string
}) => {

  const { currentUser } = useAuth();
  
  const deleteFromHistory = async() => {
    const db = getDatabase(app);
    const historyRef = ref(db,`users/${currentUser.uid}/cartHistory/${id}`);

    await remove(historyRef);
  }

  return (
    <View style={style.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
        <Text style={style.title}>Order nr: {`${date.day}${date.month}${date.year}${date.hour}${date.minutes}`}</Text>
        <TouchableOpacity
          onPress={deleteFromHistory}
        >
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <Text style={style.subtitle}>Placed on {`${date.day}.${date.month}.${date.year} at ${date.hour}:${date.minutes}`}</Text>
      <Text style={style.subtitle}>Adress: {adress}</Text>

      <ScrollView style={{marginTop: 20,marginBottom: 20}}>
        {cartItems.map((item: any) =>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 10, backgroundColor: '#EFEDED',padding: 10,borderRadius: 15, justifyContent: 'space-between'}}>
            <View style={{display: 'flex',flexDirection: 'column'}}>
              <Text style={{fontFamily: 'ABeeZee',fontSize: 16,marginBottom: 5}}>{item.name}</Text>
              <Text style={{fontFamily: 'ABeeZee', fontSize: 14}}>Price: {item.price}$</Text>
              <Text style={{fontFamily: 'ABeeZee'}}>Quantity: {item.quantity}</Text>
            </View>
            <View>
              <Text style={{fontFamily: 'ABeeZee'}}>Final price: </Text>
              <Text style={{fontFamily: 'ABeeZee'}}>{(item.price*item.quantity).toFixed(2)}$</Text>
            </View>
          </View>
        )}
      </ScrollView>

      <Text style={style.subtitle}>Total price: {totalPrice}$</Text>
    </View>
  )
}

const style = StyleSheet.create({
  mainContainer: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 20
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 18,
    marginBottom: 15
  },
  subtitle: {
    fontFamily: 'ABeeZee',
    fontSize: 15,
  }
});

export default CartList;