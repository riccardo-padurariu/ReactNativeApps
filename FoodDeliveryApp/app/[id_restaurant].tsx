import SpecialityDish from "@/components/SpecialityDish";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RestaurantPage = () => {
  
  const { id_restaurant,name,adress,dishes } = useLocalSearchParams();

  const dishesList = JSON.parse(dishes);
  if(Array.isArray(dishes))
    dishesList.sort((a,b) => b.rating - a.rating);
  const specialityArr = [];
  for(let i=0;i<5;i++)
      specialityArr[i] = dishesList[i];


  /*Collecting the types of dishes*/
  let types = {
    pizza: 0,
    pasta: 0,
    burger: 0,
    romanian: 0,
    sushi: 0,
    mexican: 0,
    asian: 0,
    fastFood: 0,
    grill: 0,
    dessert: 0,
    salad: 0,
    soup: 0,
    stew: 0,
    indian: 0,
    seafood: 0,
    middleEastern: 0,
    starter: 0

  }
  dishesList.forEach((element: any) => {
    types[element.type]++;
  });

  const displayTypes = [];
  for(const type in types){
    if(types[type] != 0){
      const fin = type.charAt(0).toUpperCase() + type.slice(1);
      displayTypes.push(fin);
    }
  }

  const [displayArr,setDisplayArr] = React.useState([]);

  const handleCategory = (category: string) => {
    const arr = dishesList.filter((item: any) => item.type === category);
    setDisplayArr(arr);
  }


  return (
      <View style={styles.mainContainer}>
        <ImageBackground
          source={require('../assets/images/bg-restaurant.png')}
          style={{height: '44%'}}
        >
          <View style={styles.cover}></View>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <TouchableOpacity
              style={{marginLeft: 20,marginTop: 15}}
              onPress={() => router.back()}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
          </View>
        </ImageBackground>
        <View style={styles.mainInfoContainer}>
          <Text style={styles.subtitleMain}>Menu</Text>
          <Text style={styles.subtitle}>Specialities</Text>
          <ScrollView style={{marginBottom: 20}} horizontal={true}>
            {specialityArr.map((item: any) => (
              <SpecialityDish 
                name={item.name}
                price={item.price}
                location={adress}
                type="speciality"
                id={item.id}
                rating={item.rating}
                ingredients={item.ingredients}
                description={item.description}
              />
            ))}
          </ScrollView>
          <Text style={styles.subtitle2}>Categories</Text>
          <ScrollView contentContainerStyle={styles.categoriesContainer} horizontal={true}>
            {displayTypes.map((item) => (
              <TouchableOpacity
                style={styles.categoryButton}
                onPress={() => {
                  const fin = item.charAt(0).toLowerCase() + item.slice(1);
                  handleCategory(fin);
                }}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <ScrollView style={{marginTop: -350,flex: 1}}>
            {displayArr.length != 0 ? 
              displayArr.map((item: any) => (
                <SpecialityDish 
                  name={item.name}
                  price={item.price}
                  location={adress}
                  type=""
                  id={item.id}
                  rating={item.rating}
                  ingredients={item.ingredients}
                  description={item.description}
                />
              )) : 
              <TouchableOpacity style={styles.exploreButton}
                onPress={() => {
                  const str = Object.keys(types)[0];
                  handleCategory(str);
                }}
              >
                <Text style={styles.exploreText}>Explore dishes</Text>
              </TouchableOpacity>
            }
          </ScrollView>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '44%'
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 22,
    color: 'white',
    padding: 50,
    paddingTop: 70
  },
  mainInfoContainer: {
    marginTop: -220,
    paddingTop: 25,
    paddingLeft: 25,
    flex: 1
  },
  subtitleMain: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    marginBottom: 24
  },
  subtitle: {
    fontFamily: 'ABeeZee',
    fontSize: 17,
    marginBottom: 10,
  },
  subtitle2: {
    fontFamily: 'ABeeZee',
    fontSize: 17,
    marginBottom: 10,
    marginTop: -400
  },
  categoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 25,
  },
  categoryButton: {
    marginRight: 15
  },
  categoryText: {
    fontFamily: 'ABeeZee',
    fontSize: 16
  },
  exploreButton: {
    backgroundColor: '#FFE311',
    marginRight: 20,
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  exploreText: {
    fontFamily: 'ABeeZee',
    color: 'white',
    fontSize: 18
  }
})

export const unstable_settings  = {
  unmountOnBlur: false,
};

export default RestaurantPage;