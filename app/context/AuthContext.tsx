import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import * as Settings from '../config';
import {User} from '@react-native-google-signin/google-signin';
import {order, user as userI} from '../interfaces';

export const AuthContext = React.createContext({
  isSigned: false,
  user: null,
  isReady: false,
  store: null,
  orders: null,
  localUser: null,
  setIsSignedContext: (_val: boolean) => {},
  setStore: (_val: any) => {},
  setOrders: (_val: Array<order>) => {},
});

export function AuthContextProvider(props: any) {
  const [isSigned, setIsSigned] = useState(false);
  const [user, setUser] = useState<User['user']>();
  const [isReady, setIsReady] = useState(false);
  const [store, setStore] = useState<any>();
  const [orders, setOrders] = useState<Array<order>>([]);
  const [localUser, setLocalUser] = useState<userI>();

  function onAuthStateChanged(_user: any) {
    setUser(_user);
    //setIsSigned(_user ? true : false);
    setIsReady(true);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  });

  useEffect(() => {
    if (user) {
      signIn();
    } else {
      setIsSigned(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  async function signIn() {
    try {
      const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //@ts-ignore
          fuid: user?.uid,
        }),
      };

      const response = await fetch(
        `${Settings.apiUrl}/auth/signin`,
        requestConfig,
      );

      const result = await response.json();

      console.log(result);

      if (result.status === 'error') {
        //signup
        signUp();
        return;
      }

      setLocalUser(result.data);
      setIsSigned(true);
    } catch (error) {
      console.log(error);
    }
  }

  async function signUp() {
    try {
      const requestConfig: RequestInit = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          //@ts-ignore
          fuid: user.uid,
          //@ts-ignore
          name: user.displayName,
          email: user?.email,
        }),
      };

      const response = await fetch(
        `${Settings.apiUrl}/auth/signup`,
        requestConfig,
      );

      const result = await response.json();

      setLocalUser(result.data);

      setIsSigned(true);
    } catch (error) {
      console.log(error);
    }
  }

  if (!isReady) {
    //todo loading
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        isSigned,
        //@ts-ignore
        user,
        isReady,
        store,
        //@ts-ignore
        orders,
        //@ts-ignore
        localUser,
        setIsSignedContext: setIsSigned,
        setStore: setStore,
        setOrders: setOrders,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
}
