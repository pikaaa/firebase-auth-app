import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Avegen from '../assets/avegen_logo.png';
import firebase from 'firebase';

export default class Home extends Component<Props> {
  componentWillMount() {
    // var database = firebase.database();

    let app = firebase.initializeApp({
      apiKey: "AIzaSyB0_1M36UK52LHma_rkKUfhiJoI5WQCvQg",
      authDomain: "registration-9ccd2.firebaseapp.com",
      databaseURL: "https://registration-9ccd2.firebaseio.com",
      projectId: "registration-9ccd2",
      storageBucket: "registration-9ccd2.appspot.com",
      messagingSenderId: "171795507786"
    });

    // export const db = app.database();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={ styles.welcome}> Welcome</Text>
        <Image source={Avegen} />
        <TouchableOpacity onPress={() => this.props.navigation.navigate('RegisterScreen')} style={styles.loginButton}>
            <Text style={ styles.header }>Get Started</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent: 'center',
  },
  welcome:{
    color: '#304159',
    fontSize: 20,
    fontWeight: '500',
  },
  loginButton:{
    width: Dimensions.get( 'window' ).width - 24,
    margin: 12,
    flex: 1,
    padding: 10,
    height: 45,
    backgroundColor: '#43c35e',
    bottom: 12,
    position: 'absolute',
    borderRadius: 4,
  },
  header:{
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
});
