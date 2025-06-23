import { StyleSheet, Text, View } from 'react-native';


export default function TabTwoScreen() {
  return (
    <View style={styles.mainContainer}>
      <Text>cart</Text>
    </View>  
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white'
  }
});
