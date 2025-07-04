import { DataContext } from '@/app/DataProvider';
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import React, { useContext } from "react";
import { Image, Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddedModal from './AddedModal';

const Dish = ({
  condition,
  setCondition,
  name,
  price,
  description,
  ingredients,
  location,
  id
}: {
  condition: boolean,
  setCondition: any,
  name: string,
  price: number,
  description: string,
  ingredients: string[],
  location: string,
  id: string
}) => { 

  const {cartList,setCartList} = useContext(DataContext);

  const [quantity,setQuantity] = React.useState(1);

  function exists(id: string){
    let e = false;
    cartList.forEach((element: any) => {
      if(element.id === id) e = true;
    });
    return e;
  }

  const addToCart = () => {
    if(exists(id)){
      const arr = cartList.map((item: any) => {
        if(item.id === id)
          return {...item,quantity: item.quantity + quantity}
        return item;
      })
      setCartList(arr);
      handle();
    }else{
      setCartList((prev: any) => [
        ...prev,
        {
          name: name,
          price: price,
          quantity: quantity,
          id: `${name}_${price}`,
          location: location,
          index: 3
        }
      ])
    }
    handle();
  }

  const [isAdded, setIsAdded] = React.useState(false);

  const handle = () => {
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false)
    },1000)
  }

  let displayArr;

  if(Array.isArray(ingredients)){
    displayArr = ingredients.map((item: string) => (
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
        <Entypo name="dot-single" size={24} color="black" />
        <Text style={{fontFamily: 'ABeeZee',fontSize: 15}}>{item}</Text>
      </View>
    ))
  }

  return (
    <Modal 
      animationType="slide"
      visible={condition}
    >
        <View style={styles.mainContainer}>
          <ScrollView style={{flex: 1}}>
            <Image
                source={require('../assets/images/pa.png')}
                style={{width: '100%',height: '32%'}}
            />
            <View style={styles.flexbox}>
              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => setCondition(false)}
                  style={{marginRight: 10}}
                >
                  <AntDesign name="arrowleft" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
              </View>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={addToCart}
              >
                <Text style={styles.addToCartText}>Add to cart</Text>
              </TouchableOpacity>
            </View>
            <Text style={{fontFamily: 'ABeeZee',fontSize: 16, marginLeft: 30,marginTop: 10,marginBottom: 10}}>{price}$</Text>
            <View style={{marginLeft: 30,marginTop: 10}}>
              <Text style={{fontFamily: 'ABeeZee',fontSize: 16,marginBottom: 10}}>Description</Text>
              <Text style={{fontFamily: 'ABeeZee',fontSize: 15,marginBottom: 10}}>{description}</Text>
            </View>
            <View style={{marginLeft: 30,marginTop: 10}}>
              <Text style={{fontFamily: 'ABeeZee',fontSize: 16,marginBottom: 10}}>Ingriedents</Text>
              {displayArr}
            </View>
            <View style={{display: 'flex',alignItems: 'center',flexDirection: 'row',justifyContent: 'space-around',margin: 10}}>
              <TouchableOpacity
                style={{backgroundColor: '#FFE311',padding: 10,borderRadius: 10}}
                onPress={() => setQuantity(quantity > 1 ? quantity-1 : quantity)}
              >
                <AntDesign name="arrowleft" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{backgroundColor: '#FFE311',padding: 15,borderRadius: 10, fontFamily: 'ABeeZee',fontSize: 15,color: 'white'}}>{quantity}</Text>
              <TouchableOpacity
                style={{backgroundColor: '#FFE311',padding: 10,borderRadius: 10}}
                onPress={() => setQuantity(quantity < 10 ? quantity+1 : quantity)}
              >
                <AntDesign name="arrowright" size={24} color="white" />
              </TouchableOpacity>
            </View>
            
          </ScrollView>
        
        </View>
        <AddedModal 
          quantity={quantity}
          condition={isAdded}
        />
    </Modal>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 22
  },
  addToCartButton: {
    backgroundColor: '#FFE311',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10
  },
  addToCartText: {
    color: 'white',
    fontFamily: 'ABeeZee',
    fontSize: 15
  },
  flexbox: {
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
  }
})

export default Dish;