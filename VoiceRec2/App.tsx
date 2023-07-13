import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Recording from './components/Recording';
import PlaySound from './components/PlaySound';
// import SpeechDetectionApp from './components/SpeechDetectionApp';

export default function App() {
  const [sound, setSound] = React.useState();
  const [recording, setRecording] = React.useState();
  const [recordingUri, setRecordingUri] = React.useState(null);
  const [isRecordingRunning, setIsRecordingRunning] = React.useState(false);

  React.useEffect(() => {
    return () => {
      if (sound) {
        console.log('Unloading Sound');
        sound.unloadAsync();
      }
    };
  }, [sound]);

  return (
    <View style={styles.container}>
      <Recording
        recording={recording}
        setRecording={setRecording}
        setSound={setSound}
        setRecordingUri={setRecordingUri}
        isRecordingRunning={isRecordingRunning}
        setIsRecordingRunning={setIsRecordingRunning}
      />
      <PlaySound recordingUri={recordingUri} setSound={setSound} />
      {/* <SpeechDetectionApp /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 10,
  },
});
