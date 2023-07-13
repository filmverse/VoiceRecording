import {useEffect} from 'react';
import {View, Text, Button} from 'react-native';
import {Audio} from 'expo-av';
import Voice from '@react-native-voice/voice';

const Recording = ({
  recording,
  setRecording,
  setSound,
  setRecordingUri,
  isRecordingRunning,
  setIsRecordingRunning,
}) => {
  async function startRecording() {
        try {
            console.log('Requesting permissions..');
            const { granted } = await Audio.requestPermissionsAsync();
            if (!granted) {
                console.log('Permissions not granted');
                return;
            }

            console.log('Starting recording..');
            const recordingOptions = {
                isMeteringEnabled: true,
                android: {
                    extension: '.3gp',
                    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_DEFAULT,
                    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_DEFAULT,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                },
                ios: {
                    extension: '.m4a',
                    outputFormat: Audio.RECORDING_OPTION_IOS_OUTPUT_FORMAT_MPEG4AAC,
                    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
                    sampleRate: 44100,
                    numberOfChannels: 2,
                    bitRate: 128000,
                    linearPCMBitDepth: 16,
                    linearPCMIsBigEndian: false,
                    linearPCMIsFloat: false,
                },
            };

            const { recording } = await Audio.Recording.createAsync(recordingOptions);
            setRecording(recording);
            console.log('Recording started');
            setIsRecordingRunning(true);
            Voice.start('en-US');
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        console.log('Stopping recording..');
        const status = await recording.getStatusAsync();
        if (status.isRecording === true) {
          // Wait a few milliseconds to give the `Recording` object a chance to initialize.
          await new Promise(resolve => setTimeout(resolve, 1000));
          await recording.stopAndUnloadAsync();
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
          });
        }
        console.log('Stopping recording.. step2');
        const uri = recording.getURI();
        setRecording(null);
        setSound(new Audio.Sound());
        console.log('Recording stopped and stored at', uri);
        setRecordingUri(uri); // Update the recording URI state variable
        setIsRecordingRunning(false);
        Voice.stop();
    }

    Voice.onSpeechEnd = async(e: any) => {
      console.log('onSpeechEnd: ', e);
      setIsRecordingRunning(false);
      await stopRecording();
      return () => {
        Voice.destroy().then(Voice.removeAllListeners);
      };
    };

  return (
    <View>
      <Text>{isRecordingRunning ? 'Recording...' : 'Recording Stopped'}</Text>
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
    </View>
  );
};

export default Recording;