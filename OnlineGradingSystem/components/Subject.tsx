import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Subject = ({
  discipline,
  grades,
  absents
} : {
  discipline: string,
  grades: any[],
  absents: any[]
}) => {

  let grade = 0;
  grades.forEach(element => {
    grade+=Number(element.grade);
  });

  grade /= grades.length;

  const [showGrades,setShowGrades] = React.useState(true);
  const [showAbsents,setShowAbsents] = React.useState(false);

  const arr1 = grades, arr2 = absents;
  const displayGrades = arr1.map((item) => (
    <View style={styles.container}>
      <Text style={styles.containerText}>{item.grade}/{item.date.day}.{item.date.month}</Text>
    </View>
  ))
  const displayAbsents = arr2.map((item) => (
    <View style={styles.container}>
      <Text style={styles.containerText}>
        {item.day}.{item.month}
      </Text>
    </View>
  ))

  const handle = (c1: boolean,c2: boolean) => {
    setShowAbsents(c2);
    setShowGrades(c1);
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{discipline}</Text>
      </View>
      <View>
        <View style={styles.interactionContainer}>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => handle(true,false)}
          >
            <Text style={styles.interactionText}>Grades</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.interactionButton}
            onPress={() => handle(false,true)}
          >
            <Text style={styles.interactionText}>Absents</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flex}>
          {showGrades && displayGrades}
          {showAbsents && displayAbsents}
        </View>
        <Text style={styles.finalGrade}>Final grade: {grade.toFixed(0)}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#e8e8e8',
    margin: 10,
    borderRadius: 15
  },
  titleContainer: {
    backgroundColor: '#867CF1',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 8
  },
  title: {
    marginLeft: 20,
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold'
  },
  interactionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    width: 140,
    justifyContent: 'space-between',
    marginTop: 10
  },
  interactionButton: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10
  },
  interactionText: {
    fontWeight: 'bold'
  },
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 10,
    maxWidth: 80,
    alignItems: 'center',
    marginRight: 10
  },
  containerText: {

  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  finalGrade: {
    paddingLeft: 20,
    paddingBottom: 10,
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default Subject;