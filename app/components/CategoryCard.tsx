import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import {category} from '../interfaces';
import * as Settings from '../config';

export function CategoryMini(props: props) {
  return (
    <Pressable
      style={({pressed}) => {
        if (pressed) {
          return [styles.layout, props.style, styles.layoutPressed];
        }

        return [styles.layout, props.style];
      }}
      onPress={() => {
        console.log(props.category);
        props.navigation.push('CategoryStore', {category: props.category});
      }}>
      <Image
        source={{
          uri: `${Settings.apiUrlCategoryImages}/${props.category.picture}`,
        }}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>{props.category.name}</Text>
    </Pressable>
  );
}

interface props {
  category: category;
  navigation: any;
  style?: ViewStyle;
}

const styles = StyleSheet.create({
  layout: {
    padding: 10,
    backgroundColor: 'white',
    width: Dimensions.get('window').width * 0.45,
    height: Dimensions.get('window').width * 0.2,
    elevation: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  layoutPressed: {
    backgroundColor: '#FFEBEE',
  },
  image: {
    width: Dimensions.get('window').width * 0.2,
    height: Dimensions.get('window').width * 0.2,
    position: 'absolute',
    right: -10,
    bottom: -10,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    width: '50%',
  },
});

export function CategoryText(props: props) {
  return (
    <Pressable
      style={({pressed}) => {
        if (pressed) {
          return [
            stylesCategoryText.card,
            props.style,
            stylesCategoryText.cardPressed,
          ];
        }

        return [stylesCategoryText.card, props.style];
      }}
      onPress={() =>
        props.navigation.push('CategoryStore', {category: props.category})
      }>
      <Text style={stylesCategoryText.text}>{props.category.name}</Text>
    </Pressable>
  );
}

const stylesCategoryText = StyleSheet.create({
  card: {
    elevation: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    marginVertical: 5,
  },
  cardPressed: {
    backgroundColor: '#F5F5F5',
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    color: '',
  },
});
