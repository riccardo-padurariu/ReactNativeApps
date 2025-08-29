import { useAuth } from "@/Authentification/AuthContext";
import { app } from "@/Authentification/Firebase";
import { generate } from "@/utils";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { router, useLocalSearchParams } from "expo-router";
import { getDatabase, onValue, push, ref, update } from "firebase/database";
import React from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const ChatPage = () => {

  const { id_chat, name } = useLocalSearchParams();
  const { currentUser } = useAuth();
  const [message,setMessage] = React.useState('');
  const [chat,setChat] = React.useState<any[]>([]);
  const [recevierChat,setRecevierChat] = React.useState([]);
  const scrollViewRef = React.useRef<ScrollView | null>(null);

  React.useEffect(() => {
    if(!currentUser) return ;

    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}`);
    
    const unsubscribe = onValue(userRef, (snapshot) => {
      if(snapshot.exists()){
        const chatData = snapshot.val();

        const finalArr = Object.entries(chatData).map(([key,value]) => ({
          ...value,
          date: key.split('-')
        }));

        const chatArr = finalArr.filter((item: any) => item.date[0] != 'last' && item.date[0] != 'active'); 

        console.log('chatArr: ',chatArr);

        chatArr.forEach((item: any) => {
          if(item.chat){

            const chat_arr = Object.entries(item.chat).map(([key,value]) => ({
              ...value,
              message_id: key
            }));

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
              else if(Number(a.minutes) < Number(b.minutes)) return -1;
              else if(a.seconds > b.seconds) return 1;
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

  React.useEffect(() => {
    if(!currentUser) return ;

    const db = getDatabase(app);
    const listRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}`);

    const unsubscribe = onValue(listRef, (snapshot) => {
      if(snapshot.exists()){
        const chatData = snapshot.val();

        const finalArr = Object.entries(chatData).map(([key,value]) => ({
          ...value,
          date: key.split('-')
        }));

        const chatArr = finalArr.filter((item: any) => item.date[0] != 'last' && item.date[0] != 'active'); 


        chatArr.forEach((item: any) => {
          if(item.chat){

            const chat_arr = Object.entries(item.chat).map(([key,value]) => ({
              ...value,
              message_id: key
            }));

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
              else if(Number(a.minutes) < Number(b.minutes)) return -1;
              else if(a.seconds > b.seconds) return 1;
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

        setRecevierChat(chatArr);

      }else{
        setRecevierChat([]);
      }
    },(error: any) => {
      console.log('Error fetching chat: ', error);
    })

    return () => unsubscribe();

  },[currentUser]);

  React.useEffect(() => {
    if (chat.length > 0) {
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  }, [chat]);


  const addMessageAuthor = async(new_id: string) => {
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
      seconds: date.getSeconds(),
      message: message,
      visible: false,
      id: new_id
    };

    await push(userRef,data);
  }

  const addMessageRecevier = async(new_id: string) => {
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
      seconds: date.getSeconds(),
      message: message,
      visible: false,
      id: new_id
    };

    await push(userRef,data);
  }

  const updateLastAuthor = async() => {
    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/last-message`);
    const date = new Date();
    const data = {
      type: 'author',
      day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      month: date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1,
      year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
      hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      seconds: date.getSeconds(),
      message: message,
    }

    await update(userRef,data);
  }

  const updateLastRecevier = async() => {
    const db = getDatabase(app);
    const userRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}/last-message`);
    const date = new Date();
    const data = {
      type: 'recevier',
      day: date.getDate() < 10 ? `0${date.getDate()}` : date.getDate(),
      month: date.getMonth()+1 < 10 ? `0${date.getMonth()+1}` : date.getMonth()+1,
      year: date.getFullYear() < 10 ? `0${date.getFullYear()}` : date.getFullYear(),
      hour: date.getHours() < 10 ? `0${date.getHours()}` : date.getHours(),
      minutes: date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(),
      seconds: date.getSeconds(),
      message: message,
    }

    await update(userRef,data);
  }

  const addVisibleAuthor = async() => {
    const db = getDatabase(app);
    const chatRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/active`);

    await update(chatRef,{visible: false});
  }

  const addVisibleRecevier = async() => {
    const db = getDatabase(app);
    const chatRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}/active`);

    await update(chatRef,{visible: false});
  }

  const addMessage = async() => {
    try{

      const new_id = generate();

      await addMessageAuthor(new_id);
      await addMessageRecevier(new_id); 
      await updateLastAuthor();
      await updateLastRecevier();
      await addVisibleAuthor();
      await addVisibleRecevier();

      setMessage('');
    }catch(error: any){
      console.log('Error sending message: ',error);
    }
  }

  const toggleVisible = async(id: string,date_id: string,value: boolean) => {
    const db = getDatabase(app);
    const messageRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/${date_id}/chat/${id}`);

    await update(messageRef,{visible: value});
  }

  const updateVisible = (message_arr: any[],id: string,date_id: string) => {
    message_arr.forEach((item: any) => {
      toggleVisible(item.message_id,date_id,item.message_id === id);
    })
  }

  const deleteMessage = async(id: string,date_id: string) => {
    const db = getDatabase(app);
    const messageRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/${date_id}/chat/${id}`);

    await update(messageRef,{message: 'Message deleted'});
  }

  const deleteMessageRecevier = async(id: string,date_id: string) => {
    const db = getDatabase(app);
    const messageRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}/${date_id}/chat/${id}`);

    await update(messageRef,{message: 'Message deleted'});
  }

  const updateLast = async() => {
    const db = getDatabase(app);
    const userRef = ref(db,`users/${currentUser.uid}/chats/${id_chat}_${name}/last-message`);
  
    await update(userRef,{message: 'Message deleted'});
  }

  const updateLastRecevierDelete = async() => {
    const db = getDatabase(app);
    const userRef = ref(db,`users/${id_chat}/chats/${currentUser.uid}_${currentUser.displayName}/last-message`);
  
    await update(userRef,{message: 'Message deleted'});
  }

  const delete_update = async(id: string,date_id: string,msj_id: string) => {
    try{

      let author_id = "",index_author;
      chat.forEach((item: any) => {
        if(`${item.date[0]}-${item.date[1]}-${item.date[2]}` === date_id){
          item.chat.forEach((item: any,index: number) => {
            if(item.id === msj_id) author_id = item.message_id,index_author = index;
          })
        }
      })

      await deleteMessage(id,date_id);
      if(index_author === chat.length - 1) await updateLast();

      let message_id = "",index;
      recevierChat.forEach((item: any) => {
        if(`${item.date[0]}-${item.date[1]}-${item.date[2]}` === date_id){
          item.chat.forEach((item: any,index: number) => {
            if(item.id === msj_id) message_id = item.message_id,index = index;
          })
        }
      })

      await deleteMessageRecevier(message_id,date_id);
      if(index === recevierChat.length - 1) await updateLastRecevierDelete();
    }catch(error: any){
      console.log('Error deleting message: ',error);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={-10} 
      style={{flex: 1,backgroundColor: '#CAF0F8'}}
    >
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
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 130, marginTop: 30}}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
          ref={scrollViewRef}
        >
          {chat.length === 0
          ? <Text style={{color: '#03045E',fontSize: 17,padding: 30,alignItems: 'center',textAlign: 'center'}}>No conversation yet :( Start by sending a message &#128522;!</Text>
          : chat.map((item: any) => (
            <View>
              <View>
                <View style={{alignItems: 'center',marginBottom: 20}}>
                  <Text style={{padding: 12,backgroundColor: '#90E0EF',borderRadius: 10,color: '#03045E',fontSize: 16}}>{item.date[0]}.{item.date[1]}.{item.date[2]}</Text>
                </View>
              </View>
              {item.chat.map((msj: any) => (
                <TouchableOpacity
                  style={{backgroundColor: msj.visible ? '#ACF2FF' : 'transparent'}}
                >
                  <View style={{paddingLeft: 30,paddingRight: 30,padding: 3,alignItems: msj.type === 'recevier' ? 'flex-start' : 'flex-end'}}>
                    <TouchableOpacity
                      onPressIn={() => {
                        if(msj.type === 'author')
                          updateVisible(item.chat,msj.message_id,`${msj.day}-${msj.month}-${msj.year}`);
                      }}
                    >
                      <View style={{backgroundColor: msj.type === 'recevier' ? '#90E0EF' : '#00B4D8',padding: 15,borderRadius: 10,borderTopRightRadius: msj.type === 'recevier' ? '' : 0,borderTopLeftRadius: msj.type === 'recevier' ? 0 : '',minWidth: 100,maxWidth: 220}}>
                        <Text style={{color: 'white',fontSize: 17,marginBottom: 10, fontStyle: msj.message === 'Message deleted' ? 'italic' : 'normal'}}>{msj.message}</Text>
                        <View style={{display: 'flex',flexDirection: 'row',alignItems: 'center',justifyContent: 'flex-end'}}>
                          <AntDesign name="clockcircleo" size={20} color="white" />
                          <Text style={{color: 'white',marginLeft: 7}}>{msj.hour}:{msj.minutes}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  {msj.visible && msj.type === 'author' && 
                    <View style={{position: 'absolute',right: 40,display: 'flex',flexDirection: 'row',alignItems: 'center',backgroundColor: '#90E0EF',padding: 10,borderRadius: 10,top: 10}}>
                      <TouchableOpacity
                        onPress={() => delete_update(msj.message_id,`${msj.day}-${msj.month}-${msj.year}`,msj.id)
                        }
                      >
                        <Text style={{color: '#03045E',fontSize: 15,marginRight: 15}}>Delete message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => toggleVisible(msj.message_id,`${msj.day}-${msj.month}-${msj.year}`,false)}
                      >
                        <AntDesign name="close" size={24} color="#03045E" />
                      </TouchableOpacity>
                    </View>
                  }
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </ScrollView>
        <View style={{position: 'absolute',bottom: 40,left: 20,right: 20,display: 'flex',flexDirection: 'row',alignItems: 'center'}}>
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
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#CAF0F8',
    position: 'relative',
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