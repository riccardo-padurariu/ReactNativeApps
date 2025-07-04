import { DataContext } from '@/app/DataProvider';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dish from './Dish';


const CategoryDish = ({
  name,
  location,
  contact,
  price,
  id,
  ingredients,
  description
} : {
  name: string,
  location: string,
  contact: string,
  price: number,
  id: string,
  ingredients: string[],
  description: string
}) => {

  const {cartList,setCartList} = useContext(DataContext);

  const [isVisualizing,setIsVisualizing] = React.useState(false);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.flex}>
          <FontAwesome6 name="location-dot" size={24} color="black" />
          <Text style={styles.infoText}>{location}</Text>
        </View>
        <View style={styles.flex}>
          <Feather name="phone" size={20} color="black" />
          <Text style={styles.infoText}>{contact}</Text>
        </View>
        <View style={styles.flexButton}>
          <TouchableOpacity style={styles.seeMenuButton}
            onPress={() => setIsVisualizing(true)}
          >
            <Text style={styles.menuText}>See on menu</Text>
          </TouchableOpacity>
          <Text style={styles.infoText}>{price}$</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        <Image 
          style={{width: 155,height: '100%',borderBottomRightRadius: 20,borderTopRightRadius: 20}}
          source={require('../assets/images/pizza-img.png')}
        />
      </View>
      <Dish 
        condition={isVisualizing}
        setCondition={setIsVisualizing}
        name={name}
        location={location}
        price={price}
        ingredients={ingredients}
        description={description}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#EFEDED',
    marginRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 15,
    maxHeight: 160
  },
  imageContainer: {
    
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 15,
    rowGap: 2,
    flex: 1,
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 18
  },
  infoText: {
    fontFamily: 'ABeeZee',
    fontSize: 15,
    marginLeft: 5
  },
  flexButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flex: 1
  },
  seeMenuButton: {
    backgroundColor: '#FFE311',
    padding: 7,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10
  },
  menuText: {
    fontFamily: 'ABeeZee',
    fontSize: 15,
    color: 'white'
  }
})

export default CategoryDish;