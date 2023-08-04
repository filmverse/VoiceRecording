import React from 'react';
import { useRef } from 'react';
import {Text, Button, View, Alert} from 'react-native';

const App = () => {
  const testBtn = useRef();
  setTimeout(() => {
    if (testBtn.current) {
      testBtn.current.props.onPress();
    }
  }, 5000);
  return (
    <View>
      <Text>Auto calling Button</Text>
      <Button
        title="Button"
        ref={testBtn}
        onPress={() => Alert.alert('Button Clicked')}
      />
    </View>
  );
}

export default App;
