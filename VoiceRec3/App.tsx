import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import Voice, {SpeechResultsEvent} from '@react-native-voice/voice';

const Separator = () => <View style={styles.separator} />;

const App = () => {
  const [end, setEnd] = useState('');
  const [started, setStarted] = useState('');
  const [results, setResults] = useState([]);
  const [partialResults, setPartialResults] = useState([]);
  const [recording, setRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechPartialResults = onSpeechPartialResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStart = (e: any) => {
    console.log('onSpeechStart: ', e);
    setStarted('√');
    setRecording(true);
  };

  const onSpeechEnd = (e: any) => {
    console.log('onSpeechEnd: ', e);
    setEnd('√');
    setRecording(false);
  };

  const onSpeechResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechResults: ', e);
    setResults(e.value);
  };

  const onSpeechPartialResults = (e: SpeechResultsEvent) => {
    console.log('onSpeechPartialResults: ', e);
    setPartialResults(e.value);
  };

  const _startRecognizing = async () => {
    _clearState();
    try {
      await Voice.start('en-US');
      await Voice.start('en-IN');
      console.log('called start');
    } catch (e) {
      console.error(e);
    }
  };

  const _stopRecognizing = async () => {
    try {
      await Voice.stop();
      await Voice.stop();
    } catch (e) {
      console.error(e);
    }
  };

  const _destroyRecognizer = async () => {
    try {
      await Voice.destroy();
      await Voice.destroy();
    } catch (e) {
      console.error(e);
    }
    _clearState();
  };

  const _clearState = () => {
    setEnd('');
    setStarted('');
    setResults([]);
    setPartialResults([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Voice Rec-Version3</Text>
      <Text style={styles.title1}>{`Started: ${started}`}</Text>
      <Separator />
      <Text style={styles.title1}>Results</Text>
      {results.map((result, index) => {
        return (
          <Text key={`result-${index}`} style={styles.title1}>
            {result}
          </Text>
        );
      })}
      <Separator />
      <Text style={styles.title1}>Partial Results</Text>
      {partialResults.map((result, index) => {
        return (
          <Text key={`partial-result-${index}`} style={styles.title1}>
            {result}
          </Text>
        );
      })}
      <Separator />
      <Text style={styles.title1}>{`End: ${end}`}</Text>
      <Separator />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? _stopRecognizing : _startRecognizing}
      />
      <Separator />
      <Button
        title="Destroy Rec"
        color={'#FF0000'}
        onPress={_destroyRecognizer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#380C2A',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    borderWidth: 4,
    borderColor: '#859900',
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
    color: '#00FF00',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;
