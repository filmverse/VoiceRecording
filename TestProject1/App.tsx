import React, {useRef, useEffect} from 'react';
import {Text, Button, View, Alert} from 'react-native';

const MyButton = React.forwardRef((props, ref) => {
  const buttonRef = useRef();

  useEffect(() => {
    if (buttonRef.current) {
      buttonRef.current.props.onPress();
    }
  }, [props.onPress]);

  return <Button ref={buttonRef} {...props} />;
});

const App = () => {

  return (
    <View>
      <Text>Auto calling Buttons</Text>
      <MyButton
        title="Button 1"
        onPress={() => Alert.alert('Button 1 Clicked')}
      />
      <MyButton
        title="Button 2"
        onPress={() => Alert.alert('Button 2 Clicked')}
      />
      <MyButton
        title="Button 3"
        onPress={() => Alert.alert('Button 3 Clicked')}
      />
    </View>
  );
};

export default App;
