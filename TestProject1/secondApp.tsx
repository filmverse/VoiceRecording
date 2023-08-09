import React, {useRef, useEffect} from 'react';
import {Text, Button, View, Alert} from 'react-native';

const CustomView = ({buttons}) => {
  return (
    <View style={{marginTop: 20}}>
      {buttons.map((button, index) => (
        <MyButton key={index} title={button.title} onPress={button.onPress} />
      ))}
    </View>
  );
};

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
  const buttons = [
    {
      title: 'Button 1',
      onPress: () => Alert.alert('Button 1 Clicked'),
    },
    {
      title: 'Button 2',
      onPress: () => Alert.alert('Button 2 Clicked'),
    },
    {
      title: 'Button 3',
      onPress: () => Alert.alert('Button 3 Clicked'),
    },
  ];

  return (
    <View>
      <Text>Auto calling Buttons</Text>
      <CustomView buttons={buttons} />
    </View>
  );
};

export default App;
