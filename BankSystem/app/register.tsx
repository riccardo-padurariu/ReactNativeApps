import { useAuth } from "@/Authentification/AuthContext";
import { app, auth } from "@/Authentification/Firebase";
import Checkbox from 'expo-checkbox';
import { router } from "expo-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Register = () => {

    const { setCurrentUser } = useAuth();

    const [checked,setChecked] = React.useState(false);
    const [name,setName] = React.useState('');
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [confirmedPassword,setConfirmedPassword] = React.useState('');
    

    const register = async() => {
        if(verify() === 'password') alert("The passwords don't match!");
        else if(verify() === 'checked') alert("You need to accept terms and conditions");
        else{
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
                
                if (user) router.push('/(tabs)/home');

            } catch (error: any) {
            alert('Sign in failed: ' + error.message);
            }
        }
    }

    const verify = () => {
        if(confirmedPassword !== password) return 'password';
        else if(!checked) return 'checked';
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Welcome to the new bank system!</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>Register</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Username</Text>
                    <View style={{paddingLeft: 5,borderBottomWidth: 2,borderColor: '#778DA9'}}>
                        <TextInput style={styles.input} placeholder="username_2025" placeholderTextColor={'#778DA9'} value={name} onChangeText={(text: string) => setName(text)}/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <View style={{paddingLeft: 5,borderBottomWidth: 2,borderColor: '#778DA9'}}>
                        <TextInput style={styles.input} placeholder="something@gmail.com" placeholderTextColor={'#778DA9'} value={email} onChangeText={(text: string) => setEmail(text)}/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Password</Text>
                    <View style={{paddingLeft: 5,borderBottomWidth: 2,borderColor: '#778DA9'}}>
                        <TextInput style={styles.input} placeholder="Enter password" secureTextEntry placeholderTextColor={'#778DA9'} value={password} onChangeText={(text: string) => setPassword(text)}/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Confirm password</Text>
                    <View style={{paddingLeft: 5,borderBottomWidth: 2,borderColor: '#778DA9'}}>
                        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry placeholderTextColor={'#778DA9'} value={confirmedPassword} onChangeText={(text: string) => setConfirmedPassword(text)}/>
                    </View>
                </View>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginTop: 15}}>
                    <Checkbox style={{marginRight: 10}} value={checked} onValueChange={setChecked} />
                    <Text style={styles.text}>Accept Terms and Conditions</Text>
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={register}
                >
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableOpacity>
                <View style={styles.flex}>
                    <Text style={styles.text}>Already have an account?</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/login')}
                    >
                        <Text style={styles.underline}>Log-in.</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#0D1B2A',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        color: '#E0E1DD',
        fontWeight: 'bold',
        marginBottom: 30
    },
    infoContainer: {
        backgroundColor: '#1B263B',
        padding: 30,
        width: '90%',
        borderRadius: 20
    },
    subtitle: {
        textAlign: 'center',
        color: '#E0E1DD',
        fontWeight: 'bold',
        fontSize: 22
    },
    inputContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    label: {
        color: '#E0E1DD',
        fontSize: 16
    },
    input: {
        color: '#778DA9'
    },
    flex: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20
    },
    text: {
        color: '#E0E1DD',
    },
    underline: {
        color: '#E0E1DD',
        textDecorationLine: 'underline'
    },
    loginButton: {
        backgroundColor: '#415A77',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 30
    },
    buttonText: {
        color: '#E0E1DD',
        fontSize: 17,
    }
});

export default Register;
