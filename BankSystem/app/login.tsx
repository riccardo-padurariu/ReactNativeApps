import { useAuth } from "@/Authentification/AuthContext";
import { auth } from "@/Authentification/Firebase";
import { router } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const Login = () => {

    const {setCurrentUser} = useAuth();

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');

    const login = async() => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            setCurrentUser(userCredential.user);
            console.log(userCredential.user.displayName);
            router.push('/(tabs)/home');
        }catch(error: any){
            alert('Error logging in: ' + error.message);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.title}>Welcome to the new bank system!</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.subtitle}>Log-in</Text>
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
                <View style={styles.flex}>
                    <Text style={styles.text}>Forgot password?</Text>
                    <TouchableOpacity>
                        <Text style={styles.underline}>Click here.</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={login}
                >
                    <Text style={styles.buttonText}>Log-in</Text>
                </TouchableOpacity>
                <View style={styles.flex}>
                    <Text style={styles.text}>New here?</Text>
                    <TouchableOpacity
                        onPress={() => router.push('/register')}
                    >
                        <Text style={styles.underline}>Register.</Text>
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

export default Login;