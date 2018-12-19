/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import Register from './src/components/register';
import {Home, SignUp} from './src/screens/';
import { createStackNavigator, createAppContainer } from "react-navigation";

const AppNavigator = createStackNavigator({
  HomeScreen: { screen: Home },
  RegisterScreen: { screen: Register },
  SignUpScreen: { screen: SignUp },
});

export default createAppContainer(AppNavigator);
