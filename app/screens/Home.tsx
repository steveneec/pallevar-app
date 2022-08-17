import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, RefreshControl, StyleSheet} from 'react-native';
import {CategoryText} from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import {StoreHomeCard} from '../components/StoreCard';
import * as Settings from '../config';
import {store as storeI} from '../interfaces';

export default function Home({navigation}: any) {
  const [products, setProducts] = useState<Array<any>>();
  const [categories, setCategories] = useState<Array<any>>();
  const [refreshing, setRefreshing] = useState(false);
  const [stores, setStores] = useState<Array<storeI>>([]);
  //const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    getLastProducts();
    getCategories();
    getStores();
  }, []);

  //getLastProducts
  async function getLastProducts() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let _products = await fetch(`${Settings.apiUrl}/products`, requestConfig);
      _products = await _products.json();
      console.log('>> ', _products);
      //@ts-ignore
      setProducts(_products.data);
    } catch (error) {
      console.log(error);
    }
  }

  //getCategories
  async function getCategories() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      let _categories = await fetch(
        `${Settings.apiUrl}/store-categories`,
        requestConfig,
      );
      _categories = await _categories.json();
      console.log(_categories);
      //@ts-ignore
      setCategories(_categories.data);
    } catch (error) {
      console.log(error);
    }
  }

  //getStores
  async function getStores() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${Settings.apiUrl}/stores/random`,
        requestConfig,
      );

      const result = await response.json();

      setStores(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  function onRefresh() {
    setRefreshing(true);

    getLastProducts()
      .then(() => setRefreshing(false))
      .catch(_error => setRefreshing(false));

    getStores()
      .then(() => setRefreshing(false))
      .catch(_error => setRefreshing(false));
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={() => onRefresh()} />
      }>
      <View>
        <Text style={styles.sectionTitle}>Te podría interesar</Text>
        <View>
          {products?.map((product, key) => (
            <ProductCard product={product} key={key} navigation={navigation} />
          ))}
        </View>
      </View>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Categorías</Text>
          <Text
            style={styles.sectionHeaderViewAll}
            onPress={() => navigation.push('Categories')}>
            Ver todo
          </Text>
        </View>
        <ScrollView
          horizontal
          style={styles.categories}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}>
          {categories?.slice(0, 5)?.map((category, key) => (
            <CategoryText
              category={category}
              key={key}
              navigation={navigation}
              style={styles.category}
            />
          ))}
        </ScrollView>
      </View>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderTitle}>Tiendas</Text>
        </View>
        <View style={styles.storesContainer}>
          {stores.map((store, key) => (
            <StoreHomeCard store={store} navigation={navigation} key={key} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    marginVertical: 10,
    marginHorizontal: 20,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  categories: {
    paddingRight: 50,
  },
  categoriesContent: {
    paddingHorizontal: 20,
  },
  category: {
    marginRight: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  sectionHeaderTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
  },
  sectionHeaderViewAll: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#E91E63',
  },
  storesContainer: {
    paddingHorizontal: 20,
  },
});
