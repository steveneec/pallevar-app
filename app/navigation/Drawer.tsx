import React, {useContext, useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IonIcon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';

import Home from '../screens/Home';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {AuthContext} from '../context/AuthContext';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  const options: Array<option> = [
    {
      title: 'Categorías',
      route: 'Categories',
      icon: <EntypoIcon name="list" size={24} />,
    },
    {
      title: 'Mi Tienda',
      route: 'Store',
      icon: <EntypoIcon name="shop" size={24} />,
    },
    {
      title: 'Mis Pedidos',
      route: 'Orders',
      icon: <MaterialIcon name="shopping" size={24} />,
    },
    {
      title: 'Notificaciones',
      route: 'Notifications',
      icon: <IonIcon name="notifications" size={24} />,
    },
    {
      title: 'Ajustes',
      route: 'Settings',
      icon: <IonIcon name="settings-sharp" size={24} />,
    },
  ];

  return (
    <Drawer.Navigator
      drawerContent={({navigation}: any) => (
        <MenuDrawer options={options} navigation={navigation} />
      )}>
      <Drawer.Screen name="home-sc" component={Home} />
    </Drawer.Navigator>
  );
}

function MenuDrawer(props: menuDrawer) {
  const authContext = useContext(AuthContext);

  return (
    <View>
      <View style={menuDrawerStyle.header}>
        <Image
          source={{
            uri: `${
              //@ts-ignore
              authContext.user.photoURL
            }`,
          }}
          resizeMode="cover"
          style={menuDrawerStyle.avatar}
        />
        <Text style={menuDrawerStyle.name}>
          Hola,
          {
            //@ts-ignore
            authContext.user.displayName
          }
        </Text>
      </View>
      {props.options.map((option, key) => (
        <Pressable
          key={key}
          onPress={() => props.navigation.push(option.route)}
          style={menuDrawerStyle.option}>
          {option.icon}
          <Text style={menuDrawerStyle.optionText}>{option.title}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const menuDrawerStyle = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    alignItems: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 96,
    height: 96,
  },
  name: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  option: {
    padding: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 20,
  },
});

interface option {
  title: String;
  route: String;
  icon: React.ReactNode;
}

interface menuDrawer {
  options: Array<option>;
  navigation: any;
}
