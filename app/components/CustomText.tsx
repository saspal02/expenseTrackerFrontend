import React from 'react';
import { StyleSheet, Text } from 'react-native';

const CustomText = ({style, children, ...props}) => {
  return (
    <Text style={[styles.text, style]} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: 'black',
    fontFamily: 'Helvetica',
  },
});

export default CustomText;