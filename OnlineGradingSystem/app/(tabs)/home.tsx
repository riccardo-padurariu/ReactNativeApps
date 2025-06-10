import RecentGradeAdded from '@/components/RecentGradeAdded';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome back student!</Text>
        <TouchableOpacity>
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.subtitle}>Recent grades added</Text>

        <ScrollView>
          <View>
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
            <RecentGradeAdded
              name='Chris Evans'
              grade={10}
              discipline='Mathematics'
              date={{day: '10',month: '06',year: '2025'}}
              time={{hour: '11',minutes: '00'}}
            />
          </View>
        </ScrollView>


      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  titleContainer: {
    height: '18%',
    backgroundColor: '#867CF1',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  titleText: {
    flex: 1,
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white'
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  }
})