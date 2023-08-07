import React from 'react';
import {useRef, useEffect} from 'react';
import {Text, Button, View, Alert} from 'react-native';

const App = () => {
  const testBtn = useRef();
  useEffect(() => {
    if (testBtn.current) {
      testBtn.current._internalFiberInstanceHandleDEV.pendingProps.children[1].props.onPress();
      console.log(
        'Working',
        testBtn.current._internalFiberInstanceHandleDEV.memoizedProps.children[1].props.onPress
      );
    }
  }, []);

  return (
    <View ref={testBtn}>
      <Text>Auto calling Button</Text>
      <Button title="Button" onPress={() => Alert.alert('Button Clicked')} />
    </View>
  );
}

export default App;
