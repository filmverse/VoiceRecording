import React from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import Voice from '@react-native-voice/voice';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Hello World !</Text>
        <Text>Hello World !</Text>
        <Text>Hello World !</Text>
        <Button
          title="Click ME!"
          onPress={() =>
            Alert.alert(`Testing button and alert, ${Voice.isAvailable()}`)
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});

export default App;
