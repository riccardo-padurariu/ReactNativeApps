import { useAuth } from '@/Authentification/AuthContext';
import { app } from '@/Authentification/Firebase';
import OptionsModal from '@/components/OptionsModal';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import { router } from 'expo-router';
import { getDatabase, onValue, ref, remove, update } from 'firebase/database';
import React from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Home = () => {

  const [showOptions,setShowOptions] = React.useState(false);
  const [chatList,setChatList] = React.useState([]);
  const [loading,setLoading] = React.useState(false);
  const [lastMessagesList,setLastMessagesList] = React.useState([]);
  const [visibleList,setVisibleList] = React.useState([]);
  const { currentUser } = useAuth();

  React.useEffect(() => {
    if(!currentUser) return ;

    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats`);
    setLoading(true);
    
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
      setLoading(false);
    },(error: any) => {
      console.log('Error fecthing chats: ',error);
    })

    return () => unsubscribe();

  },[currentUser]);

  React.useEffect(() => {
    console.log(chatList);
    const list = chatList.map((item: any) => {
      return item["last-message"] || null;
    })

    console.log('list: ',list);

    setLastMessagesList(list);

  },[chatList]);

  React.useEffect(() => {
    console.log(chatList);
    const list = chatList.map((item: any) => {
      return item["active"] || null;
    })

    console.log('list: ',list);

    setVisibleList(list);

  },[chatList]);

  const updateVisible = async(id: string,value: boolean) => {
    const db = getDatabase(app);
    const chatRef = ref(db,`users/${currentUser.uid}/chats/${id}/active`);
    
    await update(chatRef,{visible: value});
  }

  const updateAllVisible = (id: string) => {
    chatList.forEach((item: any) => {
      updateVisible(`${item.firebaseKey[0]}_${item.firebaseKey[1]}`, `${item.firebaseKey[0]}_${item.firebaseKey[1]}` === id);
    })
  }

  const deleteChat = async(id: string) => {
    const db = getDatabase(app);
    const chatRef = ref(db,`users/${currentUser.uid}/chats/${id}`);

    await remove(chatRef);
  }


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
        {loading 
        ? <ActivityIndicator style={{marginTop: 100}} size={'large'} color={'#03045E'} />
        : chatList.map((item: any,index: number) => (
          <TouchableOpacity
            onPress={() => router.push({pathname: '/[id_chat]',params: {id_chat: item.firebaseKey[0],name: item.firebaseKey[1]}})}
          >
            <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'space-between',padding: 15,backgroundColor:'#90E0EF',height: 85,borderBottomWidth: 1,borderBottomColor: '#0077B6'}}>
              <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
                <View style={{backgroundColor: '#CAF0F8', padding: 10,borderRadius: '50%'}}>
                  <Feather name="user" size={28} color="#03045E" />
                </View>
                <View style={{marginLeft: 10}}>
                  <Text style={{fontSize: 18,marginBottom: 5}}>{item.firebaseKey[1]}</Text>
                  <View>
                    <Text style={{color: '#03045E',fontStyle: lastMessagesList[index]?.message === 'Message deleted' ? 'italic' : 'normal'}}>{lastMessagesList[index]?.type === 'author' ? 'You: ' : ''}{lastMessagesList[index]?.message ?? 'No recent messages'}</Text>
                  </View>
                </View>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity
                  style={{marginBottom: 10}}
                  onPress={() => updateAllVisible(`${item.firebaseKey[0]}_${item.firebaseKey[1]}`)}
                >
                  <Feather name="more-vertical" size={24} color="#03045E" />
                </TouchableOpacity>
                <Text style={{color: '#03045E'}}>{lastMessagesList[index]?.hour}:{lastMessagesList[index]?.minutes}</Text>
              </View>
            </View>

            {visibleList[index]?.visible &&
              <View style={{position: 'absolute',right: 40,display: 'flex',flexDirection: 'row',alignItems: 'center',backgroundColor: '#CAF0F8',padding: 10,borderRadius: 10,top: 10}}>
                <TouchableOpacity
                  onPress={() => deleteChat(`${item.firebaseKey[0]}_${item.firebaseKey[1]}`)}
                >
                  <Text style={{color: '#03045E',fontSize: 15,marginRight: 15}}>Delete message</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => updateVisible(`${item.firebaseKey[0]}_${item.firebaseKey[1]}`,false)}
                >
                  <AntDesign name="close" size={24} color="#03045E" />
                </TouchableOpacity>
              </View>
            }

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
    bottom: 28,
    right: 28,
    backgroundColor: '#03045E',
    padding: 20,
    borderRadius: '50%'
  }
});

export default Home;