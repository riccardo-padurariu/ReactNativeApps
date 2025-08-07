import { useAuth } from "@/Authentification/AuthContext";
import { auth } from "@/Authentification/Firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {


  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [subject,setSubject] = React.useState('');
  const { setCurrentUser } = useAuth();

  const login = async() => {
    try{
      const user = signInWithEmailAndPassword(auth,email,password).then((userCredential) => {
        setCurrentUser(userCredential.user);
        console.log(userCredential.user.displayName);
        router.replace('/(tabs)/home');
      })
    }catch(error){
      alert('Error logging in: ' + error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{fontSize: 20,fontWeight: '500',marginBottom: 40,width: 235}}>Welcome back to the food delivery app!</Text>
      <View style={styles.loginContainer}>
        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginBottom: 20, justifyContent: 'space-between'}}>
          <TouchableOpacity
            onPress={() => router.replace('/(tabs)/home')}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Login to enter your account</Text>
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
          style={styles.loginButton}
          onPress={login}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center',marginTop: 7,justifyContent: 'center'}}>
          <Text style={styles.basicText}>
            Not authenticated yet?
          </Text>
          <TouchableOpacity
            onPress={() => {
              router.push('/register');
            }}
          >
            <Text style={{fontSize: 15,textDecorationLine: 'underline'}}>Register</Text>
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
  loginContainer: {
    backgroundColor: '#E8E8E8',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    height: '57%'
  },
  loginButton: {
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
  title: {
    fontSize: 18,
    marginBottom: 0
  },
  input: {
    backgroundColor: '#C0C0C0',
    borderRadius: 7,
    paddingLeft: 5,
  },
  label: {
    color: '#838282',
    marginBottom: 3
  }
});

export default Login;