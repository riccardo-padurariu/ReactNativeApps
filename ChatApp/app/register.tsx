import { useAuth } from "@/Authentification/AuthContext";
import { app, auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {

  const [name,setName] = React.useState('');
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');

  const { setCurrentUser } = useAuth();

  const register = async() => {
    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user.user, {
        displayName: name
      });

      await set(ref(getDatabase(app), "users/" + user.user.uid), {
        uid: user.user.uid,
        email: user.user.email,
        displayName: name,
      });

      setCurrentUser(user.user);
      
      if (user) router.replace('/home');

    } catch (error: any) {
      console.log(error)
      alert('Sign in failed: ' + error.message);
    }
  }


  return (
    <View style={styles.mainContainer}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Welcome!</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput style={styles.input} placeholder="Enter username" value={name} onChangeText={(text: any) => setName(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput style={styles.input} placeholder="Enter email" value={email} onChangeText={(text: any) => setEmail(text)} />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput style={styles.input} placeholder="Enter password" value={password} onChangeText={(text: any) => setPassword(text)} />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={register}
        >
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center',marginTop: 15,justifyContent: 'center',display: 'flex',flexDirection: 'row'}}>
          <Text style={{alignItems: 'center',justifyContent: 'center'}}>You already have an account?
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/register')}
          >
            <Text style={{textDecorationLine: 'underline'}}>Login</Text>
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
    marginTop: 5
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

export default Register;