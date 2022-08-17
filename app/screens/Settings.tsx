import React, {useContext} from 'react';
import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {AuthContext} from '../context/AuthContext';
import auth from '@react-native-firebase/auth';

export default function Settings() {
  const authContext = useContext(AuthContext);

  function onExit() {
    auth()
      .signOut()
      .then(() => {
        authContext.setIsSignedContext(false);
      });
  }

  return (
    <ScrollView contentContainerStyle={styles.layout}>
      {authContext.localUser && (
        <View style={styles.sectionCard}>
          <Text style={styles.sectionTitle}>Información de usuario</Text>
          <Text>Nombre</Text>
          <Text>
            {
              //@ts-ignore
              authContext?.localUser.name
            }
          </Text>
          <Text>Correo</Text>
          <Text>
            {
              //@ts-ignore
              authContext?.localUser.email
            }
          </Text>
        </View>
      )}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Cerrar Sesión</Text>
        <Pressable style={styles.exitButton} onPress={() => onExit()}>
          <Text style={styles.exitButtonText}>Cerrar Sesión</Text>
          <IonIcon name="exit-outline" size={24} />
        </Pressable>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Sobre la App</Text>
        <Text style={styles.sectionText}>
          Pallevar es una aplicación para comprar y reservar comida en un gran
          numero de establecimientos asociados. Es tan sencillo como iniciar
          sesión, empezar a comprar y recibir tus pedidos.
        </Text>
        <Text style={styles.sectionText}>
          Pallevar también te permite crear tu tienda online para que puedas
          ofrecer tus productos, ten en cuenta que de momento esta aplicación
          esta enfocada a comercializar alimentos.
        </Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionText}>
          Este proyecto fue desarrollado por Informagios {'('} Grupo 6 {')'}{' '}
          para la materia de Desarrollo de Sistemas de Información.
        </Text>
        <Text style={styles.uce}>Universidad Central del Ecuador</Text>
        <Text style={styles.facu}>
          Facultad de Ingeniería y Ciencias Aplicadas
        </Text>
      </View>
      <Text style={styles.techText}>Tecnologías usadas para el desarrollo</Text>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Backend REST Api</Text>
        <Text style={styles.sectionText}>Node.js v16.14.2</Text>
        <Text style={styles.sectionText}>Typescript v4.7.4</Text>
        <Text style={styles.sectionText}>MongoDB</Text>
        <Text style={styles.sectionText}>Express.js</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Authentication</Text>
        <Text style={styles.sectionText}>Google Firebase Auth</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Frontend Android App</Text>
        <Text style={styles.sectionText}>React 18.0.0</Text>
        <Text style={styles.sectionText}>React Native 0.69.3</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Versionamiento</Text>
        <Text style={styles.sectionText}>Git & GitHub</Text>
      </View>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Hosting</Text>
        <Text style={styles.sectionText}>
          Amazon AWS - LightSail con una instancia Linux - Debian
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  layout: {
    padding: 20,
  },
  sectionCard: {
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    borderRadius: 5,
  },
  sectionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginBottom: 10,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
  },
  uce: {
    fontFamily: 'Inter-SemiBold',
    marginTop: 20,
  },
  facu: {
    fontFamily: 'Inter-SemiBold',
    marginTop: 5,
  },
  techText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginTop: 40,
    marginBottom: 10,
  },
  exitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F06292',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 50,
    alignSelf: 'center',
  },
  exitButtonText: {
    fontFamily: 'Inter-SemiBold',
    marginRight: 5,
    color: '#fff',
  },
});
