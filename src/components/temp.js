import React, {Component} from 'react';
import { View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { CheckedIcon, UncheckedIcon } from '../assets/';

export default class CheckBox extends Component<Props> {
  constructor( props: Props ) {
    super( props );
    this.state={
      checked : false,
    }
  }

  render() {
    return(
      <TouchableWithoutFeedback style={styles.checkbox } onPress={ () => this.setState({ checked: !this.state.checked }) }>
          {
            this.state.checked ?
            <Image source={ CheckedIcon } /> :
            <Image source={ UncheckedIcon } />
          }
        </TouchableWithoutFeedback>
    );
  }
};

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#0078ff',
    backgroundColor: 'black',
  },
});
