import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ImagePicker(props: props) {
  async function launchLibrary() {
    const result = await launchImageLibrary({mediaType: 'photo'});
    if (result.assets) {
      props.setImage(result.assets[0].uri);
    }
  }

  useEffect(() => {
    console.log(props.image);
  }, [props.image]);

  return (
    <View style={styles.layout}>
      {props.label && <Text style={styles.label}>{props.label}</Text>}
      <View style={styles.view}>
        {props.image ? (
          <Image
            source={{uri: props.image}}
            resizeMode="cover"
            style={styles.image}
          />
        ) : (
          <Pressable style={styles.imagePick} onPress={() => launchLibrary()}>
            <Icon name="image" size={48} />
            <Text>Selecciona una imágen</Text>
          </Pressable>
        )}
      </View>
      {props.caption && <Text style={styles.caption}>{props.caption}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  layout: {
    marginVertical: 20,
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    height: Dimensions.get('window').width * 0.5,
    borderRadius: 5,
    borderColor: '#CFD8DC',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  imagePick: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Inter-SemiBold',
  },
  caption: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
  },
});

interface props {
  label?: string;
  caption?: string;
  image: string | undefined;
  setImage: any;
}
