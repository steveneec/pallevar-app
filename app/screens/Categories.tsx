import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {CategoryMini} from '../components/CategoryCard';
import * as Settings from '../config';
import {category as categoryI} from '../interfaces';

export default function Categories({navigation}: any) {
  const [categories, setCategories] = useState<Array<categoryI>>([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(
        `${Settings.apiUrl}/store-categories`,
        requestConfig,
      );

      const result = await response.json();

      console.log(result);

      setCategories(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.layout}>
        {categories.map((category, key) => (
          <CategoryMini category={category} key={key} navigation={navigation} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    flexDirection: 'row',
    padding: 20,
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
