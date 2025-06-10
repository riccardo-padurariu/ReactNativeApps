import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notification = ({
  grade,
  name,
  discipline,
  date,
  time,
  type
} : {
  grade: number,
  name: string,
  discipline: string,
  date: any,
  time: any,
  type: string
}) => {
  return (
    <TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Feather name={type === 'grade' ? "check-circle" : type === 'homework' ? "book" : "user-x"} size={24} color="white" />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.title}>Grade {grade} by professor {name}</Text>
          <Text style={styles.discipline}>Discipline: {discipline}</Text>
          <View style={styles.date}>
            <Text style={styles.dateText}>On {date.day}.{date.month}.{date.year} at {time.hour}:{time.minutes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    marginBottom: 15
  },
  iconContainer: {
    paddingTop: 35,
    paddingBottom: 35,
    paddingRight: 15,
    paddingLeft: 15,
    backgroundColor: '#867CF1',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    alignItems: 'center'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  discipline: {
    fontSize: 16,
  },
  date: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#9C9C9C'
  }
});

export default Notification;