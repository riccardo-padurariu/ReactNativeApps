import { useAuth } from '@/Authentification/AuthContext';
import { auth } from '@/Authentification/Firebase';
import SidebarModal from '@/components/SidebarModal';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function TabTwoScreen() {

  const [sidebarActive,setSidebarActive] = React.useState(false);
  const { currentUser } = useAuth();
  const [status,setStatus] = React.useState('');
  const [name,setName] = React.useState('');
  const [surname,setSurname] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [className,setClassName] = React.useState('');
  const [grade,setGrade] = React.useState('');
  const [subject,setSubject] = React.useState('');
  
  React.useEffect(() => {
    const initial_string = currentUser.displayName;
    setStatus(initial_string[0] === 'S' ? 'Student' : initial_string[0] === 'T' ? 'Teacher' : 'Parent');
    const tokens = initial_string.split('_');
    setClassName(tokens[2]);
    setGrade(tokens[1]);
    const name_tokens = tokens[3].split(' ');
    setName(name_tokens[0]);
    setSurname(`${name_tokens[1]} ${name_tokens.length === 3 ? name_tokens[2] : ''}`);
    setEmail(currentUser.email);
    setSubject(tokens[4]);
  },[currentUser]);

  console.log('name: ',currentUser.displayName);


  return (
    <View style={styles.mainContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.titleText}>Profile</Text>
        <TouchableOpacity
          onPress={() => setSidebarActive(true)}
        >
          <Feather name="menu" size={24} color='white' />
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>{status}</Text>

      <View style={styles.infoFlex}>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.info}>{name}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Surame</Text>
          <Text style={styles.info}>{surname}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Subject</Text>
          <Text style={styles.info}>{subject}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Class</Text>
          <Text style={styles.info}>{grade} {className}</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>School</Text>
          <Text style={styles.info}>Regina Maria Highschool</Text>
        </View>
        <View style={styles.labelContainer}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.info}>{email}</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={() => {
          router.replace('/register');
          auth.signOut();
        }}  
      >
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

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
    marginBottom: 30,
    padding: 20
  },
  infoFlex: {
    padding: 40,
    rowGap: 10
  },
  labelContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 150,
    maxWidth: 300,
    justifyContent: 'space-between'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  info: {
    fontSize: 16
  },
  logoutButton: {
    margin: 50,
    backgroundColor: '#867CF1',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 19,
    fontWeight: 'bold'
  }
});
