import React from 'react';
import {useRef, useEffect} from 'react';
import {Text, Button, View, Alert} from 'react-native';

const App = () => {
  const testBtn = useRef();
  useEffect(() => {
    if (testBtn.current) {
      // testBtn.current.props.onPress();
      testBtn.current._internalFiberInstanceHandleDEV.pendingProps.children[1].props.onPress();
      console.log(
        'Working',
        testBtn.current._internalFiberInstanceHandleDEV.pendingProps.children[1].props.onPress
      );
    }
    // const interval = setInterval(() => {
    //   if (testBtn.current) {
    //     // testBtn.current.props.onPress();
    //     console.log('Working', testBtn.current._internalFiberInstanceHandleDEV);
    //   }
    // }, 5000);

    // return () => clearInterval(interval);
  }, []);

  return (
    <View ref={testBtn}>
      <Text>Auto calling Button</Text>
      <Button title="Button" onPress={() => Alert.alert('Button Clicked')} />
    </View>
  );
}

export default App;
