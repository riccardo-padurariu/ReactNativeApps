import LatestsHits from '@/components/LatestsHits';
import Scroll from '@/components/Scroll';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {

  const [isListening,setIsListening] = React.useState(false);

  return (
    <ScrollView style={styles.mainContainer}>
      <View style={styles.greet}>
        <Text style={styles.title}>
          Hello User!
        </Text>
        <TouchableOpacity>
          <FontAwesome name="user-circle-o" size={30} color="#888888" />
        </TouchableOpacity>
      </View>
      <LatestsHits handle={setIsListening} />
      <Scroll type='album' margin={0}/>
      <Scroll type='playlist' margin={90}/>

      <Modal 
        visible={isListening}
        animationType='slide'
      >
        <View style={styles.musicModal}>
          <TouchableOpacity onPress={() => setIsListening(false)} style={styles.backButton}>
            <AntDesign name="down" size={24} color="white" />
          </TouchableOpacity>
        
          <View style={styles.coverPlaceholder}>
            <Feather name="music" size={124} color="#008A0B" />
          </View>

          <View style={{marginTop: 20,marginBottom: 30}}>
            <Text style={styles.musicName}>Song name</Text>
            <Text style={styles.musicAuthor}>Song author</Text>
          </View>
          
          <View style={{flex: 1,height: 10, alignItems: 'flex-end'}}>
            <Text style={styles.time}>2:34</Text>
            <View style={styles.support}>
              <View style={styles.progress}></View>
            </View>
          </View>

          <View style={{display: 'flex',flexDirection: "row",alignItems: 'center',justifyContent: 'space-between',padding: 35}}>
            <TouchableOpacity>
              <View>
                <AntDesign name="stepbackward" size={55} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View style={styles.playButton}>
                <AntDesign name="caretright" size={50} color="black" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View>
                <AntDesign name="stepforward" size={55} color="white" />
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#2C2C2C",
    paddingTop: 50,
    paddingBottom: 50,
    paddingLeft: 30,
    paddingRight: 30
  },
  greet: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white"
  },
  musicModal: {
    backgroundColor: "#2C2C2C",
    flex: 1,
    padding: 30
  },
  backButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    width: 56,
    padding: 15
  },
  coverPlaceholder: {
    marginTop: 50,
    height: 380,
    borderRadius: 25,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
    justifyContent: 'center'
  },
  musicName: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold'
  },
  musicAuthor: {
    fontSize: 18,
    color: '#888888',
  },
  support: {
    width: '100%',
    height: 4,
    borderRadius: 10,
    backgroundColor: '#454545',
  },
  progress: {
    position: 'relative',
    backgroundColor: '#888888',
    height: 4,
    width: '34%',
    borderRadius: 10
  },
  time: {
    color: 'white',
    marginBottom: 5
  },
  playButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 40
  }
});
