import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import CardExtended from "@/components/CardExtended";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from "expo-router";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Cards = () => {

    const { currentUser } = useAuth();

    const [cardList,setCardsList] = React.useState([]);

    React.useEffect(() => {
        if(!currentUser) return ;

        const db = getDatabase(app);
        const userRef = ref(db,`users/${currentUser.uid}/cards`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            if(snapshot.exists()){
                const cardsData = snapshot.val();
                const cardsArr = Object.entries(cardsData).map(([key,value]) => ({
                    ...value,
                    firebaseKey: key,
                }))

                setCardsList(cardsArr);
            }else{
                setCardsList([]);
            }
        },(error: any) => {
            console.log('Error fetching cards: ',error);
        })

        return () => unsubscribe();

    },[currentUser]);

    return (
        <View style={styles.mainContainer}>
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between'}}>
                <Text style={styles.title}>Your cards</Text>
                <TouchableOpacity
                    onPress={() => router.push('/add-card')}
                    style={{marginTop: 20}}
                >
                    <AntDesign name="plus" size={24} color="#E0E1DD" />
                </TouchableOpacity>
            </View>
            <ScrollView style={{marginTop: 30}}>
                {cardList && cardList.map((item: any) => (
                    <CardExtended
                        name={item.name}
                        cardName={item.cardName}
                        cardNumber={item.cardNumber}
                        cardId={item.firebaseKey}
                        quantity={item.quantity}
                        iban={item.iban}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#0D1B2A',
        flex: 1,
        padding: 30,
        paddingBottom: 0
    },
    title: {
        color: '#E0E1DD',
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15
    }
});

export default Cards;