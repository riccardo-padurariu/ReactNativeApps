import { useAuth } from '@/Authentification/AuthContext';
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notification = ({
  grade,
  name,
  discipline,
  date,
  time,
  type,
  teacherName,
  className
} : {
  grade: any,
  name: string,
  discipline: string,
  date: any,
  time: any,
  type: string,
  teacherName: string,
  className: string
}) => {

  const { currentUser } = useAuth();

  return (
    <TouchableOpacity>
      <View style={styles.mainContainer}>
        <View style={styles.iconContainer}>
          <Feather name={type === 'grade' ? "check-circle" : type === 'homework' ? "book" : "user-x"} size={24} color="white" />
        </View>
        <View style={styles.infoContainer}>
          {
          currentUser.displayName[0] === 'T' 
            ? <Text style={styles.title}>{type === 'grade' ? `You added grade ${grade} to the student ${name}` : type === 'homework' ? `You added the homework ${grade} to class ${className}` : `You added absent to the student ${name}`}</Text>
            : <Text style={styles.title}>{type === 'grade' ? `Grade ${grade} by professor ${teacherName}` : type === 'homework' ? `Homework: ${grade} added by ${teacherName}` : `Absent added by ${teacherName}`}</Text>
          }
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
    alignItems: 'center',
    height: '100%'
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1,
    marginRight: 50
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