import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { getDatabase, ref, remove } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const CardExtended = ({
    name,
    cardName,
    cardNumber,
    cardId,
    quantity,
    iban
} : {
    name: string,
    cardName: string,
    cardNumber: string,
    cardId: string,
    quantity: string,
    iban: string
}) => {

    const { currentUser } = useAuth();

    const [isActive,setIsActive] = React.useState(false);

    const deleteCard = async() => {
        const db = getDatabase(app);
        const cardRef = ref(db,`users/${currentUser.uid}/cards/${cardId}`);

        await remove(cardRef);
    }

    return (
        <View style={styles.mainContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
                <TouchableOpacity
                    onPress={() => setIsActive(true)}
                >
                    <Feather name="more-vertical" size={24} color="#E0E1DD" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity>
                <LinearGradient
                    colors={['#FF00E1','#0022FF']}
                    style={styles.cardContainer}
                >
                    <Text style={styles.info}>{cardName}</Text>
                    <Text style={styles.info}>**** **** **** {cardNumber.substring(cardNumber.length-4,cardNumber.length)}</Text>
                </LinearGradient>
            </TouchableOpacity>
            {isActive && <View style={{display: "flex",flexDirection: 'row',alignItems: 'flex-start',position: 'absolute',top: 20,right: 20,backgroundColor: '#0D1B2A',padding: 15,borderRadius: 10}}>
                <View style={{rowGap: 10}}>
                    <TouchableOpacity
                        onPress={() => router.push({pathname: '/transfer-page',params: {card_id: cardId, iban: iban}})}
                    >
                        <Text style={{color: '#E0E1DD',fontSize: 15,marginRight: 20}}>Make transfer</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => router.push({pathname: '/withdraw', params: {card_id: cardId, iban: iban}})}
                    >
                        <Text style={{color: '#E0E1DD',fontSize: 15,marginRight: 20}}>Withdraw sum</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={deleteCard}
                    >
                        <Text style={{color: '#E0E1DD',fontSize: 15,marginRight: 20}}>Delete card</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={() => setIsActive(false)}
                >
                    <AntDesign name="close" size={24} color="#E0E1DD" />
                </TouchableOpacity>
            </View>}
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B263B',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 15
    },
    title: {
        color: '#E0E1DD',
        fontSize: 18,
        fontWeight: '500'
    },
    cardContainer: {
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 150,
        borderRadius: 15
    },
    info: {
        color: '#E0E1DD',
        fontSize: 18
    }
});

export default CardExtended;