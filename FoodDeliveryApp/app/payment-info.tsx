import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import AddCardModal from '@/components/AddCardModal';
import Card from '@/components/Card';
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PaymentInfo = () => {

  const { currentUser } = useAuth();
  const [cardList,setCardList] = React.useState([]);
  const [isAdding,setIsAdding] = React.useState(false);

  React.useEffect(() => {
    if(!currentUser) return;

    const db = getDatabase(app);
    const cardRef = ref(db,`users/${currentUser.uid}/cards`);

    const unsubscribe = onValue(cardRef, (snapshot) => {
      if(snapshot.exists()){
        const cardData = snapshot.val();
        
        const cardArr = Object.entries(cardData).map(([key,value]) => ({
          ...value,
          firebaseKey: key
        }));

        setCardList(cardArr);
      }else{
        setCardList([]);
      }
    }, (error: any) => {
      console.log('Error fetching cards: ',error);
    });

    return () => unsubscribe();

  },[currentUser]);

  return (
    <View style={styles.mainContainer}>
      <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',marginBottom: 10}}>
        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => router.back()}
          >
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>Payment Infos</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsAdding(true)}
        >
          <Text style={styles.buttonText}>Add card</Text>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {cardList.length === 0 
      ? <Text style={styles.title}>No cards</Text>
      : cardList.map((item: any) => 
        <Card 
          name={item.name}
          number={item.number}
          date={item.date}
          id={item.firebaseKey}
          active={item.active}
        />
      )
      }

      <AddCardModal 
        condition={isAdding}
        setCondition={setIsAdding}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30
  },
  title: {
    fontFamily: 'ABeeZee',
    fontSize: 20,
    marginLeft: 10
  },
  addButton: {
    backgroundColor: '#FFE311',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 12
  },
  buttonText: {
    fontFamily: 'ABeeZee',
    fontSize: 16,
    color: 'white'
  }
});

export default PaymentInfo;