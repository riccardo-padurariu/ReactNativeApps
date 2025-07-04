import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";

const AddedModal = ({
  condition,
  quantity
} : {
  condition: boolean,
  quantity: number
}) => {
  return (
    <Modal
      animationType="slide"
      visible={condition}
      transparent={true}
    >
      <View style={styles.cover}>
      </View>
      <View style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
        <View style={styles.mainContainer}>
            <Text style={styles.text}>{quantity === 1 ?  `1 item added to the cart` : `${quantity} items added to the cart`}</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  cover: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'black',
    opacity: 0.52,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,alignItems: 'center',justifyContent: 'center'
  },
  mainContainer: {
    backgroundColor: 'white',
    padding: 50,
    borderRadius: 15,
    zIndex: 100,
  },
  text: {
    fontFamily: 'ABeeZee',
    fontSize: 17
  }
});

export default AddedModal;