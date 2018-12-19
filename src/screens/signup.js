import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import firebase from 'firebase';
import { InputField, Spinner, CheckBox } from '../components';
import {validateEmail} from '../utils/validations';

type SignUpProps = {};
const deviceHeight: number = Dimensions.get( 'window' ).height;
const deviceWidth: number = Dimensions.get( 'window' ).width;

class SignUp extends Component<SignUpProps> {

  static navigationOptions = {
    title: 'Sign-up',
  };

  constructor( props: SignUpProps ) {
    super( props );
    this.state={
      email: '',
      password: '',
      showEmailError: false,
      error: '',
      loading: false,
      confirmPassword: '',
      isChecked: false,
      userName: '',
    }
    this.onSignupTap = this.onSignupTap.bind(this);
    this.writeUserData = this.writeUserData.bind(this);
    this.renderAlert = this.renderAlert.bind(this);
  }

  onChangeText(title: string, text: string){
    if (title === 'Email'){
      this.setState({email: text, error: '', loading: false, showEmailError: false});
    } else if (title === 'Password'){
      this.setState({password: text, error: '', loading: false, showEmailError: false});
    } else if (title === 'Name'){
      this.setState({userName: text, error: '', loading: false, showEmailError: false});
    } else{
      this.setState({confirmPassword: text, error: '', loading: false, showEmailError: false});
    }
  }

  onCheckboxChange( value: Object, isChecked: boolean ) {
    this.setState({ isChecked });
  }

  writeUserData(email) {
    firebase.database().ref('users/').push({
        email,
        username: this.state.userName
    }).then((data)=>{
        //success callback
        console.log('data ' , data)
    }).catch((error)=>{
        //error callback
        console.log('error ' , error)
    });
  }

  renderAlert() {
    Alert.alert(
      'Wohoo',
      'You have successfully signed up to Avegen Health, hit "OK" to continue',
      [
        {text: 'OK', onPress: () => this.props.navigation.navigate('HomeScreen')},
      ],
      { cancelable: false }
    )
  }

  onSignupTap() {
    console.log(this,'onSignupTap');
    this.setState({error: '', loading: true});

    const { email, password, confirmPassword, isChecked, userName } = this.state;
    if (userName === '') {
      this.setState({ error: 'First name cannot be blank', loading: false});
      return;
    }
    if (password !== confirmPassword){
      this.setState({ error: 'Passwords does not match. Please enter the same password.', loading: false});
      return;
    }
    if (password === ''){
      this.setState({ error: 'Passwords cannot be blank', loading: false});
      return;
    }
    if (!isChecked){
      this.setState({ error: 'Please agree to all the terms and conditions before proceeding.', loading: false});
      return;
    }

    if (!validateEmail( email )){
      this.setState({showEmailError: true, loading: false});
    }else{
      this.setState({showEmailError: false});

      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        this.writeUserData(email);
        this.setState({loading: false});
        this.renderAlert();
      })
      .catch((error) => {
        this.setState({error:error.message, loading: false, debug: ''});
      });
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputs}>
          <InputField
          title='Name'
          placeHolder='XYC'
          secureTextEntry={false}
          onChangeText={this.onChangeText.bind(this)}
          />

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

          <InputField
          title='Confirm Password'
          placeHolder='Re-enter your password'
          secureTextEntry
          onChangeText={this.onChangeText.bind(this)}
          />

          {
            this.state.error ?
            <Text style={styles.error}>{this.state.error}</Text> : null
          }
          <View style={styles.checkboxContainerView}>
            <CheckBox
            onChange={ this.onCheckboxChange.bind(this) }
            containerStyle={ styles.checkboxContainer }
            />
          </View>
        </View>

        {
          !this.state.loading ?
          <TouchableOpacity onPress={this.onSignupTap} style={styles.loginButton}>
              <Text style={ styles.header }>SIGN UP</Text>
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
    backgroundColor: '#F5FCFF',
    flex: 1,
  },
  modalContainer:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 200,
    width: 200,
  },
  inputs:{
    flex:1,
    top: 0.25 * deviceHeight,
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
  },
  checkboxContainerView:{
    margin: 12,
  },
  checkboxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    // borderColor: 'black',
    paddingVertical: 16,
  },
});

export default SignUp;
