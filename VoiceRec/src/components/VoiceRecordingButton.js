import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import Voice from '@react-native-voice/voice';

const VoiceRecordingButton = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [speechResults, setSpeechResults] = useState([]);

    useEffect(() => {
        Voice.onSpeechResults = onSpeechResultsHandler;

        return () => {
            Voice.destroy().then(Voice.removeAllListeners);
        };
    }, []);

    const onSpeechResultsHandler = (event) => {
        const speechRecognitionResults = event.value;
        setSpeechResults(speechRecognitionResults);
    };

    const startRecording = async () => {
        setIsRecording(true);

        try {
            await Voice.start('en-US');
        } catch (error) {
            console.error(error);
        }
    };

    const stopRecording = async () => {
        setIsRecording(false);

        try {
            await Voice.stop();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <TouchableOpacity
            onPress={isRecording ? stopRecording : startRecording}
            style={{
                padding: 16,
                backgroundColor: isRecording ? 'red' : 'green',
                borderRadius: 8,
            }}
        >
            <Text style={{ color: 'white', fontSize: 18 }}>
                {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Text>
            {speechResults.length > 0 && (
                <Text style={{ marginTop: 10 }}>
                    Speech Recognition Results: {speechResults.join(', ')}
                </Text>
            )}
        </TouchableOpacity>
    );
};

export default VoiceRecordingButton;
