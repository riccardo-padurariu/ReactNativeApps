import { useAuth } from "@/Authentification/AuthContext";
import { app, auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "./DataContext";

const Login = () => {

  const {id,idList,setId} = useContext(DataContext);

  const [valid,setValid] = React.useState(id === '' ? false : true);
  const [email,setEmail] = React.useState('');
  const [password,setPassword] = React.useState('');
  const [subject,setSubject] = React.useState('');
  const { setCurrentUser } = useAuth();

  const fetchData = async() => {
    const db = getDatabase(app);
    const userRef = ref(db,`loggedUsers`);
    const new_id = id[0] === 'T' ? `${id}_${subject}` : id;
    await push(userRef,new_id);
  }

  const addToSection = async() => {
    const tokens = id.split('_');
    const db = getDatabase(app);
    const link = id[0] === 'S' ? `students/${tokens[1]}${tokens[2]}` : id[0] === 'T' ? 'teachers' : 'parents';
    const pushRef = ref(db,link);
    const new_id = id[0] === 'T' ? `${id}_${subject}` : id;
    const data = {
      id: new_id,
      gradesHistory: [],
      homeworks: [],
      schedule: [],
      grades: [],
      absents: []
    }
    await push(pushRef,data);
  }

  const login = async() => {
    if(valid){
      try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user.user, {
          displayName: id[0] === 'T' ? `${id}_${subject}` : id 
        });
        setCurrentUser(user.user);
        if(valid){
          fetchData().then(() => addToSection());
        }
        if (user) router.replace('/(tabs)/home');

      } catch (error: any) {
        console.log(error)
        alert('Sign in failed: ' + error.message);
      }
    }else{
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
  }

  idList.forEach((element: any) => {
    if(element === id) setValid(false);
  });

  return (
    <View style={styles.mainContainer}>
      <Text style={{fontSize: 20,fontWeight: '500',marginBottom: 40,width: 235}}>{valid ? 'Welcome to the Online Grading System!' : 'Welcome back to the Online Grading System!'}</Text>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>{valid ? 'To increase security please create an account,after that the code will not be availble anymore' : 'Login to enter your account'}</Text>
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
        {valid && id[0] === 'T' && 
          <View style={{marginBottom: 10}}> 
            <Text style={styles.label}>Subject</Text>
            <View style={styles.input}>
              <TextInput style={styles.input} placeholder='Enter the subject you are teaching' value={subject} onChangeText={(text: string) => {setSubject(text)}} placeholderTextColor='white'/>
            </View>
          </View>
        }
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
              setId('');
              if(id === '') router.push('/register');
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
    backgroundColor: '#867CF1',
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
    marginBottom: 20
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