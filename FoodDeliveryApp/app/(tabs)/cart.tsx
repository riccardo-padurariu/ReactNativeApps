import CartItem from '@/components/CartItem';
import { router } from 'expo-router';
import React, { useContext } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DataContext } from '../DataProvider';

export default function TabTwoScreen() {
  
  const { cartList, setCartList } = useContext(DataContext);


  const getTotalPrice = () => {
    let sum = 0;
    cartList.forEach((element: any) => {
      sum += element.price*element.quantity;
    });
    return sum;
  }

  return (
    <View style={styles.mainContainer}>
      {cartList.length 
      ?
        <View style={styles.mainCartContainer}>
          <View>
            <Text style={styles.title}>Cart</Text>
            <ScrollView>
              {cartList.map((item: any) => (
                <CartItem
                  name={item.name}
                  price={item.price}
                  quantity={item.quantity}
                  location={item.location}
                  id={item.id}
                  index={item.index}
                />
              ))}
            </ScrollView>
          </View>
          <View style={styles.checkOutContainer}>
            <View style={styles.checkOutInfo}>
              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                <Text style={styles.checkText}>Dish price:</Text>
                <Text style={styles.checkText}>{getTotalPrice()}$</Text>
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
                <Text style={styles.checkText}>{getTotalPrice() < 200 ? getTotalPrice()+30 : getTotalPrice()+15}$</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.checkOutButton}>
              <Text style={styles.buttonText}>Check-out</Text>
            </TouchableOpacity>
          </View>
        </View>
      : 
        <View style={{alignItems: 'center',padding: 50,justifyContent: 'space-between',flex: 1}}>
          <Text style={styles.title}>The cart is empty for the moment</Text>
          <Image 
            source={require('../../assets/images/image.png')}
            style={{width: 340,height: 400}}
          />
          <TouchableOpacity 
            onPress={() => router.push('/(tabs)/home')}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Go Shopping!</Text>
          </TouchableOpacity>
        </View>}
    </View>  
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    marginBottom: 30
  },
  button: {
    backgroundColor: '#FFE311',
    padding: 20,
    paddingLeft: 50,
    paddingRight: 50,
    borderRadius: 15
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    color: 'white'
  },
  mainCartContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 250,
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
    borderRadius: 10
  },
  checkText: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
  },
});


export const unstable_settings  = {
  unmountOnBlur: false,
};