import { useAuth } from "@/Authentification/AuthContext";
import { auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {

  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const {setCurrentUser} = useAuth();

  const login = async() => {
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser(userCredential.user);
      console.log(userCredential.user.displayName);
      router.replace('/home');
    }catch(error: any){
      alert('Error logging in: ' + error.message);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Welcome back!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={(text: any) => setEmail(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput secureTextEntry style={styles.input} placeholder="Enter password" value={password} onChangeText={(text: any) => setPassword(text)} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.buttonText}>Log-in</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center',marginTop: 15,justifyContent: 'center',display: 'flex',flexDirection: 'row'}}>
          <Text style={{alignItems: 'center',justifyContent: 'center'}}>Not authenticated yet?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/register')}
          >
            <Text style={{textDecorationLine: 'underline'}}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#CAF0F8',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '75%',
    borderRadius: 15
  },
  title: {
    fontSize: 20,
    marginBottom: 20
  },
  inputContainer: {
    marginBottom: 15
  },
  label: {

  },
  input: {
    backgroundColor: '#CAF0F8',
    borderRadius: 10,
    marginTop: 5,
    padding: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#03045E',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  }
});

export default Login;