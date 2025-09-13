import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import { checkCard, generateIBAN, getNameCard } from '@/utils';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { getDatabase, push, ref } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddCard = () => {

    const { currentUser } = useAuth();

    const [name,setName] = React.useState('');
    const [cardNumber,setCardNumber] = React.useState('');
    const [expirationDate,setExpirationDate] = React.useState('');
    const [cvc,setCvc] = React.useState('');

    const pushIBAN = async(iban: string) => {
        const db = getDatabase(app);
        const ibanRef = ref(db,`iban/${iban}`);
        const data = {
            quantity: 0
        }

        await push(ibanRef,data);
    }

    const addCard = async() => {
        try{
            if(!checkCard(cardNumber)) {alert('Invalid Card number! Please enter again.'); return ;}
            else if(cvc.length < 3 || cvc.length > 4) {alert('Invalid CVC! Please enter again.'); return ;}
            else if(expirationDate.length != 5) {alert('Invalid date! Please enter again.'); return ;}
            else if(name.length < 5) {alert('The owner name must be at least 5 characters!'); return ;}
            const db = getDatabase(app);
            const userRef = ref(db,`users/${currentUser.uid}/cards`);
            const iban = generateIBAN();
            const data = {
                name: name,
                cardNumber: cardNumber,
                cardName: getNameCard(cardNumber),
                dateAdded: Date().toString(),
                iban: iban
            }

            await push(userRef,data);

            await pushIBAN(iban);
            router.back();
        }catch(error: any){
            alert(error);
        }
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.flexbox}>
                <Text style={styles.title}>Add here your card</Text>
                <TouchableOpacity
                    onPress={() => router.back()}
                >
                    <AntDesign name="close" size={24} color="#E0E1DD" />
                </TouchableOpacity>
            </View>
            <View style={styles.infoContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Owner name: </Text>
                    <View>
                        <TextInput placeholderTextColor={'#778DA9'} style={styles.input} placeholder="Enter owner name" value={name} onChangeText={(text: string) => setName(text)}/>
                    </View>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Card number:  </Text>
                    <View>
                        <TextInput placeholderTextColor={'#778DA9'} style={styles.input} placeholder="**** **** **** ****" value={cardNumber} onChangeText={(text: string) => setCardNumber(text)}/>
                    </View>
                </View>
                <View style={styles.flexbox}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Expiration date:  </Text>
                        <View>
                            <TextInput placeholderTextColor={'#778DA9'} style={styles.input} placeholder="MM/YY" value={expirationDate} onChangeText={(text: string) => setExpirationDate(text)}/>
                        </View>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CVC </Text>
                        <View>
                            <TextInput placeholderTextColor={'#778DA9'} style={styles.input} placeholder="Enter CVC" value={cvc} onChangeText={(text: string) => setCvc(text)}/>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.addCardButton}
                onPress={addCard}
            >
                <Text style={styles.buttonText}>Add card</Text>
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
    flexbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 15
    },
    title: {
        color: '#E0E1DD',
        fontSize: 22,
        fontWeight: 'bold'
    },
    infoContainer: {
        marginTop: 50
    },
    inputContainer: {
        borderWidth: 2,
        borderColor: '#778DA9',
        padding: 10,
        borderRadius: 15,
        marginBottom: 25,
        minWidth: 165
    },
    label: {
        color: '#778DA9',
        fontSize: 15
    },
    input: {
        color: '#778DA9',
    },
    addCardButton: {
        backgroundColor: '#778DA9',
        padding: 10,
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20
    },
    buttonText: {
        color: '#E0E1DD',
        fontSize: 16
    }
});

export default AddCard;