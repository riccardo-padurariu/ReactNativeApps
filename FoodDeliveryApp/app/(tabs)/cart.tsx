import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {
  
  const [cartList,setCartList] = React.useState([]);
  
  return (
    <View style={styles.mainContainer}>
      {cartList.length 
      ?
        <View>

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
    fontSize: 20
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
  }
});
