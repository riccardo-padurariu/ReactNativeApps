import { useAuth } from "@/Authentification/AuthContext";
import { auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {

  const [username,setUsername] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  const { setCurrentUser } = useAuth();

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, {
        displayName: username
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
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <View style={styles.input} >
            <TextInput  
              placeholder="Enter username"
              placeholderTextColor={'white'}
              onChangeText={(text:string) => setUsername(text)}
              value={username}
              style={{color: 'white'}}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.input} >
            <TextInput 
              placeholder="Enter email"
              placeholderTextColor={'white'}
              onChangeText={(text:string) => setEmail(text)}
              value={email}  
              style={{color: 'white'}}
            />
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.input} >
            <TextInput 
              secureTextEntry 
              placeholder="Enter password"
              placeholderTextColor={'white'}
              onChangeText={(text:string) => setPassword(text)}
              value={password}  
              style={{color: 'white'}}
            />
          </View>
        </View>
        <TouchableOpacity 
          style={styles.loginButton}
          onPress={register}
        >
          <Text style={styles.loginButtonText}>Register</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center',marginTop: 20}}>
          <View style={{display: 'flex',flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'white',fontSize: 15,marginRight: 3}}>You don't have an account?</Text>
            <TouchableOpacity 
              onPress={() => router.replace('/login')}
            >
              <Text 
                style={{color: 'white',fontSize: 15,textDecorationLine: 'underline'}}
              >
                Log-in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2C2C2C',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  loginContainer: {
    backgroundColor: '#454545',
    padding: 25,
    borderRadius: 15,
    width: '100%',
    height: '60%'
  },
  title: {
    fontSize: 25,
    color: 'white'
  },
  label: {
    color: 'white',
    marginBottom: 5
  },
  input: {
    backgroundColor: '#2C2C2C',
    width: '100%',
    borderRadius: 10,
    color: 'white',
    paddingLeft: 10,
    padding: 5
  },
  placeholder: {

  },
  loginButton: {
    backgroundColor: '#008A0B',
    alignItems: 'center',
    padding: 10,
    borderRadius: 7
  },
  inputContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
    marginTop: 20
  },
  loginButtonText: {
    fontSize: 18,
    color: 'white'
  }
})

export default Login;