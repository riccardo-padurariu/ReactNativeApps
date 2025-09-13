import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router, useLocalSearchParams } from "expo-router";
import { getDatabase, onValue, ref, update } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const WithdrawPage = () => {

    const {card_id, iban} = useLocalSearchParams();
    const { currentUser } = useAuth();

    const [color,setColor] = React.useState('#18385B');
    const [sum1,setSum1] = React.useState('');
    const [sum2,setSum2] = React.useState('');
    const [quantity,setQuantity] = React.useState([]);

    React.useEffect(() => {
        if(!currentUser) return ;

        const db = getDatabase(app);
        const ibanRef = ref(db,`iban/${iban}`);

        const unsubscribe = onValue(ibanRef, (snapshot) => {
            if(snapshot.exists()){
                const ibanData = snapshot.val();

                const ibanFinalData = Object.entries(ibanData).map(([key,value]) => ({
                    ...value,
                    firebaseKey: key
                }));

                setQuantity(ibanFinalData);
            }else{
                setQuantity([]);
            }
        },(error: any) => {
            console.log('Error fetching iban: ',error);
        })

        return () => unsubscribe();

    },[currentUser]);


    const withdraw = async() => {
        const db = getDatabase(app);
        const userRef = ref(db,`iban/${iban}/${quantity[0].firebaseKey}`);

        await update(userRef,{quantity: Number(quantity[0].quantity) + Number(`${sum1}.${sum2}`)})
    }

    return (
        <View style={styles.mainContainer}>
            <View style={{alignItems: 'center',marginTop: 200}}>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                    <TouchableOpacity 
                        onPress={() => router.back()}
                        style={{marginRight: 10}}
                    >
                        <AntDesign name="arrowleft" size={32} color="#E0E1DD" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Withdraw from</Text>
                </View>
                <Text style={styles.title}>your bank account:</Text>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                    <TextInput style={{padding: 0,fontSize: 36,color: color}} placeholder="0" onFocus={() => setColor('#E0E1DD')} onBlur={() => setColor('#18385B')} placeholderTextColor={color} value={sum1} onChangeText={(text: string) => setSum1(text)}/>
                    <Text style={{fontSize: 36,color: color}}>.</Text>
                    <TextInput style={{padding: 0,fontSize: 36,color: color}} placeholder="00" onFocus={() => setColor('#E0E1DD')} onBlur={() => setColor('#18385B')} placeholderTextColor={color} value={sum2} onChangeText={(text: string) => setSum2(text)}/>
                    <Text style={{fontSize: 36,color: color,marginLeft: 10}}>$</Text>
                </View>
                <TouchableOpacity 
                    style={{backgroundColor: '#415A77',padding: 15,borderRadius: 20,marginTop: 30}}
                    onPress={withdraw}    
                >
                    <Text style={{fontSize: 32, color: '#E0E1DD'}}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#0D1B2A',
        padding: 30,
        alignItems: 'center',
    },
    title: {
        color: '#E0E1DD',
        fontSize: 36,
        fontWeight: 'bold'
    },

});

export default WithdrawPage;