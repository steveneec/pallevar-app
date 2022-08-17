import React from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {product} from '../interfaces';
import * as Settings from '../config';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default function ProductCard(props: props) {
  return (
    <Pressable
      style={({pressed}) => {
        if (pressed) {
          return [stylesProductCard.view, stylesProductCard.viewPressed];
        }

        return stylesProductCard.view;
      }}
      onPress={() => {
        props.navigation.push('Product', {product: props.product});
      }}>
      <View style={stylesProductCard.overview}>
        <Text style={stylesProductCard.title} numberOfLines={1}>
          {props.product.name}
        </Text>
        <Text style={stylesProductCard.store}>
          <EntypoIcon name="shop" /> {props.product.owner.name}
        </Text>
        <Text style={stylesProductCard.description} numberOfLines={1}>
          {props.product.description}
        </Text>
        <Text style={stylesProductCard.price}>$ {props.product.price}</Text>
      </View>

      <Image
        source={{
          uri: `${Settings.apiUrlProductImages}/${props.product.picture}`,
        }}
        style={stylesProductCard.image}
        resizeMode="cover"
      />
    </Pressable>
  );
}

interface props {
  product: product;
  navigation?: any;
}

const stylesProductCard = StyleSheet.create({
  view: {
    padding: 20,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    alignItems: 'center',
  },
  viewPressed: {
    backgroundColor: '#FAFAFA',
  },
  overview: {
    flex: 1.8,
  },
  image: {
    width: 86,
    height: 86,
    marginLeft: 10,
    flex: 0.5,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#212121',
  },
  description: {
    fontFamily: 'Inter-Regular',
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    marginTop: 10,
    color: '#000',
    fontSize: 16,
  },
  store: {
    color: '#F48FB1',
  },
});
