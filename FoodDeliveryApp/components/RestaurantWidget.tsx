import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RestaurantWidget = ({
  name,
  adress,
  contact,
  imageSource
}: {
  name: string,
  adress: string,
  contact: string,
  imageSource: string
}) => {

  /*
    <Image
      source={require('../assets/images/cover-photo.png')}
      resizeMode='cover'
      style={{flex: 1,height: "100%",borderBottomRightRadius: 15,borderTopRightRadius: 15}}
    />
  */
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.infoFlex}>
          <FontAwesome6 name="location-dot" size={24} color="black" />
          <Text style={styles.infoText}>{adress}</Text>
        </View>
        <View style={styles.infoFlex}>
          <Feather name="phone" size={20} color="black" />
          <Text style={styles.infoText}>{contact}</Text>
        </View>
        <View style={{width: '100%'}}>
          <TouchableOpacity style={styles.seeMenuButton}>
            <Text style={styles.buttonText}>See menu</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{backgroundColor: '#B5B5B5',borderBottomRightRadius: 20,borderTopRightRadius: 20}}>
        <Image
          source={require('../assets/images/cover-photo.png')}
          resizeMode='cover'
          style={{width: 180,height: 186,borderBottomRightRadius: 15,borderTopRightRadius: 15}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEDED',
    maxWidth: 360,
    borderRadius: 15,
    marginRight: 65
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 5,
    margin: 15,
  },
  infoFlex: {
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
    flexWrap:'wrap',
    marginLeft: 5,
    maxWidth: 160
  },
  seeMenuButton: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#EED518',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontFamily: 'ABeeZee',
    fontSize: 16
  }

});

export default RestaurantWidget;