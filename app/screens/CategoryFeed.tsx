import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import ProductCard from '../components/ProductCard';
import {StoreHomeCard} from '../components/StoreCard';
import * as Settings from '../config';

export default function CategoryFeed({navigation, route}: any) {
  const [stores, setStores] = useState<Array<any>>([]);
  const [products, setProducts] = useState<Array<any>>([]);

  useEffect(() => {
    getStores();
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getStores() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${Settings.apiUrl}/stores/${route.params.category._id}/1`,
        requestConfig,
      );

      const result = await response.json();

      setStores(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getProducts() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${Settings.apiUrl}/products/category/${route.params.category._id}`,
        requestConfig,
      );

      const result = await response.json();

      setProducts(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.header}>
        <View style={styles.heroShadow} />
        <Image
          source={{
            uri: `${Settings.apiUrlCategoryImages}/${route.params.category.picture}`,
          }}
          style={styles.headerImage}
        />
        <Text style={styles.headerTitle}>{route.params.category.name}</Text>
      </View>
      {stores.length !== 0 ? (
        <View>
          <View>
            <Text style={styles.sectionTitle}>Tiendas</Text>
            <ScrollView
              horizontal
              style={styles.storesContainer}
              showsHorizontalScrollIndicator={false}>
              {stores.map((store, key) => (
                <StoreHomeCard
                  store={store}
                  navigation={navigation}
                  key={key}
                />
              ))}
            </ScrollView>
          </View>
          <View>
            <Text style={styles.sectionTitle}>Platillos de esta categoría</Text>
            {products.map((product, key) => (
              <ProductCard product={product} key={key} />
            ))}
          </View>
        </View>
      ) : (
        <View>
          <Text>Nada para esta categoria</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: Dimensions.get('window').width * 0.4,
    padding: 20,
  },
  headerImage: {
    width: Dimensions.get('window').width * 0.15,
    height: Dimensions.get('window').width * 0.15,
    position: 'absolute',
    right: 20,
    bottom: 20,
  },
  headerTitle: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#fff',
  },
  heroShadow: {
    backgroundColor: '#00000059',
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  storesContainer: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    margin: 20,
    fontSize: 18,
  },
});
