import Feather from '@expo/vector-icons/Feather';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function TabTwoScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text style={styles.title}>Search for music...</Text>
      <View style={styles.inputView}>
        <TextInput placeholder='Search music...' style={styles.inputSearch} />
        <Feather name="search" size={24} color="black" />
      </View>
      <View>
        <View style={styles.classicFlex}>
          <TouchableOpacity>
            <View style={{backgroundColor: '#9A0000',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10,
              marginRight: 20
            }}>
              <Text style={styles.subtitle}>Hip Hop</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{backgroundColor: '#306F00',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10
            }}>
              <Text style={styles.subtitle}>Rock</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.classicFlex}>
          <TouchableOpacity>
            <View style={{backgroundColor: '#9D9A00',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10,
              marginRight: 20
            }}>
              <Text style={styles.subtitle}>Classic</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View style={{backgroundColor: '#0F0351',padding: 10,minWidth: 165,
              minHeight: 100,
              borderRadius: 10
            }}>
              <Text style={styles.subtitle}>Rap</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  title: {
      fontSize: 32,
      fontWeight: "bold",
      color: "white"
  },
  inputView: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    borderRadius: 5,
    marginTop: 15
  },
  inputSearch: {
    flex: 1
  },
  classicFlex: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white"
  }
});
