import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Button from '../components/Button';
import ImagePicker from '../components/ImagePicker';
import TextInput from '../components/TextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Settings from '../config';
import {AuthContext} from '../context/AuthContext';

export default function NewProduct({navigation}: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0.0);
  const [image, setImage] = useState('');

  const authContext = useContext(AuthContext);

  function onChangePrice(_price: string) {
    //replace comma
    const fprice = _price.replace(',', '.');
    //@ts-ignore
    setPrice(fprice);
  }

  function validateForm() {
    if (name === '' || description === '' || price === 0.0 || image === '') {
      return false;
    }
    return true;
  }

  async function onCreateProduct() {
    try {
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      //@ts-ignore
      formData.append('owner', `${authContext.store._id}`);
      formData.append('product_image', {
        uri: image,
        name: 'storeimage.jpg',
        type: 'image/jpg',
      });

      const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      };

      const response = await fetch(
        `${Settings.apiUrl}/products`,
        requestConfig,
      );
      const result = await response.json();

      console.log(result);

      if (result.status === 'success') {
        navigation.replace('Store');
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ScrollView>
      <View style={styles.headerImage}>
        <Image
          source={require('../resources/images/food.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.header}>
        <Text style={styles.headerCaption}>
          Asegurate de llenar correctamente la información de tu nuevo producto
          🍕🍔🍟
        </Text>
      </View>
      <View style={styles.form}>
        <TextInput
          label="Nombre"
          placeholder="Hamburguesa, Pizza, Sushi..."
          caption="Un nombre corto para tu producto"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          label="Descripción"
          placeholder="Hamburguesa de carne acompañada de..."
          caption="Una descripción detallada de tu producto"
          value={description}
          onChangeText={setDescription}
        />
        <TextInput
          label="Precio"
          placeholder="1.35"
          keyboardType="decimal-pad"
          caption="El precio de tu producto, asegúrate de incluir todos las tarifas extras"
          value={price.toString()}
          onChangeText={onChangePrice}
        />
        <ImagePicker
          label="Imagen"
          caption="Una imagen que muestre tu producto"
          image={image}
          setImage={setImage}
        />
        <Button
          label="Confirmar"
          icon={<Icon name="chevron-forward-outline" color="white" size={24} />}
          onPress={() => onCreateProduct()}
          disabled={!validateForm()}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.4,
  },
  headerImage: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
  },
  headerCaption: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  form: {
    marginVertical: 10,
    backgroundColor: 'white',
    padding: 20,
  },
});
