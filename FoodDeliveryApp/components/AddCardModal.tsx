import { DataContext } from "@/app/DataProvider";
import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import AntDesign from '@expo/vector-icons/AntDesign';
import { getDatabase, push, ref, update } from "firebase/database";
import React, { useContext } from "react";
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const AddCardModal = ({
  condition,
  setCondition
} : {
  condition: boolean,
  setCondition: any
}) => {

  const { currentUser } = useAuth();
  const { cardList } = useContext(DataContext);
  const [name,setName] = React.useState('');
  const [number,setNumber] = React.useState('');
  const [date,setDate] = React.useState('');
  const [cvc,setCvc] = React.useState('');

  const addCardDb = async() => {
    const db = getDatabase(app);
    const cardRef = ref(db,`users/${currentUser.uid}/cards`);
    const data = {
      name: name,
      number: number,
      date: date,
      cvc: cvc,
      active: true
    };

    await push(cardRef,data);
  }

  const inactiveCard = async(card_id: string) => {
    const db = getDatabase(app);
    const cardRef = ref(db,`users/${currentUser.uid}/cards/${card_id}`);

    await update(cardRef,{active: false});
  }

  const inactive = async() => {
    cardList.forEach((element: any) => {
      inactiveCard(element.firebaseKey);
    });
  }

  const addCard = async() => {
    try{
      await inactive();
      await addCardDb();

      setCondition(false);
    }catch(error: any){
      console.log('Error pushing card to database: ', error);
    }
  }

  return (
    <Modal
      animationType="slide"
      visible={condition}
      transparent={true}
    >
      <View style={styles.cover}></View>
      <View style={styles.mainContainer}>
        <View style={styles.infoContainer}> 
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginBottom: 20}}>
            <Text style={{fontFamily: 'ABeeZee',fontSize: 18}}>Add the card informations </Text>
            <TouchableOpacity
              onPress={() => setCondition(false)}
            >
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Full card owner name</Text>
            <TextInput style={styles.input} placeholder="Enter owner name" value={name} onChangeText={(text: string) => setName(text)} />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Card number</Text>
            <TextInput style={styles.input} placeholder="Enter card number" value={number} onChangeText={(text: string) => setNumber(text)} />
          </View>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card expiration date</Text>
              <TextInput style={styles.input} placeholder="LL/AA" value={date} onChangeText={(text: string) => setDate(text)} />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Card CVC</Text>
              <TextInput style={styles.input} placeholder="CVC" value={cvc} onChangeText={(text: string) => setCvc(text)}/>
            </View>
          </View>
          <TouchableOpacity 
              style={styles.addButton}
              onPress={() => addCard().then(() => setCondition(false))}
            >
              <Text style={styles.buttonText}>Add card</Text>
            </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,alignItems: 'center',justifyContent: 'center'
  },
  mainContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  infoContainer: {
    backgroundColor: 'white',
    padding: 20,
    width: '85%',
    height: '48%',
    borderRadius: 15
  },
  inputContainer: {
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10
  },
  label: {
    fontFamily: 'ABeeZee'
  },
  input: {
    fontFamily: 'ABeeZee'
  },
  addButton: {
    backgroundColor: '#FFE311',
    alignItems: 'center',
    padding: 10,
    borderRadius: 10
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    color: 'white'
  }
});

export default AddCardModal;