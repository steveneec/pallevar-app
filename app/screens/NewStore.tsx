import React, {useContext, useEffect, useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import MapView from 'react-native-maps';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from '../components/Button';
import ImagePicker from '../components/ImagePicker';
import TextInput from '../components/TextInput';
import * as Settings from '../config';
import {AuthContext} from '../context/AuthContext';

export default function NewStore({navigation}: any) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState<string>();
  const [categories, setCategories] = useState<Array<any>>([]);
  const [value, setValue] = useState([]);
  const [open, setOpen] = useState(false);
  const [storeLocation, setStoreLocation] = useState('');
  const initialRegion = {
    latitude: -0.1997659951010272,
    latitudeDelta: 0.01340392277443897,
    longitude: -78.50570624694228,
    longitudeDelta: 0.020519904792294597,
  };

  const authContext = useContext(AuthContext);

  useEffect(() => {
    getCategories();
  }, []);

  //onRegionChange
  function onRegionChange(region: any) {
    setStoreLocation(region);
  }

  async function getCategories() {
    try {
      const requestConfig: RequestInit = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const _categories = await fetch(
        `${Settings.apiUrl}/store-categories`,
        requestConfig,
      );

      const datCategories = await _categories.json();

      const _dcat: Array<any> = [];

      datCategories.data.map((category: any) => {
        _dcat.push({label: category.name, value: category._id});
      });

      //@ts-ignore
      setCategories(_dcat);
    } catch (error) {
      console.log(error);
    }
  }

  async function onCreateStore() {
    try {
      const formData = new FormData();

      console.log(authContext.localUser);

      formData.append('name', name);
      formData.append('description', description);
      formData.append('category', value);
      //@ts-ignore
      formData.append('owner', `${authContext.localUser._id}`);
      formData.append('location', JSON.stringify(storeLocation));
      formData.append('address', address);
      formData.append('store_image', {
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

      const response = await fetch(`${Settings.apiUrl}/stores`, requestConfig);
      const result = await response.json();

      if (result.status === 'success') {
        authContext.setStore(result.data);
        navigation.replace('Store');
      } else {
        console.log(result.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  //validate
  function validateForm() {
    if (
      name === '' ||
      description === '' ||
      address === '' ||
      image === null ||
      image === undefined ||
      value.length === 0
    ) {
      return false;
    }
    return true;
  }

  return (
    <ScrollView scrollEnabled={!open}>
      <View style={styles.layout}>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Mi tienda"
          label="Nombre"
          caption="Nombre para tu tienda"
        />
        <TextInput
          value={description}
          onChangeText={setDescription}
          placeholder="Comida rápida"
          label="Descripción"
          caption="Una descripción corta para tu tienda"
        />
        {categories && (
          <View style={styles.categoriesContainer}>
            <Text style={styles.label}>Categoría para tu tienda</Text>
            <DropDownPicker
              open={open}
              setOpen={setOpen}
              multiple
              min={1}
              items={categories}
              value={value}
              setValue={setValue}
              translation={{
                PLACEHOLDER: 'Selecciona una o más categorías',
                SELECTED_ITEMS_COUNT_TEXT:
                  'Se ha seleccionado {count} categorías',
              }}
              language="ES"
            />
          </View>
        )}
        <TextInput
          value={address}
          onChangeText={setAddress}
          placeholder="Av. Amazonas"
          label="Dirección"
          caption="Dirección física de tu tienda"
        />
        <View style={styles.categoriesContainer}>
          <Text style={styles.label}>Elige la ubicación en el mapa</Text>
          <View>
            <Image
              source={require('../resources/images/pin.png')}
              style={styles.pin}
              resizeMode="contain"
            />
            <MapView
              style={styles.map}
              onRegionChangeComplete={region => onRegionChange(region)}
              initialRegion={initialRegion}
            />
          </View>
        </View>
        <ImagePicker
          image={image}
          setImage={setImage}
          label="Imagen"
          caption="Logo, banner para identificar tu tienda"
        />
        <Button
          label="Crear Mi Tienda"
          onPress={() => onCreateStore()}
          disabled={!validateForm()}
          icon={<Icon name="chevron-forward-outline" color="white" size={24} />}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {padding: 20},
  categoriesContainer: {
    marginVertical: 10,
  },
  label: {
    marginBottom: 5,
    fontFamily: 'Inter-SemiBold',
  },
  map: {
    width: '100%',
    height: Dimensions.get('window').width * 0.6,
  },
  pin: {
    position: 'absolute',
    alignSelf: 'center',
    width: 32,
    height: 32,
    zIndex: 2,
    top: (Dimensions.get('window').width * 0.6) / 2 - 32,
  },
});
