import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

type Props = {
  title: string,
  placeHolder: string,
  onChangeText: Function,
  secureTextEntry: boolean,
};

export default class InputField extends Component<Props> {

  render(){
    const { title, placeHolder, onChangeText, secureTextEntry} = this.props;
    return(
      <View style={styles.inputRow}>
        <Text style={styles.inputLabels}>{title}</Text>
        <TextInput
        placeholder={placeHolder}
        onChangeText={ text => {onChangeText(title, text)}}
        autoCorrect={false}
        secureTextEntry={secureTextEntry}
        style={styles.textInputs}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputRow:{
    margin: 12,
    flexDirection: 'row',
  },
  inputLabels:{
    flex: 1,
    fontSize: 16,
  },
  textInputs:{
    fontSize: 16,
    flex: 2,
  },
});
