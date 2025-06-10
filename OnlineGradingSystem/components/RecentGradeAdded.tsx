import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const RecentGradeAdded = ({
  name,
  discipline,
  date,
  time,
  grade
} : {
  name: string,
  discipline: string,
  date: any,
  time: any,
  grade: number
}) => {
  return (
      <TouchableOpacity>
        <View style={styles.mainContainer}>
          <View style={styles.dateContainer}>
            <Text style={styles.dateText}>{`${date.day}.${date.month}.${date.year}`}</Text>
            <Text style={styles.dateText}>{`${time.hour}:${time.minutes}`}</Text>
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.mainText}>
              Grade {grade} by professor {name}
            </Text>
            <Text numberOfLines={2} style={styles.discipline}>
              Discipline: {discipline}
            </Text>
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
  dateContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#867CF1',
    height: '100%',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10
  },
  dateText: {
    color: 'white',
    fontSize: 15
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 10
  },
  mainText: {
    flexWrap: 'wrap',
  },
  discipline: {
    color: '#9C9C9C'
  }
});

export default RecentGradeAdded;