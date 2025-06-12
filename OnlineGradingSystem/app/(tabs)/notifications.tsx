import Notification from '@/components/Notification';
import SidebarModal from '@/components/SidebarModal';
import studentRecords from '@/NotificationData';
import Feather from '@expo/vector-icons/Feather';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Notifications = () => {

  const [sidebarActive,setSidebarActive] = React.useState(false);
  

  const arr = studentRecords;
  const displayArr = arr.map(item => (
    <Notification 
      name={item.name}
      date={item.date}
      time={item.time}
      dueDate={item.dueDate}
      dueTime={item.dueTime}
      type={item.type}
      grade={item.value}
      discipline={item.discipline}
    />
  ))

  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Notifications</Text>
        <TouchableOpacity
          onPress={() => setSidebarActive(true)}
        >
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={{padding: 15}}>
          {displayArr}
        </View>
      </ScrollView>

      <SidebarModal 
        condition={sidebarActive}
        setCondition={setSidebarActive}
      />

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