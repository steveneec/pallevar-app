import React from 'react';
import * as Settings from '../config';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import {useHeaderHeight} from '@react-navigation/elements';

export default function Product({route, navigation}: any) {
  const headerHeight = useHeaderHeight();

  return (
    <View style={{height: Dimensions.get('window').height - headerHeight}}>
      <ScrollView contentContainerStyle={styles.content}>
        <Image
          source={{
            uri: `${Settings.apiUrlProductImages}/${route.params.product.picture}`,
          }}
          style={styles.image}
        />
        <View style={styles.overview}>
          <Text style={styles.name}>{route.params.product.name}</Text>
          <Text style={styles.description}>
            {route.params.product.description}
          </Text>
          <Text style={styles.price}>$ {route.params.product.price}</Text>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Ofrecido por</Text>
            <Text
              style={styles.viewAll}
              onPress={() =>
                navigation.push('StoreFeed', {
                  storeid: route.params.product.owner._id,
                })
              }>
              Ver tienda <IonIcon name="chevron-forward" />
            </Text>
          </View>
          {route.params.product.owner && (
            <View style={styles.storeInfo}>
              <View>
                <Text numberOfLines={1} style={styles.storeName}>
                  {route.params.product.owner?.name}
                </Text>
                <Text numberOfLines={2} style={styles.storeDescription}>
                  {route.params.product.owner?.description}
                </Text>
              </View>
              <Image
                source={{
                  uri: `${Settings.apiUrlStoreImages}/${route.params.product.owner?.picture}`,
                }}
                style={styles.storeImage}
              />
            </View>
          )}
          <View>
            <Text style={styles.storeAddress}>
              <IonIcon name="location" /> {route.params.product.owner?.address}
            </Text>
            {route.params.product.owner && (
              <MapView
                initialRegion={JSON.parse(
                  `${route.params.product.owner?.location}`,
                )}
                style={styles.map}
                liteMode>
                <Marker
                  coordinate={JSON.parse(
                    `${route.params.product.owner?.location}`,
                  )}
                />
              </MapView>
            )}
          </View>
        </View>
      </ScrollView>
      <View style={styles.AddContainer}>
        <Button
          label="Agregar al pedido"
          icon={<IonIcon name="add-outline" color="#fff" size={24} />}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 100,
  },
  image: {
    height: Dimensions.get('window').height * 0.3,
  },
  overview: {
    padding: 20,
    backgroundColor: '#fff',
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
  },
  price: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    marginTop: 10,
    color: '#388E3C',
  },
  section: {
    backgroundColor: '#fff',
    marginTop: 10,
    padding: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  storeImage: {
    width: 96,
    height: 96,
  },
  map: {
    height: Dimensions.get('window').width * 0.4,
  },
  storeInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  storeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#000',
  },
  storeDescription: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  storeAddress: {
    marginVertical: 10,
    fontFamily: 'Inter-Regular',
    color: '#E91E63',
  },
  AddContainer: {
    position: 'absolute',
    backgroundColor: '#fff',
    elevation: 1,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  viewAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#F06292',
    alignSelf: 'flex-start',
  },
});
