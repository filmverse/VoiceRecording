import React from 'react';
import {SafeAreaView, StyleSheet, Text, View, Button} from 'react-native';
import SpeechDetectionApp from './components/SpeechDetectionApp';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <SpeechDetectionApp />
      {/* <View>
        <Text style={styles.title}>Hellow World!</Text>
        <Button title="Hello Click!" />
        <SpeechDetectionApp />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
});

export default App;
