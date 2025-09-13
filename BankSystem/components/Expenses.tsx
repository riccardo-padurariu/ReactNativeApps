import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Expenses = ({
    title,
    currency
} : {
    title: string,
    currency: string
}) => {
    return (
        <View style={styles.mainContainer}>
            <View style={styles.infoContainer}>
                <Text style={styles.title}>{title}</Text>
                <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                    <View style={styles.valueContainer}>
                        <Text style={styles.big}>{32},</Text>
                        <Text style={styles.small}>{50}</Text>
                        <Text style={styles.big}>{currency}</Text>
                    </View>
                    <View style={{marginLeft: 5,backgroundColor: '#0D1B2A',padding: 10,borderRadius: '50%'}}>
                        {title === 'Food' 
                        ? <MaterialCommunityIcons name="food-outline" size={24} color="#e88001ff" />
                        : title === 'Clothing'
                        ? <Feather name="shopping-bag" size={24} color="#009f0dff" />
                        : <MaterialIcons name="devices-other" size={24} color="#c70bd8ff" />
                        }
                    </View>
                </View>
            </View>
            <TouchableOpacity
                style={styles.seeMoreButton}
            >
                <Text style={styles.buttonText}>See more</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#1B263B',
        borderRadius: 15,
        padding: 20,
        marginRight: 20,
        paddingTop: 10
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        minWidth: 210,
        borderBottomWidth: 2,
        borderBottomColor: '#E0E1DD',
        paddingBottom: 7
    },
    title: {
        color: '#E0E1DD',
        fontSize: 17,
        fontWeight: '400',
        marginRight: 15
    },
    valueContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    big: {
        color: '#E0E1DD',
        fontSize: 17,
    },
    small: {
        color: '#E0E1DD',
        marginLeft: 3,
        marginRight: 3
    },
    seeMoreButton: {
        borderBottomColor: '#E0E1DD',
        borderBottomWidth: 1,
        maxWidth: 80,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#E0E1DD',
        fontSize: 16
    }
});

export default Expenses;