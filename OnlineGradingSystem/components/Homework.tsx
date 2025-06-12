import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Homework = ({
  discipline,
  name,
  title,
  date,
  time,
  dueDate,
  dueTime
} : {
  discipline: string,
  name: string,
  title: string,
  date: any,
  time: any,
  dueDate: any,
  dueTime: any

}) => {
  return (
    <TouchableOpacity
      style={styles.mainContainer}
    >
      <View style={styles.discipline}>
        <Text style={styles.disciplineText}>{discipline}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Professor {name} added the homework: {title}</Text>
        <Text>Due on: {dueDate.day}.{dueDate.month}.{dueDate.year} at {dueTime.hour}:{dueTime.minutes}</Text>
      </View>
      <View style={styles.postDate}>
        <Text style={styles.postDateText}>On {date.day}.{date.month}.{date.year} at {time.hour}:{time.minutes}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#E8E8E8',
    borderRadius: 15,
    margin: 10
  },
  discipline: {
    backgroundColor: '#867CF1',
    maxWidth: 190,
    alignItems: 'center',
    borderTopLeftRadius: 15,
    padding: 5
  },
  disciplineText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600
  },
  infoContainer: {
    marginLeft: 15,
    marginTop: 10
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  postDate: {
    alignItems: 'flex-end',
    padding: 10
  },
  postDateText: {
    color: '#9C9C9C'
  }
});

export default Homework;