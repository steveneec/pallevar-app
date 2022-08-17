import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {store} from '../interfaces';
import IonIcon from 'react-native-vector-icons/Ionicons';
import * as Settings from '../config';

export function StoreHomeCard(props: props) {
  return (
    <Pressable
      style={stylesHomeCard.card}
      onPress={() =>
        props.navigation.push('StoreFeed', {storeid: props.store._id})
      }>
      <View>
        <Image
          source={{uri: `${Settings.apiUrlStoreImages}/${props.store.picture}`}}
          style={stylesHomeCard.image}
        />
        <Text style={stylesHomeCard.address}>
          <IonIcon name="location" /> {props.store.address}
        </Text>
      </View>
      <View style={stylesHomeCard.overview}>
        <Image
          source={{
            uri: `${Settings.apiUrlStoreImages}/${props.store.picture}`,
          }}
          style={stylesHomeCard.miniImage}
          resizeMode="cover"
        />
        <View>
          <Text style={stylesHomeCard.title}>{props.store.name}</Text>
          <Text style={stylesHomeCard.category}>
            {
              //@ts-ignore
              props.store.category[0].name
            }
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const stylesHomeCard = StyleSheet.create({
  card: {
    elevation: 1,
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  image: {
    height: Dimensions.get('window').width * 0.3,
  },
  overview: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#000',
  },
  category: {
    fontFamily: 'Inter-Medium',
  },
  address: {
    fontFamily: 'Inter-Medium',
    position: 'absolute',
    bottom: 10,
    left: 20,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    borderRadius: 20,
    color: '#E91E63',
    paddingVertical: 5,
  },
  miniImage: {
    resizeMode: 'contain',
    width: 48,
    height: 48,
    marginRight: 20,
  },
});

interface props {
  store: store;
  navigation: any;
}
