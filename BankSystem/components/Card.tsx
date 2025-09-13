import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { getDatabase, onValue, ref } from "firebase/database";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Card = ({
    name,
    currency,
    id,
    iban
} : {
    name: string,
    currency: string,
    id: string,
    iban: string
}) => {

    const { currentUser } = useAuth();

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
                console.log(ibanFinalData[0].quantity);
                setQuantity(ibanFinalData);
            }else{
                setQuantity([]);
            }
        },(error: any) => {
            console.log('Error fetching iban: ',error);
        })

        return () => unsubscribe();

    },[currentUser]);

    return (
        <View style={styles.mainContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{name}</Text>
                <View style={styles.flexbox}>
                    <Text style={styles.big}>{quantity[0].quantity.toFixed(0)},</Text>
                    <Text style={styles.small}>{Number(quantity[0].quantity.toString().split('.')[1]) || '0'}0</Text>
                    <Text style={styles.big}>{currency}</Text>
                </View>
            </View>
            <TouchableOpacity
                style={styles.seeMoreButton}
            > 
                <Text style={styles.buttonText}>See more</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B263B',
        padding: 20,
        borderRadius: 15,
        marginRight: 30,
        marginBottom: 20
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#E0E1DD',
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    flexbox: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    title: {
        color: '#E0E1DD',
        fontSize: 18,
        fontWeight: '400'
    },
    big: {
        color: '#E0E1DD',
        fontSize: 18
    },
    small: {
        color: '#E0E1DD'
    },
    seeMoreButton: {
        backgroundColor: '#415A77',
        padding: 8,
        alignItems: 'center',
        borderRadius: 10,
        maxWidth: 120,
        marginTop: 10
    },
    buttonText: {
        color: '#E0E1DD',
        fontSize: 15
    }
});

export default Card;