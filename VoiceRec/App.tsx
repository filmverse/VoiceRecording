import React from 'react';
import {View, StyleSheet} from 'react-native';
import VoiceRecordingButton from './src/components/VoiceRecordingButton';

const App = () => {
  return (
    <View style={styles.container}>
      <VoiceRecordingButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
