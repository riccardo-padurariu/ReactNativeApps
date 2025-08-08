import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { getDatabase, ref, remove } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";


const Card = ({
  name,
  number,
  date,
  id,
  active
} : {
  name: string,
  number: number,
  date: any,
  id: string,
  active: boolean
}) => {

  const { currentUser } = useAuth();

  const deleteCard = async() => {
    const db = getDatabase(app);
    const cardRef = ref(db,`users/${currentUser.uid}/cards/${id}`);

    await remove(cardRef);
  }

  return (
    !active
    ? <LinearGradient 
        style={styles.mainContainer}
        colors={['#FFE311','#FF1111']}
      >
        <View style={{alignItems: 'flex-start',marginBottom: 10,justifyContent: 'space-between',display: 'flex',flexDirection: 'row'}}>
          <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{name}</Text>
          <TouchableOpacity
            onPress={deleteCard}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'flex-start',marginBottom: 10}}>
          <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{number}</Text>
        </View>
        <View style={{alignItems:'flex-end',marginBottom: 10,justifyContent: active ? 'space-between' : ''}}>
          {!active && 
          <TouchableOpacity
            style={{backgroundColor: '#FFE311',alignItems: 'center',padding: 5,borderRadius: 10}}  
          >
            <Text style={{color: 'white',fontFamily: 'ABeeZee',fontSize: 15}}>Set as active</Text>
          </TouchableOpacity>}
          <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{date}</Text>
        </View>
      </LinearGradient>
    : <View style={styles.activeCard}>
        <LinearGradient 
          style={styles.mainContainer}
          colors={['#FFE311','#FF1111']}
        >
          <View style={{alignItems: 'flex-start',marginBottom: 10,justifyContent: 'space-between',display: 'flex',flexDirection: 'row'}}>
            <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{name}</Text>
            <TouchableOpacity
              onPress={deleteCard}
            >
              <AntDesign name="close" size={24} color="white" />
            </TouchableOpacity>
          </View>
          <View style={{alignItems: 'flex-start',marginBottom: 10}}>
            <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{number}</Text>
          </View>
          <View style={{alignItems: 'flex-end',marginBottom: 10}}>
            <Text style={{fontFamily: 'ABeeZee',color: 'white',fontSize: 17}}>{date}</Text>
          </View>
        </LinearGradient>
        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',marginTop: 10}}>
          <Text style={{fontFamily: 'ABeeZee',color: 'green',marginRight: 5,fontSize: 16}}>Active</Text>
          <FontAwesome name="check-circle" size={24} color="green" />
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    padding: 15,
    borderRadius: 15,
  },
  activeCard: {
    borderWidth: 1.4,
    padding: 10,
    borderRadius: 10,
    borderColor: 'green',
    marginBottom: 10
  }
});

export default Card;