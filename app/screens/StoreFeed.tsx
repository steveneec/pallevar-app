import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Settings from '../config';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {product as productI, store as storeI} from '../interfaces';
import ProductCard from '../components/ProductCard';

export default function StoreFeed({route, navigation}: any) {
  const [products, setProducts] = useState<Array<productI>>();
  const [store, setStore] = useState<storeI>();

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
        `${Settings.apiUrl}/products/store/${route.params.storeid}`,
        requestConfig,
      );

      const result = await response.json();

      console.log(result);

      setProducts(result.data);
    } catch (error) {
      console.log(error);
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
        `${Settings.apiUrl}/stores/id/${route.params.storeid}`,
        requestConfig,
      );

      const result = await response.json();

      setStore(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      {store && (
        <View>
          <View>
            <Image
              source={{
                uri: `${Settings.apiUrlStoreImages}/${store.picture}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
            <View style={styles.overview}>
              <Text style={styles.name}>{store.name}</Text>
              <Text>{store.description}</Text>
              <Text style={styles.address}>
                <IonIcon name="location" /> {store.address}
              </Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Categorías</Text>
            <View style={styles.categoriesContainer}>
              {store.category.map((category: any, key: number) => (
                <Text key={key} style={styles.category}>
                  {category.name}
                </Text>
              ))}
            </View>
          </View>
        </View>
      )}
      <View style={styles.productsContainer}>
        <Text style={styles.menuTitle}>Menú</Text>
        {products?.map((product, key) => (
          <ProductCard product={product} key={key} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').width * 0.4,
  },
  category: {
    fontFamily: 'Inter-SemiBold',
    backgroundColor: '#ECEFF1',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    elevation: 1,
    alignSelf: 'flex-start',
    color: '#000',
  },
  overview: {
    padding: 20,
    backgroundColor: '#fff',
  },
  categoriesContainer: {
    paddingVertical: 20,
  },
  name: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#000',
  },
  address: {
    fontFamily: 'Inter-Regular',
    color: '#E91E63',
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  menuTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginHorizontal: 20,
  },
  productsContainer: {
    marginTop: 10,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
});
