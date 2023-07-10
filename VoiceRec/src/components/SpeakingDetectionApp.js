import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import Voice from '@react-native-voice/voice';

const SpeakingDetectionApp = () => {
    const [isSpeaking, setIsSpeaking] = useState(false);

    useEffect(() => {
        Voice.onSpeechStart = onSpeechStartHandler;
        Voice.onSpeechEnd = onSpeechEndHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechStartHandler = () => {
        setIsSpeaking(true);
    };

    const onSpeechEndHandler = () => {
        setIsSpeaking(false);
    };

    return (
        <View>
            <Text>{isSpeaking ? 'User is speaking' : 'User is not speaking'}</Text>
        </View>
    );
};

export default SpeakingDetectionApp;