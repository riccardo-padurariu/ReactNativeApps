import { router } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { DataContext } from "./DataContext";

type UserData = {
  state: string,
  name: string,
  surname: string,
  secondName: string | null;
  grade: number,
  class: string
};

const Register = () => {

  const [code,setCode] = React.useState('');
  const [data,setData] = React.useState<UserData>();
  const {id,setId,idList,setIdList} = useContext(DataContext);
  console.log("id's list: ");
  console.log(idList);

  const isValidCode = (tokens: string[]) => {
    const vals = "SPT";
    const letters = "ABCDEF";
    if(vals.indexOf(tokens[0]) == -1) return false;
    if(Number(tokens[1]) < 9 || Number(tokens[1]) > 12) return false;
    if(letters.indexOf(tokens[2]) == -1) return false;
    setData({
      state: tokens[0],
      name: tokens[3],
      surname: tokens[4],
      secondName: tokens.length < 6 ? null : tokens[5],
      grade: Number(tokens[1]),
      class: tokens[2]
    })
    return true;
  }

  const exists = (id: string) => {
    let found = false;
    idList.forEach((element: string) => {
      if(element === id) found = true;
    });
    return found;
  }

  const handleRegister = () => {
    const tokens = code.split('_');
    if(isValidCode(tokens)){
      const string_id = `${data?.state}_${data?.grade}_${data?.class}_${data?.name} ${data?.surname}${data?.secondName != null ? ` ${data?.secondName}` : ""}`;
      console.log("string id: ",string_id);
      if(!exists(string_id)){
        setId(string_id);
        if(data?.state) router.push('/login');
      }else{
        alert('User already authenticated!');
      }
    }else{
      alert('Invalid code!');
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Text style={{fontSize: 20,fontWeight: '500',marginBottom: 40,width: 225}}>Welcome to the Online Grading System!</Text>
      <View style={styles.registerContainer}>
        <Text style={styles.title}>Enter code to enter your account</Text>
        <View style={styles.input}>
          <TextInput style={styles.input} placeholder='Enter authentication code' value={code} onChangeText={(text: string) => setCode(text)} placeholderTextColor='white'/>
        </View>
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={() => {
            handleRegister();
            console.log(idList);
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
    height: '26%'
  },
  title: {
    fontSize: 18,
    marginBottom: 20
  },
  input: {
    backgroundColor: '#C0C0C0',
    borderRadius: 7,
    paddingLeft: 5
  },
  registerButton: {
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
  }
});

export default Register;