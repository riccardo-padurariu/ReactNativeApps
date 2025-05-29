import Music from '@/components/Music';
import { songs } from '@/data/songs';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function TabTwoScreen() {

  const arr = songs;
  const [search,setSearch] = React.useState('');
  const [filter,setFilter] = React.useState('');

  const displayArr = arr.filter((item) => {

    return ((search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search)) && (item.type === filter && filter !== ''));
  }).map((item,index) => 
    <Music
      songName={item.name}
      songAuthor={item.author}
      duration={item.duration}
    />
  )



  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Search for music...</Text>
      <View style={styles.inputView}>
        <TextInput 
          placeholder='Search music...' 
          style={styles.inputSearch} 
          defaultValue={search}
          onChangeText={text => setSearch(text)}
        />
        <Feather name="search" size={24} color="black" />
      </View>
      {filter && <TouchableOpacity style={styles.backButton} onPress={() => setFilter('')}>
          <Ionicons name="arrow-back" size={24} color="#888888" />
        </TouchableOpacity>}
      {(search || filter)
      
      ? <ScrollView>
        {displayArr}
      </ScrollView>
      :<View>
        <View style={styles.classicFlex}>
          <TouchableOpacity onPress={() => setFilter('hip hop')}>
            <View style={{backgroundColor: '#9A0000',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10,
              marginRight: 20
            }}>
              <Text style={styles.subtitle}>Hip Hop</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('rock')}>
            <View style={{backgroundColor: '#306F00',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10
            }}>
              <Text style={styles.subtitle}>Rock</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.classicFlex}>
          <TouchableOpacity onPress={() => setFilter('classic')}>
            <View style={{backgroundColor: '#9D9A00',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10,
              marginRight: 20
            }}>
              <Text style={styles.subtitle}>Classic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('rap')}>
            <View style={{backgroundColor: '#0F0351',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10
            }}>
              <Text style={styles.subtitle}>Rap</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30
  },
  title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "white"
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15
  },
  inputSearch: {
    flex: 1
  },
  classicFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  },
  backButton: {
    marginBottom: 15,
  }
});
