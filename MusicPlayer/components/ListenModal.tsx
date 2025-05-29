import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import React, { useEffect } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";


const ListenModal = ({
  condition,
  setCondition,
  songName,
  songAuthor,
  duration,
  currentTime,
  setCurrentTime
} : {
  condition: boolean,
  setCondition: any,
  songName: string,
  songAuthor: string,
  duration: string,
  currentTime: number,
  setCurrentTime: any
}) => {

  const [isPlaying, setIsPlaying] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const getSeconds = (duration: string) => {
    let seconds = 0;
    const minutes = Number(duration.substring(0,1));
    const sec = Number(duration.slice(-2));

    seconds = minutes*60 + sec; 

    return seconds;
  }

  const portion = 100/getSeconds(duration);

  let timer: ReturnType<typeof setInterval>;

  const format = (time: number) => {


    if(time === 0)
      return {minutes: '0',seconds: '0'};

    const seconds = String(time%60);
    const minutes = String((time/60) | 0);

    return {minutes: minutes,seconds: seconds};
  }

  const play = () => {
    if (currentTime >= getSeconds(duration)) {
      setCurrentTime(0);
    }
    setIsPlaying(true);

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    timerRef.current = setInterval(() => {
      setCurrentTime((prev: number) => {
        const newTime = prev + 1;
        if (newTime >= getSeconds(duration)) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
          setIsPlaying(false);
        }
        return newTime;
      });
    }, 1000);
  }

  const stop = () => {
    setIsPlaying(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  }

  return (
    <Modal 
      visible={condition}
      animationType='slide'
    >
      <View style={styles.musicModal}>
        <TouchableOpacity onPress={() => setCondition(false)} style={styles.backButton}>
          <AntDesign name="down" size={24} color="white" />
        </TouchableOpacity>
      
        <View style={styles.coverPlaceholder}>
          <Feather name="music" size={124} color="#008A0B" />
        </View>

        <View style={{marginTop: 20,marginBottom: 3}}>
          <Text style={styles.musicName}>{songName}</Text>
          <Text style={styles.musicAuthor}>{songAuthor}</Text>
        </View>
        
        <View style={{flex: 1,height: 10}}>
          <View style={{display: 'flex',flexDirection: 'row',justifyContent:'space-between'}}>
            <Text style={styles.time}>{`${format(currentTime).minutes}:${Number(format(currentTime).seconds) <= 9 ? '0' : ''}${format(currentTime).seconds}`}</Text>
            <Text style={styles.time}>{duration}</Text>
          </View>
          <View style={styles.support}>
            <View style={{
              position: 'relative',
              backgroundColor: '#888888',
              height: 4,
              width: `${portion*currentTime}%`,
              borderRadius: 10
            }}></View>
          </View>
        </View>

        <View style={{display: 'flex',flexDirection: "row",alignItems: 'center',justifyContent: 'space-between',padding: 35}}>
          <TouchableOpacity>
            <View>
              <AntDesign name="stepbackward" size={55} color="white" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={isPlaying ? stop : play}
          >
            <View style={styles.playButton}>
              {isPlaying 
                ? <AntDesign name="pause" size={38} color="black" />
                : <AntDesign name="caretright" size={38} color="black" />
              }
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
  )
}

const styles = StyleSheet.create({
  musicModal: {
    backgroundColor: "#2C2C2C",
    flex: 1,
    padding: 30
  },
  backButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 30,
    width: 56,
    padding: 15,
    paddingLeft: 17
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
    padding: 17,
    borderRadius: 40
  }
});

export default ListenModal;