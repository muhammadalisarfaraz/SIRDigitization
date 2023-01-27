import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SettingsScreen from './SettingsScreen';
import SupportScreen from './SupportScreen';
import ApiScreen from './ApiScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
  <RootStack.Navigator headerMode="false">
    <RootStack.Screen name="SplashScreen" component={SplashScreen} />
    <RootStack.Screen name="SignInScreen" component={SignInScreen} />
    <RootStack.Screen name="SupportScreen" component={SupportScreen} />
  </RootStack.Navigator>
);

export default RootStackScreen;
