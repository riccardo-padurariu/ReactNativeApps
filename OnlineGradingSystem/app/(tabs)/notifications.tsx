import Notification from '@/components/Notification';
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notifications = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
        <TouchableOpacity>
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{padding: 15}}>
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='grade'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='absent'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
          <Notification
            name='Chris Evans'
            grade={10}
            discipline='Mathematics'
            date={{day: '10',month: '06',year: '2025'}}
            time={{hour: '11',minutes: '00'}}
            type='homework'
          />
        </View>
      </ScrollView>

    </View>
  ) 
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

export default Notifications;