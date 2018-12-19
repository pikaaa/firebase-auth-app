import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  TouchableOpacity,
  Button,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { InputField, Spinner } from './index';
import {validateEmail} from '../utils/validations';

const deviceHeight: number = Dimensions.get( 'window' ).height;
const deviceWidth: number = Dimensions.get( 'window' ).width;

type Props = {};

export default class Register extends Component<Props> {

  static navigationOptions = {
    title: 'Login',
  };

  constructor( props: Props ) {
    super( props );
    this.state={
      email: '',
      password: '',
      showEmailError: false,
      error: '',
      debug: '',
      loading: false,
      userName: '',
    }
    this.onLoginTap = this.onLoginTap.bind(this);
    this.readUserData = this.readUserData.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  onChangeText(title: string, text: string){
    if (title === 'Email'){
      this.setState({email: text, error: '', loading: false, showEmailError: false});
    } else{
      this.setState({password: text, error: '', loading: false, showEmailError: false});
    }
  }

  onLoginTap() {
    const { email, password } = this.state;
    this.setState({error: '', loading: true});

    if (!validateEmail( email )){
      this.setState({showEmailError: true});
    }else{
      this.setState({showEmailError: false});

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((data) => {
        console.log('login successful', this);
        this.setState({debug:'Login successful', loading: false});
        this.readUserData(this.state.email);
      })
      .catch((error) => {
        this.setState({error:error.message, loading: false, debug: ''});

        if ( error.code === 'auth/user-not-found'){
          this.setState({error:'This email is not in our records. Please sign-in.', loading: false, debug: ''});
        }
      });
    }
  }



  readUserData(email) {
    firebase.database().ref('users/').on('value', function (snapshot) {
      Object.values(snapshot.val()).map((user) => {
        console.log('user:'+user+' === email'+email);
        if (user.email === email){
          //renderAlert(user.username);
          Alert.alert(
            'Welcome '+user.username,
            'You have successfully logged in, hit "OK" to continue',
            [
              {text: 'OK'},
            ],
            { cancelable: false }
          )
        } else {
          Alert.alert('Invalid User please check your credentials');
        }
      })
    });
  }
  // renderAlert: Function;
  renderAlert(name) {
    Alert.alert(
      'Welcome '+name,
      'You have successfully logged in, hit "OK" to continue',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen')},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <InputField
          title='Email'
          placeHolder='example@gmail.com'
          secureTextEntry={false}
          onChangeText={this.onChangeText.bind(this)}
          />

          { this.state.showEmailError &&
            <Text style={styles.invalidEmail}>Please enter a valid email</Text>
          }

          <InputField
          title='Password'
          placeHolder='Enter your password'
          secureTextEntry
          onChangeText={this.onChangeText.bind(this)}
          />

          {
            this.state.error ?
            <Text style={styles.error}>{this.state.error}</Text> : null
          }

         <Button
            title='Dont have an account? Sign Up Now!'
            onPress={() => {this.props.navigation.navigate('SignUpScreen')}}
          />
        </View>
        {
          !this.state.loading ?
          <TouchableOpacity onPress={this.onLoginTap} style={styles.loginButton}>
              <Text style={ styles.header }>LOGIN</Text>
          </TouchableOpacity>
          :
          <View style={styles.loginButton}>
            <Spinner size={'small'}/>
          </View>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  inputs:{
    flex:1,
    top: deviceHeight * 0.3,
  },

  loginButton:{
    width: deviceWidth - 24,
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
  invalidEmail:{
    color: 'red',
    fontSize: 12,
    marginHorizontal: 12,
  },
  error:{
    color: 'red',
    fontSize: 16,
    margin: 12,
  }
});
