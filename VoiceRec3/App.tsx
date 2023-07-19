/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert} from 'react-native';
import Voice, {
  SpeechRecognizedEvent,
  SpeechResultsEvent,
} from '@react-native-voice/voice';

const App = () => {
  const [recognized, setRecognized] = useState('');
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
  };

  const onSpeechRecognized = (e: SpeechRecognizedEvent) => {
    console.log('onSpeechRecognized: ', e);
    setRecognized('√');
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('en-US');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setRecognized('');
    setEnd('');
    setStarted('');
    setResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Rec-Version3</Text>
      <Text style={styles.title1}>{`Started: ${started}`}</Text>
      <Text style={styles.title1}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.title1}>Results</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.title1}>
            {result}
          </Text>
        );
      })}
      <Text style={styles.title1}>{`End: ${end}`}</Text>
      <Button title="Start Rec" onPress={_startRecognizing} />
      <Button title="Stop Rec" onPress={_stopRecognizing} />
      <Button title="Destroy Rec" onPress={_destroyRecognizer} />
    </View>
  );
};

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
