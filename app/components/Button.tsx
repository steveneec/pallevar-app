import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';

export default function Button(props: props) {
  return (
    <Pressable
      style={({pressed}) => {
        if (pressed) {
          return [styles.button, styles.buttonPressed];
        }

        if (props?.disabled) {
          return [styles.button, styles.buttonDisabled];
        }

        return styles.button;
      }}
      onPress={() => props.onPress()}
      disabled={props.disabled ? props.disabled : false}>
      <Text style={styles.label}>{props.label}</Text>
      {props.icon && props.icon}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#EC407A',
    padding: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  buttonPressed: {
    backgroundColor: '#E91E63',
  },
  buttonDisabled: {
    backgroundColor: '#BDBDBD',
  },
  label: {
    fontFamily: 'Inter-SemiBold',
    color: 'white',
    fontSize: 16,
    marginHorizontal: 10,
  },
});

interface props {
  label: string;
  onPress: any;
  icon?: React.ReactNode;
  disabled?: boolean;
}
