import React from 'react';
import {
  View,
  Pressable,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';

GoogleSignin.configure({
  webClientId:
    '923807886041-ehb4edpc8iaeavgan66a03spucbb0rqj.apps.googleusercontent.com',
});

export default function Auth() {
  async function onGoogleButtonPress() {
    try {
      // Get the users ID token
      const googleSignIn = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(
        googleSignIn.idToken,
      );

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  function onSign() {
    onGoogleButtonPress()
      .then(() => console.log('Success'))
      .catch(error => console.log(error));
  }

  return (
    <View style={styles.layout}>
      <View>
        <Text>
          Bienvenido a Pallevar, compra, reserva y recibe tus pedidos de la
          manera más sencilla
        </Text>
        <Image source={require('../resources/images/food1.png')} />
        <Text>
          Inicia sesión en tu cuenta para empezar a usar la aplicación
        </Text>
      </View>
      <Pressable
        style={({pressed}) => {
          if (pressed) {
            return [styles.signButton, styles.signButtonPressed];
          }
          return styles.signButton;
        }}
        onPress={() => onSign()}>
        <Image
          source={require('../resources/images/google-logo.png')}
          resizeMode="contain"
          style={styles.signButtonImage}
        />
        <Text style={styles.signButtonText}>Iniciar Sesión con Google</Text>
      </Pressable>
      <Text style={styles.copy}>
        Desarrollado por Informagios | UCE 2022 - Desarrollo de Sistemas de
        Información
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  signButton: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    elevation: 1,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
  signButtonPressed: {
    backgroundColor: '#F5F5F5',
  },
  signButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
  },
  signButtonImage: {
    width: 32,
    height: 32,
    marginRight: 10,
  },
  layout: {
    padding: 20,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  copy: {
    position: 'absolute',
    bottom: 20,
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    color: '#BDBDBD',
  },
});
