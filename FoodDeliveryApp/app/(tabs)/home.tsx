import CategoryDish from '@/components/CategoryDish';
import RestaurantWidget from '@/components/RestaurantWidget';
import { dishesList } from '@/dishData';
import { restaurantsList } from '@/restaurantData';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ImageBackground, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const displArr = [];
  for(let i=0;i<10;i++)
      displArr[i] = restaurantsList[i];

  const [categories,setCategories] = React.useState({
    pizza: true,
    pasta: false,
    hamburger: false,
    fastFood: false,
    sushi: false
  })

  let arr = [];

  if(Array.isArray(dishesList))
    arr = dishesList.filter((item:any) => item.type === 'pizza');

  const [displayArr,setDisplayArr] = React.useState(arr);

  const handleCategory = (category: string) => {
    if(category == 'pizza'){
      setCategories({
        pizza: true,
        pasta: false,
        hamburger: false,
        fastFood: false,
        sushi: false
      });
    } else if(category == 'pasta'){
      setCategories({
        pizza: false,
        pasta: true,
        hamburger: false,
        fastFood: false,
        sushi: false
      });
    } else if(category == 'burger'){
      setCategories({
        pizza: false,
        pasta: false,
        hamburger: true,
        fastFood: false,
        sushi: false
      });
    } else if(category == 'grill'){
      setCategories({
        pizza: false,
        pasta: false,
        hamburger: false,
        fastFood: true,
        sushi: false
      });
    } else if(category == 'sushi'){
      setCategories({
        pizza: false,
        pasta: false,
        hamburger: false,
        fastFood: false,
        sushi: true
      });
    }
    const arr = dishesList.filter((item: any) => item.type === category );
    setDisplayArr(arr);
  }

  return (
    <View style={styles.mainContainer}>
      <ImageBackground 
        source={require('../../assets/images/home-img.png')}
        style={{
          width: '100%',
          height: '52%',
        }}
        resizeMode= 'cover'
      >
        <View style={styles.cover}>
        </View>
        <View style={styles.searchInputContainer}>
          <Text style={styles.title}>Search here for food</Text>
          <View style={styles.inputContainer}>
            <Feather name="search" size={24} color="black" style={styles.searchIcon}/>
            <TextInput style={styles.searchInput} placeholder='Search for food' />
          </View>
        </View>
      </ImageBackground>
      <View style={styles.infoMainContainer}>
        <Text style={styles.subtitle}>Restaurants around you</Text>   
        <ScrollView contentContainerStyle={{marginBottom: 20,marginTop: 20,display: 'flex',flexDirection: 'row',alignItems: 'center'}} horizontal={true}>
          {displArr.map((item: any) => (
            <RestaurantWidget 
              name={item.name}
              dishes={item.dishes}
              adress={item.location}
              contact={item.contact}
              id={item.id}
            />
          ))}
        </ScrollView> 
        <View style={{marginBottom: 320,height:'51%'}}>
          <Text style={styles.subtitle}>Choose your food category</Text>
          <View style={styles.foodCategoriesContainer}>
            <TouchableOpacity
              onPress={() => handleCategory('pizza')}
            >
              <Text style={categories.pizza ? styles.categoryTextSelected : styles.categoryText}>Pizza</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCategory('pasta')}
            >
              <Text style={categories.pasta ? styles.categoryTextSelected : styles.categoryText}>Pasta</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCategory('burger')}
            >
              <Text style={categories.hamburger ? styles.categoryTextSelected : styles.categoryText}>Burger</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCategory('grill')}
            >
              <Text style={categories.fastFood ? styles.categoryTextSelected : styles.categoryText}>Grill</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCategory('sushi')}
            >
              <Text style={categories.sushi ? styles.categoryTextSelected : styles.categoryText}>Sushi</Text>
            </TouchableOpacity>
          </View>
          <ScrollView contentContainerStyle={{marginTop: 20,display: 'flex',flexDirection: 'column'}}>
            {displayArr.map((item: any) => (
              <CategoryDish 
                name={item.name}
                price={item.price}
                id={item.id}
                location={item.location}
                contact='0758180243'
                ingredients={item.ingredients}
                description={item.description}
              />
            ))}
            <CategoryDish 
                name=''
                price={12}
                id=''
                location=''
                contact='0758180243'
                ingredients={[]}
                description=''
              />
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.62,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '52%'
  },
  title: {
    fontFamily: 'ABeeZee',
    color: 'white',
    fontSize: 25,
    marginTop: 60
  },
  searchInputContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 50,
    width: '100%'
  },
  searchInput: {

  },
  inputContainer: {
    backgroundColor: 'white',
    display:'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    borderRadius: 20,
    width: '80%',
    marginTop: 10,
    opacity: 0.8
  },
  searchIcon: {
  },
  infoMainContainer: {
    marginTop: -180,
    marginLeft: 25,
  },
  subtitle: {
    fontFamily: 'ABeeZee',
    fontSize: 22
  },
  foodCategoriesContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginRight: 20,
    justifyContent: 'space-evenly',
    marginTop: 10
  },
  categoryTextSelected: {
    fontFamily: 'ABeeZee',
    fontSize: 16
  },
  categoryText: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
    color: '#B5B5B5'
  }

});

export const unstable_settings  = {
  unmountOnBlur: false,
};