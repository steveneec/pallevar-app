import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';

import DrawerNavigator from './Drawer';
import Notifications from '../screens/Notifications';
import Store from '../screens/Store';
import NewStore from '../screens/NewStore';
import NewProduct from '../screens/NewProduct';
import Settings from '../screens/Settings';
import Orders from '../screens/Orders';
import Categories from '../screens/Categories';
import Auth from '../screens/Auth';
import CategoryFeed from '../screens/CategoryFeed';
import Product from '../screens/Product';
import StoreFeed from '../screens/StoreFeed';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const authContext = useContext(AuthContext);

  return (
    <>
      {!authContext.isSigned ? (
        <Stack.Navigator>
          <Stack.Screen
            name="Auth"
            component={Auth}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={DrawerNavigator}
            options={{headerShown: false}}
          />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="Store" component={Store} />
          <Stack.Screen name="NewStore" component={NewStore} />
          <Stack.Screen name="NewProduct" component={NewProduct} />
          <Stack.Screen name="Orders" component={Orders} />
          <Stack.Screen name="Categories" component={Categories} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="CategoryStore" component={CategoryFeed} />
          <Stack.Screen name="Product" component={Product} />
          <Stack.Screen name="StoreFeed" component={StoreFeed} />
        </Stack.Navigator>
      )}
    </>
  );
}
