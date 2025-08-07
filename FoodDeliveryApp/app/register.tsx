import { auth } from "@/Authentification/Firebase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {

  const [code,setCode] = React.useState('');
  const [data,setData] = React.useState();
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [name,setName] = React.useState('');


  const handleRegister = async() => {
    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user.user, {
          displayName: name
        });
        setCurrentUser(user.user);
        if (user) router.replace('/(tabs)/home');

      } catch (error: any) {
        console.log(error)
        alert('Sign in failed: ' + error.message);
      }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{fontSize: 20,fontWeight: '500',marginBottom: 40,width: 225}}>Welcome back to the food delivery app!</Text>
      <View style={styles.registerContainer}>
        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Complete the infos to register</Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.label}>Name</Text>
          <View style={styles.input}>
            <TextInput style={styles.input} placeholder='Enter name' value={name} onChangeText={(text: string) => {setName(text)}} placeholderTextColor='white'/>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input}>
            <TextInput style={styles.input} placeholder='Enter email' value={email} onChangeText={(text: string) => {setEmail(text)}} placeholderTextColor='white'/>
          </View>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input}>
            <TextInput style={styles.input} placeholder='Enter password' value={password} onChangeText={(text: string) => {setPassword(text)}} placeholderTextColor='white'/>
          </View>
        </View>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => {
            handleRegister();
          }}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center',marginTop: 7,justifyContent: 'center'}}>
          <Text style={styles.basicText}>
            Already authenticated?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/login')}
          >
            <Text style={{fontSize: 15,textDecorationLine: 'underline'}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40
  },
  registerContainer: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    height: '50%'
  },
  title: {
    fontSize: 18,
    marginBottom: 0
  },
  input: {
    backgroundColor: '#C0C0C0',
    borderRadius: 7,
    paddingLeft: 5
  },
  registerButton: {
    backgroundColor: '#FFE311',
    borderRadius: 10,
    alignItems: 'center',
    padding: 10,
    marginTop: 20
  },
  buttonText: {
    fontSize: 16,
    color: 'white'
  },
  basicText: {
    fontSize: 15,
  },
  label: {
    color: '#838282',
    marginBottom: 3
  }
});

export default Register;