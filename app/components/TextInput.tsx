import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
} from 'react-native';

export default function TextInput(props: props) {
  return (
    <View style={styles.view}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <RNTextInput
        style={styles.input}
        value={props.value}
        onChangeText={props.onChangeText}
        placeholder={props.placeholder}
        keyboardType={props.keyboardType}
      />
      {props.caption && <Text style={styles.caption}>{props.caption}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginVertical: 5,
  },
  input: {
    backgroundColor: 'white',
    color: '#37474F',
    fontFamily: 'Inter-Medium',
    paddingHorizontal: 10,
    borderColor: '#CFD8DC',
    borderWidth: 1,
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Inter-SemiBold',
    color: '#455A64',
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    marginTop: 5,
  },
});

interface props {
  value: string;
  onChangeText: any;
  label?: string;
  caption?: string;
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
}
