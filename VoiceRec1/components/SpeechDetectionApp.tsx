import React, {useEffect, useState} from 'react';
import {View, Text, Button} from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeechDetectionApp = () => {
  const [isListening, setIsListening] = useState(false);
  const [recognizedText, setRecognizedText] = useState('');

  useEffect(() => {
    Voice.onSpeechStart = () => {
      setIsListening(true);
    };

    Voice.onSpeechEnd = () => {
      setIsListening(false);
    };

    Voice.onSpeechResults = e => {
      setRecognizedText(e.value[0]);
    };

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startListening = async () => {
    setIsListening(true);
    try {
      await Voice.start('en-US');
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = async () => {
    setIsListening(false);
    try {
      await Voice.stop();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontSize: 20, marginBottom: 20}}>
        {isListening ? 'Listening...' : 'Not Listening'}
      </Text>
      <Text style={{fontSize: 16}}>{recognizedText}</Text>
      <Button
        title={isListening ? 'Stop Listening' : 'Start Listening'}
        onPress={isListening ? stopListening : startListening}
      />
    </View>
  );
};

export default SpeechDetectionApp;
