import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import OptionsModal from '@/components/OptionsModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { getDatabase, onValue, ref } from 'firebase/database';
import React from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {

  const [showOptions,setShowOptions] = React.useState(false);
  const [chatList,setChatList] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if(!currentUser) return ;

    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats`);
    
    const unsubscribe = onValue(userRef, (snapshot) => {
      if(snapshot.exists()){
        const chatData = snapshot.val();

        const chatArr = Object.entries(chatData).map(([key,value]) => ({
          ...value,
          firebaseKey: key.split('_')
        }))

        setChatList(chatArr);
      }else{
        setChatList([]);
      }
    },(error: any) => {
      console.log('Error fecthing chats: ',error);
    })

    return () => unsubscribe();

  },[currentUser]);

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <Text style={styles.title}>Chat app</Text>
          <View style={styles.flex}>
            <TouchableOpacity>
              <AntDesign style={{marginRight: 10}} name="search1" size={24} color="#90E0EF" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowOptions(true)}
            >
              <Feather name="more-vertical" size={24} color="#90E0EF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView>
        {chatList.map((item: any) => (
          <TouchableOpacity
            onPress={() => router.push({pathname: '/[id_chat]',params: {id_chat: item.firebaseKey[0],name: item.firebaseKey[1]}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',padding: 15,backgroundColor:'#90E0EF',height: 85}}>
              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <View style={{backgroundColor: '#CAF0F8', padding: 10,borderRadius: '50%'}}>
                  <Feather name="user" size={28} color="#03045E" />
                </View>
                <Text style={{marginLeft: 10,fontSize: 18}}>{item.firebaseKey[1]}</Text>
              </View>
              <TouchableOpacity>
                <Feather name="more-vertical" size={24} color="#03045E" />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity 
        style={styles.newButton}
        onPress={() => router.push('/search-page')}
      >
        <AntDesign name="plus" size={24} color="white" />
      </TouchableOpacity>

      <OptionsModal 
        condition={showOptions}
        setCondition={setShowOptions}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8',
    position: 'relative'
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#0077B6',
  },
  title: {
    fontSize: 22,
    color: 'white'
  },
  headerInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  newButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#03045E',
    padding: 10,
    borderRadius: '50%'
  }
});

export default Home;