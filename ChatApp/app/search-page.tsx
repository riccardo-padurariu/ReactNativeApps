import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { DataContext } from "./DataProvider";

const SearchPage = () => {

  const { usersList } = useContext(DataContext);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Start a new conversation...</Text>
      <View style={styles.input}>
        <TextInput style={styles.input} placeholder="Search here the user"/>
      </View>
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
    marginBottom: 20,
    marginTop: 10
  },
  input: {
    backgroundColor: '#90E0EF',
    paddingLeft: 10,
    fontSize: 15,
    borderRadius: 30,
  }
});

export default SearchPage;