import RecentGradeAdded from '@/components/RecentGradeAdded';
import SidebarModal from '@/components/SidebarModal';
import { gradeRecords } from '@/RecentGradesData';
import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';


export default function HomeScreen() {

  const [sidebarActive,setSidebarActive] = React.useState(false);
  

  const arr = gradeRecords;
  const displayArr = arr.map(item => (
    <RecentGradeAdded 
      name={item.name}
      discipline={item.discipline}
      date={item.date}
      time={item.time}
      grade={item.value}
    />
  ))

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Welcome back student!</Text>
        <TouchableOpacity
          onPress={() => setSidebarActive(true)}
        >
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <View style={{padding: 20}}>
        <Text style={styles.subtitle}>Recent grades added</Text>

        <ScrollView>
          {displayArr}
        </ScrollView>


      </View>

      <SidebarModal 
        condition={sidebarActive}
        setCondition={setSidebarActive}
      />

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