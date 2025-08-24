import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { getDatabase, onValue, push, ref } from "firebase/database";
import React from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ChatPage = () => {

  const { id_chat, name } = useLocalSearchParams();
  const { currentUser } = useAuth();
  const [message,setMessage] = React.useState('');
  const [chat,setChat] = React.useState([]);
  const scrollViewRef = React.useRef<ScrollView>(null);


  React.useEffect(() => {
    if(!currentUser) return ;

    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}`);
    
    const unsubscribe = onValue(userRef, (snapshot) => {
      if(snapshot.exists()){
        const chatData = snapshot.val();

        const chatArr = Object.entries(chatData).map(([key,value]) => ({
          ...value,
          date: key.split('-')
        }));

        console.log('chatArr: ',chatArr);

        chatArr.forEach((item: any) => {
          if(item.chat){

            const chat_arr = Object.values(item.chat);

            chat_arr.sort((a: any,b: any) => {
              if(Number(a.year) > Number(b.year)) return 1;
              else if(Number(a.year) < Number(b.year)) return -1;
              else if(Number(a.month) > Number(b.month)) return 1;
              else if(Number(a.month) < Number(b.month)) return -1;
              else if(Number(a.day) > Number(b.day)) return 1;
              else if(Number(a.day) < Number(b.day)) return -1;
              else if(Number(a.hour) > Number(b.hour)) return 1;
              else if(Number(a.hour) < Number(b.hour)) return -1;
              else if(Number(a.minutes) > Number(b.minutes)) return 1;
              else return -1;
            });

            item.chat = chat_arr;
          }
        })

        chatArr.sort((a: any,b: any) => {
          if(a.date[2] > b.date[2]) return 1;
          else if(Number(a.date[2]) < Number(b.date[2])) return -1;
          else if(Number(a.date[1]) > Number(b.date[1])) return 1;
          else if(Number(a.date[1]) < Number(b.date[1])) return -1;
          else if(Number(a.date[0]) > Number(b.date[0])) return 1;
          else return -1;
        });

        setChat(chatArr);

      }else{
        setChat([]);
      }
    },(error: any) => {
      console.log('Error fetching chat: ', error);
    })

    return () => unsubscribe();

  },[currentUser]);

  const addMessageAuthor = async() => {
    const date = new Date();
    const date_id = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear()}`;
    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/${date_id}/chat`);
    const data = {
      type: 'author',
      day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      month: date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1,
      year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
      hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      message: message
    };

    await push(userRef,data);
  }

  const addMessageRecevier = async() => {
    const date = new Date();
    const date_id = `${date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()}-${date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1}-${date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear()}`;
    const db = getDatabase(app);
    const userRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}/${date_id}/chat`);
    const data = {
      type: 'recevier',
      day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      month: date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1,
      year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
      hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      message: message
    };

    await push(userRef,data);
  }

  const addMessage = async() => {
    try{
      await addMessageAuthor();
      await addMessageRecevier();

      setMessage('');
    }catch(error: any){
      console.log('Error sending message: ',error);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerInfo}>
          <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
            <TouchableOpacity 
              onPress={() => router.back()}
              style={{marginRight: 10}}
            >
              <AntDesign name="arrowleft" size={24} color="white" />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
          </View>
          <View style={styles.flex}>
            <TouchableOpacity>
              <AntDesign style={{marginRight: 10}} name="search1" size={24} color="#90E0EF" />
            </TouchableOpacity>
            <TouchableOpacity
              
            >
              <Feather name="more-vertical" size={24} color="#90E0EF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={{marginTop: 30,marginBottom: 70}}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
      >
        {chat.map((item: any) => (
          <View>
            <View>
              <View style={{alignItems: 'center',marginBottom: 20}}>
                <Text style={{padding: 12,backgroundColor: '#90E0EF',borderRadius: 10,color: '#03045E',fontSize: 16}}>{item.date[0]}.{item.date[1]}.{item.date[2]}</Text>
              </View>
            </View>
            {item.chat.map((msj: any) => (
              <View style={{paddingLeft: 30,paddingRight: 30,padding: 3,alignItems: msj.type === 'recevier' ? 'flex-start' : 'flex-end'}}>
                <View style={{backgroundColor: msj.type === 'recevier' ? '#90E0EF' : '#00B4D8',padding: 15,borderRadius: 10,borderTopRightRadius: msj.type === 'recevier' ? '' : 0,borderTopLeftRadius: msj.type === 'recevier' ? 0 : '',minWidth: 100,maxWidth: 220}}>
                  <Text style={{color: 'white',fontSize: 17,marginBottom: 10}}>{msj.message}</Text>
                  <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end'}}>
                    <AntDesign name="clockcircleo" size={20} color="white" />
                    <Text style={{color: 'white',marginLeft: 7}}>{msj.hour}:{msj.minutes}</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        ))}
      </ScrollView>

      <View style={styles.sendContainer}>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} placeholder="Type a message" placeholderTextColor={'#03045E'} value={message} onChangeText={(text: string) => setMessage(text)}/>
        </View>
        <TouchableOpacity 
          style={styles.sendButton}
          onPress={addMessage}
        >
          <Feather name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
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
  sendContainer: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputContainer: {
    flex: 1,
    backgroundColor: 'white',
    paddingLeft: 15,
    padding: 2,
    borderRadius: 40,
    marginRight: 15
  },
  input: {
    fontSize: 16
  },
  sendButton: {
    backgroundColor: '#03045E',
    padding: 12,
    borderRadius: '50%'
  }
});

export default ChatPage;