import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import Card from '@/components/Card';
import Expenses from '@/components/Expenses';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';


export default function HomeScreen() {

  const { currentUser } = useAuth();

  const [expensesList, setExpensesList] = React.useState([
    {
      title: 'Food',
      currency: '$'
    },
    {
      title: 'Clothing',
      currency: '$'
    },
    {
      title: 'Other expenses',
      currency: '$'
    }
  ]);

  const [cardsList,setCardsList] = React.useState([]);
  const [isLoading,setIsLoading] = React.useState(false);

  React.useEffect(() => {
        if(!currentUser) return ;

        setIsLoading(true);
        const db = getDatabase(app);
        const userRef = ref(db,`users/${currentUser.uid}/cards`);

        const unsubscribe = onValue(userRef, (snapshot) => {
            if(snapshot.exists()){
                const cardsData = snapshot.val();
                const cardsArr = Object.entries(cardsData).map(([key,value]) => ({
                    ...value,
                    firebaseKey: key,
                    currency: '$'
                }))
                console.log(cardsArr);
                setCardsList(cardsArr);
            }else{
                setCardsList([]);
            }
            setIsLoading(false);
        },(error: any) => {
            console.log('Error fetching cards: ',error);
        })

        return () => unsubscribe();

    },[currentUser]);

  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Welcome back, {currentUser.displayName}!</Text>
      <Text style={styles.subtitle}>This month expenses</Text>
      <ScrollView style={styles.scrollContainer} horizontal={true}>
        {expensesList && expensesList.map((item: any) => (
          <Expenses 
            title={item.title}
            currency={item.currency}
          />
        ))}
      </ScrollView>
      <Text style={styles.subtitle}>Your cards</Text>
      {isLoading 
      ? <ActivityIndicator size={'small'} color={'#E0E1DD'} /> 
      : <ScrollView style={{marginTop: 20,marginBottom: 20}}>
        {cardsList.map((item: any) => (
          <Card 
            name={item.name}
            currency={item.currency}
            iban={item.iban}
            id={item.id}
          />
        ))}
      </ScrollView>}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#0D1B2A',
    padding: 30,
    paddingBottom: 0,
    marginBottom: -20,
    paddingRight: 0
  },
  title: {
    color: '#E0E1DD',
    fontSize: 22,
    fontWeight: 'bold',
    margin: 20,
    marginLeft: 0
  },
  subtitle: {
    color: '#E0E1DD',
    fontSize: 18,
    fontWeight: '400'
  },
  scrollContainer: {
    marginTop: 20,
    minHeight: 120,
    maxHeight: 120,
    marginBottom: 30
  }
});
