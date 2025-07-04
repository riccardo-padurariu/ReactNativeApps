import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Dish from "./Dish";

const SpecialityDish = ({
  name,
  price,
  location,
  type,
  id,
  rating,
  ingredients,
  description
} : {
  name: string,
  price: number,
  location: string,
  type: string,
  id: string,
  rating: number,
  ingredients: any[],
  description: string
}) => {

  const [isVisualizing,setIsVisualizing] = React.useState(false);

  return (
    <View>
      <View style={styles.mainContainer}>
        <View style={{
          paddingLeft: 20,
          paddingRight: 20,
          rowGap: type === 'speciality' ? 7 : 10
        }}>
          <Text style={styles.title}>{name}</Text>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
            <Text style={styles.price}>{price}$</Text>
            <Text style={styles.price}>Rating: {rating}</Text>
          </View>
          <TouchableOpacity
            style={styles.discoveryButton}
            onPress={() => setIsVisualizing(true)}
          >
            <Text style={styles.discoveryText}>{type === 'speciality' ? 'Discovery' : 'See more'}</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Image
            source={require('../assets/images/salad-img-special.png')}
            style={{width: 150, height: 150,borderBottomRightRadius: 15,borderTopRightRadius: 15}}
          />
        </View>
      </View>
      <Dish
        condition={isVisualizing}
        setCondition={setIsVisualizing}
        name={name}
        price={price}
        ingredients={ingredients}
        description={description}
        location={location}
        id={id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEDED',
    borderRadius: 15,
    justifyContent: 'space-between',
    marginRight: 15,
    marginBottom: 15,
    maxHeight: 150
  },
  infoContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    rowGap: 7
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 17,
    maxWidth: 170
  },
  price: {
    fontFamily: 'ABeeZee',
    fontSize: 14,
    color: '#B5B5B5'
  },
  discoveryButton: {
    backgroundColor: '#FFE311',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8
  },
  discoveryText: {
    fontFamily: 'ABeeZee',
    color: 'white'
  }
});

export default SpecialityDish;