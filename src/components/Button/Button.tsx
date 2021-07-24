import React, {Fragment} from 'react';
import {Pressable, StyleSheet, Text, TouchableOpacity} from 'react-native';

interface ButtonProps {
  onClick?: () => void;
  color?: string;
  long?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick = () => console.log('hi'),
  color = '#3d5af1',
  long = false,
}) => {
  return (
    <Pressable
      style={[
        styles.button,
        {backgroundColor: color, width: long ? '100%' : 'auto'},
      ]}
      onPress={onClick}>
      <Text style={styles.textStyle}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 3,
    padding: 10,
    marginBottom: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default Button;
