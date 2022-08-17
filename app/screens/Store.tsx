/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Settings from '../config';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useHeaderHeight} from '@react-navigation/elements';
import {AuthContext} from '../context/AuthContext';
import ProductCard from '../components/ProductCard';

export default function Store({navigation}: any) {
  const [store, setStore] = useState<any>();
  const headerHeight = useHeaderHeight();
  const [products, setProducts] = useState<Array<any>>();
  const [productsError, setProductsError] = useState(false);

  const authContext = useContext(AuthContext);

  useEffect(() => {
    getStore();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getProducts() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        //@ts-ignore
        `${Settings.apiUrl}/products/store/${authContext?.store?._id}`,
        requestConfig,
      );

      const result = await response.json();

      if (result.data.length !== 0) {
        setProducts(result.data);
      }
    } catch (error) {
      console.log(error);
      setProductsError(true);
    }
  }

  async function getStore() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        //@ts-ignore
        `${Settings.apiUrl}/stores/owner/${authContext.localUser._id}`,
        requestConfig,
      );

      const result = await response.json();

      setStore(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      {store ? (
        <View>
          <Image
            source={{
              uri: `${Settings.apiUrlStoreImages}/${store.picture}`,
            }}
            resizeMode="cover"
            style={styles.storeImage}
          />
          <View style={styles.storeOverview}>
            <Text style={styles.storeName}>{store.name}</Text>
            <Text style={styles.storeDescription}>{store.description}</Text>
            <View style={[styles.textIcon, {marginTop: 10}]}>
              <IonIcon name="location-outline" size={18} color="#EC407A" />
              <Text style={styles.storeAddress}>{store.address}</Text>
            </View>
          </View>
          <View>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menú</Text>
              <Pressable
                style={styles.addProductButton}
                onPress={() => navigation.push('NewProduct')}>
                <Text style={styles.addProductButtonText}>AGREGAR</Text>
                <IonIcon name="add-outline" size={24} color="#EC407A" />
              </Pressable>
            </View>
            <View>
              {products ? (
                <View>
                  {products.map((product, key) => (
                    <ProductCard product={product} key={key} />
                  ))}
                </View>
              ) : productsError ? (
                <View>
                  <Text>
                    Ocurrio un error al intentar recuperar la Información, por
                    favor intentalo de nuevo.
                  </Text>
                </View>
              ) : (
                <View style={styles.noProducts}>
                  <Image
                    source={require('../resources/images/food.png')}
                    resizeMode="contain"
                    style={styles.noProductImage}
                  />
                  <Text style={styles.noProductText}>
                    Aún no tienes productos para vender
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View
          style={[
            styles.newStoreLayout,
            {height: Dimensions.get('window').height - headerHeight},
          ]}>
          <Text style={styles.newStoreText}>
            Al parecer, aún no tienes una tienda en {Settings.appName}. Puedes
            crear una Gratis!
          </Text>
          <Image
            source={require('../resources/images/store.png')}
            resizeMode="contain"
            style={styles.newStoreImage}
          />
          <Pressable
            style={({pressed}) => {
              if (pressed) {
                return [styles.newStoreButton, styles.newStoreButtonPressed];
              }
              return styles.newStoreButton;
            }}
            onPress={() => navigation.push('NewStore')}>
            <Text style={styles.newStoreButtonText}>Crear Mi Tienda</Text>
            <EntypoIcon name="shop" size={24} color="#E91E63" />
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  storeImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 0.6,
  },
  newStoreLayout: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  newStoreImage: {
    width: Dimensions.get('window').width * 0.8,
  },
  newStoreText: {
    fontFamily: 'Inter-SemiBold',
    textAlign: 'center',
    fontSize: 16,
    marginHorizontal: 60,
  },
  newStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 50,
    padding: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#E91E63',
  },
  newStoreButtonPressed: {
    backgroundColor: '#F8BBD0',
  },
  newStoreButtonText: {
    fontFamily: 'Inter-Medium',
    marginRight: 10,
    color: '#E91E63',
  },
  storeOverview: {
    padding: 20,
    backgroundColor: 'white',
  },
  storeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#000',
  },
  storeDescription: {
    fontFamily: 'Inter-Medium',
  },
  storeAddress: {
    fontFamily: 'Inter-Medium',
    color: '#EC407A',
  },
  textIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: 'white',
    marginTop: 10,
  },
  addProductButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addProductButtonText: {
    marginRight: 5,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#EC407A',
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  noProducts: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductImage: {
    width: Dimensions.get('window').width * 0.6,
  },
  noProductText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#EC407A',
  },
});
