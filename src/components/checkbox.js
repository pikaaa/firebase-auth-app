import React, { PureComponent } from 'react';
import { View, Text, TouchableWithoutFeedback, Image, StyleSheet, Dimensions, Alert } from 'react-native';
import { CheckedIcon, UncheckedIcon } from '../assets/';

type CheckboxProps = {
  checked?: boolean,
  checkBoxStyle?: Object | Array<Object>,
  value: any,
  onChange: Function,
};

type CheckboxStates = {
  checked?: boolean,
};

class CheckBox extends PureComponent < CheckboxProps, CheckboxStates > {
  state: CheckboxStates;
  props: CheckboxProps;

  static defaultProps = {
    checked: false,
    checkBoxStyle: {},
    uncheckedBoxStyle: {},
  };

  constructor( props: CheckboxProps ) {
    super( props );
    console.log('rendering Checkbox');

    this.state = {
      checked: this.props.checked,
    };

    this.toggle = this.toggle.bind( this );
  }

  componentWillReceiveProps( nextProps: Object ) {
    if ( nextProps.checked !== this.props.checked ) {
      this.setState( { checked: nextProps.checked } );
    }
  }

  /**
   * Toggle between checked and unchecked, whenever the checkbox container is clicked
   */
  toggle: Function;
  toggle() {
    const { onChange, value } = this.props;

    onChange( value, !this.state.checked );
    this.setState( { checked: !this.state.checked } );
  }

  /**
   * Based on the state, render checked/unchecked checkbox
   * @return { React Element } Component checked/unchecked checkbox
   */
  renderCheckbox() {
    const { checked } = this.state;

    return (
      <View style={ [ styles.checkBox, this.props.checkBoxStyle ] }>
        {
          checked ?
            <Image style={{width: 20, height:20}} source={ CheckedIcon } /> :
            <Image style={{width: 20, height:20}} source={ UncheckedIcon } />
        }
      </View>
    );
  }

  renderCheckboxBeforeText() {
    return (
      <View style={ styles.containerStyle }>
        { this.renderCheckbox() }

        <TouchableWithoutFeedback onPress={this.renderAlert}>
          <Text
          numberOfLines={2}
          style={ styles.label }
          >
          {'I hereby agree to the Terms & Conditions.'}
          </Text>
        </TouchableWithoutFeedback>
      </View>
    );
  }

  renderAlert() {
    Alert.alert(
      'Terms & Conditions',
      "Avegen Health™ is provided by Avegen Health (\“AVGN\”) and references to “we\”, \“us\” or \“our\” are to AVGN.\
      1. The Agreement between us\
      1.1 Your use of the Sign-Up website (the \“Site\”) and the Sign-Up data processing services (together, the \“Services\”) are subject to you accepting the following Terms and Conditions of Use and Privacy Policy (together, the \“Terms of Use\”).\
      1.2 Your acceptance of the Terms of Use shall be indicated by you clicking on the \“Accept\” box at the bottom of this document and your continued use of the Services. If you do not accept all the Terms of Use, you must click the \“Decline\” box at the bottom of this document and you must not continue to register to use the Services.\
      1.3 Any error or omission of any information that we publish about the Services shall be subject to correction, provided that the correction does not materially affect the Services.",
      { cancelable: false }
    )
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={ this.toggle }>
        {
            this.renderCheckboxBeforeText()
        }
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderColor: '#0078ff',
  },
  containerStyle: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  label: {
    width: Dimensions.get( 'window' ).width - 55,
    height: 20,
    marginTop:2,
    color: '#0078ff',
    marginLeft: 10,
  }
});

export default CheckBox;
