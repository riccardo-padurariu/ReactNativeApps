import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import { router } from 'expo-router';
import { getDatabase, push, ref, remove } from 'firebase/database';
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "./DataProvider";

const Checkout = () => {

  const { cartList } = useContext(DataContext);
  const { currentUser } = useAuth();
  const [adress,setAdress] = React.useState('None');
  const [adding,setAdding] = React.useState(false);
  const [edit,setEdit] = React.useState('');

  const getTotalPrice = () => {
    let sum = 0;
    cartList.forEach((element: any) => {
      sum += element.price*element.quantity;
    });
    return sum;
  }

  const addToHistory = async() => {
    const db = getDatabase(app);
    const cartHistory = ref(db,`users/${currentUser.uid}/cartHistory`);
    const date = new Date();
    const data = {
      cartContent: cartList,
      totalPrice: getTotalPrice() < 200 ? (getTotalPrice()+30).toFixed(2) : (getTotalPrice()+15).toFixed(2),
      adress: adress,
      date: {
        day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
        month: date.getMonth() + 1 < 10 ? `0${date.getMonth()}` : date.getMonth(),
        year: date.getFullYear(),
        hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
        minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      }
    }

    await push(cartHistory,data);
  } 

  const removeCart = async() => {
    const db = getDatabase(app);
    const cartRef = ref(db,`users/${currentUser.uid}/cart`);

    await remove(cartRef);
  }

  const handleHistory = async() => {
    try{
      await addToHistory();
      await removeCart();

      router.replace('/finished-order');
    }catch(error: any){
      console.log('Error pushing the cart to history: ', error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View>
        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Check-out</Text>
        </View>
        {cartList.map((item: any) => (
          <View style={styles.mainItemContainer}>
            <View style={styles.flex}>
              <View style={styles.flex}>
                <Text style={{fontSize: 17,fontWeight: '500',fontFamily: 'ABeeZee'}}>{item.name}</Text>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                  <Entypo name="location-pin" size={24} color="#B5B5B5" />
                  <Text style={styles.label}>{item.location}</Text>
                </View>
              </View>
              <View style={styles.flex}>
                <Text style={styles.subtitle}>Price(per portion): {item.price}$</Text>
                <Text style={styles.subtitle}>Quantity: {item.quantity}</Text>
              </View>
            </View>
            <View style={styles.flex}>
              <Text style={styles.subtitle}>Final price:</Text>
              <Text style={styles.subtitle}>{(item.price*item.quantity).toFixed(2)}$</Text>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.checkoutContainer}>
        <View style={styles.checkOutContainer}>
          <View style={styles.checkOutInfo}>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.checkText}>Dish price:</Text>
              <Text style={styles.checkText}>{getTotalPrice().toFixed(2)}$</Text>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.checkText}>Taxes:</Text>
              <Text style={styles.checkText}>{getTotalPrice() < 200 ? 10 : 5}$</Text>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.checkText}>Delivery:</Text>
              <Text style={styles.checkText}> {getTotalPrice() < 200 ? 20 : 10}$</Text>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.checkText}>Total:</Text>
              <Text style={styles.checkText}>{getTotalPrice() < 200 ? (getTotalPrice()+30).toFixed(2) : (getTotalPrice()+15).toFixed(2)}$</Text>
            </View>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.checkText}>Adress:</Text>
              <View style={{display: "flex",flexDirection: 'row',alignItems: 'center'}}>
                <Text style={styles.checkText}>{adress}</Text>
                <TouchableOpacity
                  onPress={() => {setEdit(adress !== 'None' ? adress : '');setAdding(true)}}
                >
                  <Text style={styles.checkText}>(Change)</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.checkOutButton}
            onPress={handleHistory}
          >
            <Text style={styles.buttonText}>Finish order</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={adding}
        animationType='slide'
        transparent={true}
      >
        <View style={styles.cover}></View>
        <View style={styles.mainModalContainer}>
          <View style={{backgroundColor: 'white',padding: 20,borderRadius: 15,width: '85%'}}>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
              <Text style={styles.modalTitle}>Add the delivery adress</Text>
              <TouchableOpacity
                onPress={() => setAdding(false)}
              >
                <AntDesign name="close" size={24} color="black" />
              </TouchableOpacity>
            </View>
            <TextInput style={styles.modalInput} placeholder='Add here the delivery adress' onChangeText={(text: string) => setEdit(text)} value={edit}/>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {setAdress(edit);setAdding(false)}}
            >
              <Text style={styles.modalButtonText}>Add adress</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between'
  },
  title: {
    margin: 30,
    fontSize: 22,
    fontFamily: 'ABeeZee'
  },
  mainItemContainer: {
    backgroundColor: '#EFEDED',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  flex: {
    display: 'flex',
    flexDirection: 'column'
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'ABeeZee'
  },
  label: {
    fontSize: 15,
    color: '#B5B5B5',
    fontFamily: 'ABeeZee'
  },
  checkOutContainer: {
    paddingTop: 20,
    position: 'fixed'
  },
  checkOutInfo: {
    backgroundColor: '#EFEDED',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    rowGap: 5
  },
  checkOutButton: {
    backgroundColor: '#FFE311',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    fontFamily: 'ABeeZee'
  },
  checkText: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
    marginLeft: 10,
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    color: 'white'
  },
  checkoutContainer: {
    marginBottom: 35
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,alignItems: 'center',justifyContent: 'center'
  },
  mainModalContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  modalTitle: {
    fontSize: 17,
    fontFamily: 'ABeeZee'
  },
  modalInput: {
    backgroundColor: '#EFEDED',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    fontFamily: 'ABeeZee'
  },
  modalButton: {
    alignItems: 'center',
    backgroundColor: '#FFE311',
    padding: 7,
    borderRadius: 10,
    fontFamily: 'ABeeZee'
  },
  modalButtonText: {
    color: 'white',
    fontSize: 15,
    fontFamily: 'ABeeZee'
  }
});

export default Checkout;