import { DataContext } from '@/app/DataProvider';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CartItem = ({
  name,
  price,
  quantity,
  id,
  location,
  index
} : {
  name: string,
  price: number,
  quantity: number,
  id: string,
  location: string,
  index: number
}) => {

  const { cartList, setCartList } = useContext(DataContext);

  const handle = (amount: number) => {
    const arr = cartList.map((item: any) => {
      if(item.id === id){
        return {...item,quantity: item.quantity + amount};
      }
      return item;
    });
    console.log(arr);
    setCartList(arr);
    console.log('clicked');
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.locationContainer}>
          <FontAwesome6 name="location-dot" size={24} color="#B5B5B5" />
          <Text style={styles.locationText}>{location}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <View style={styles.quantityFlex}> 
            <TouchableOpacity 
              onPress={() => handle(quantity > 1 ? -1 : 0)}
            >
              <AntDesign name="minus" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.price}>{cartList[index-1].quantity}</Text>
            <TouchableOpacity
              onPress={() => handle(quantity < 10 ? 1 : 0)}
            >
              <AntDesign name="plus" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <Text style={styles.price}>{price*quantity}$</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          source={require('../assets/images/salad-img.png')}
          style={{width: 150,height: 140,borderTopRightRadius: 15,borderBottomRightRadius: 15}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EFEDED',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 15,
    marginBottom: 15
  },
  infoContainer: {
    paddingLeft: 15,
    rowGap: 10
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 18
  },
  locationContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  locationText: {
    color: '#B5B5B5',
    fontFamily: 'ABeeZee',
    fontSize: 15,
    marginLeft: 3
  },
  quantityContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  quantityFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#B5B5B5',
    padding: 5,
    minWidth: 120,
    borderRadius: 7,
    justifyContent: 'space-between'
  },
  price: {
    fontFamily: 'ABeeZee',
    fontSize: 17
  },
  imageContainer: {
  }
});

export default CartItem;