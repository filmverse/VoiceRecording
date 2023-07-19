/* eslint-disable prettier/prettier */
import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";
import Voice from "@react-native-voice/voice";

const App = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Voice Rec-Version3</Text>
        <Text style={styles.title1}>
          Response Result: I am hoping the result should be a big text array
        </Text>
        <Button title="Press Me" onPress={() => {Alert.alert("Button Clicked Successfully")}}/>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#eaeaea',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#20232a',
    borderRadius: 6,
    backgroundColor: '#61dafb',
    color: '#20232a',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title1: {
    textAlign: 'center',
    marginVertical: 8,
    color: '#380C2A',
  },
});

export default App;