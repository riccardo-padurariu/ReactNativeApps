import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React, { useContext } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "./DataProvider";

const SearchPage = () => {

  const { usersList } = useContext(DataContext);
  const [search,setSearch] = React.useState('');
  console.log('Users list: ',usersList);

  const displayArr = usersList.filter((item: any) => {

    return ((search === '' ? item : item.displayName.includes(search)));
  }).map((item: any,index:any ) => 
    <View style={styles.userContainer}>
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
        <View style={{borderRadius: 50,backgroundColor: '#CAF0F8',padding: 10}}>
          <Feather name="user" size={30} color="#03045E" />
        </View>
        <View style={styles.infoUserContainer}>
          <Text style={styles.username}>{item.displayName}</Text>
          <Text style={styles.email}>{item.email}</Text>
        </View>
      </View>
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push({pathname: `/[id_chat]`,params: {id_chat: item.uid, name: item.displayName}})}
      >
        <Feather name="plus" size={28} color="#03045E" />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20,marginTop: 10}}>
        <TouchableOpacity
          style={{marginRight: 10}}
          onPress={() => router.back()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Start a new conversation...</Text>
      </View>
      <View style={styles.input}>
        <TextInput style={styles.input} placeholder="Search here the user" value={search} onChangeText={(text: any) => setSearch(text)}/>
      </View>
      <ScrollView style={{marginTop: 25}}>
        {displayArr}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8',
    padding: 20
  },
  title: {
    color: '#03045E',
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#90E0EF',
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 30,
  },
  userContainer: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#03045E',
    backgroundColor: '#90E0EF',
    marginBottom: 10
  },
  infoUserContainer: {
    marginLeft: 10
  },
  username: {
    fontSize: 18,
    color: '#03045E'
  },
  email: {
    color: '#03045E'
  },
  addButton: {

  }
});

export default SearchPage;