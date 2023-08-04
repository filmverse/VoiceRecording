import React from 'react';
import {useRef, useEffect} from 'react';
import {Text, Button, View, Alert} from 'react-native';

const App = () => {
  const testBtn = useRef();
  useEffect(() => {
    const interval = setInterval(() => {
      if (testBtn.current) {
        testBtn.current.props.onPress();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
