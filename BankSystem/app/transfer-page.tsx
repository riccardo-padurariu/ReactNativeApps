import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import { isValidName } from '@/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from "expo-router";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const TransferPage = () => {

    const {iban,card_id} = useLocalSearchParams();
    const { currentUser } = useAuth();

    const [destinationIBAN,setDestinationIBAN] = React.useState('');
    const [destinationQuantity,setDestinationQuantity] = React.useState('');
    const [ibanId,setIbanId] = React.useState([]);

    React.useEffect(() => {
        if(!currentUser) return ;

        const db = getDatabase(app);
        const ibanRef = ref(db,`iban/${destinationIBAN}`);

        const unsubscribe = onValue(ibanRef, (snapshot) => {
            if(snapshot.exists()){
                const ibanData = snapshot.val();
                
                const ibanFinalData = Object.entries(ibanData).map(([key,value]) => ({
                    ...value,
                    firebaseKey: key
                }));
                
                setIbanId(ibanFinalData);
            }else{
                setIbanId([]);
            }
        },(error: any) => {
            console.log('Error fetching iban: ',error);
        })

        return () => unsubscribe();

    },[currentUser]);

    const validSum = () => {
        if(!destinationQuantity.includes(".")) return false;
        else if(destinationQuantity.includes(`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!"#$%&'()*+,-/:;<=>?@[\]^_{|}~`)) return false;
        return true;
    }

    const validIBAN = () => {
        if(destinationIBAN.length != 29) return false;
        else if(destinationIBAN.substring(0,2) != 'RO') return false;
        if(!isValidName(destinationIBAN)) return false;
        return true;
    }

    const sendTransfer = async() => {
        if(validSum()){
            if(validIBAN()){
                const db = getDatabase(app);
                const ibanRef = ref(db,`iban/${destinationIBAN}/${ibanId[0].firebaseKey}`);

                await update(ibanRef,{quantity: Number(ibanId[0].quantity) + Number(destinationQuantity)});
            }else{
                alert("Invalid IBAN!");
            }
        }else{
            alert("Invalid quantity for the transfer!");
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginTop: 20}}>
                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <AntDesign name="arrowleft" size={24} color="#E0E1DD" />
                </TouchableOpacity>
                <Text style={styles.title}>Transfer</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>From: </Text>
                <Text style={styles.label}>{iban}</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>To: </Text>
                <View>
                    <TextInput placeholder="RO** **** **** **** ****" placeholderTextColor={'#778DA9'} style={styles.input} value={destinationIBAN} onChangeText={(text: string) => setDestinationIBAN(text)}/>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Sum to transfer: </Text>
                <View>
                    <TextInput placeholder="0.00" placeholderTextColor={'#778DA9'} style={styles.input} value={destinationQuantity} onChangeText={(text: string) => setDestinationQuantity(text)}/>
                </View>
            </View>
            <TouchableOpacity
                onPress={sendTransfer}
                style={styles.sendButton}
            >
                <Text style={styles.buttonText}>Send</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#0D1B2A',
        flex: 1,
        padding: 30
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: '#778DA9',
        padding: 15,
        borderRadius: 15,
        marginTop: 20
    },
    label: {
        fontSize: 18,
        color: '#E0E1DD'
    },
    title: {
        color: '#E0E1DD',
        fontSize: 22,
        fontWeight: 'bold',
        marginLeft: 10
    },
    input: {
        fontSize: 15,
        color: '#E0E1DD'
    },
    sendButton: {
        backgroundColor: '#415A77',
        padding: 10,
        borderRadius: 10,
        marginTop: 30,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 18,
        color: '#E0E1DD'
    }
});

export default TransferPage;