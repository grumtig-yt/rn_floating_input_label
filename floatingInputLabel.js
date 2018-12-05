import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default class FloatingInputLabel extends React.Component {
  state = {
    isFocused: false,
    hasValue: false
  }

  _onFocus = () => {
    this.setState({isFocused: true})
  }

  _onBlur = (e) => {
    const value = e.nativeEvent.text;
    if(value.trim() !== "") {
      this.setState({
        isFocused: false,
        hasValue: false
      })
    } else {
      this.setState({
        isFocused: false,
        hasValue: true
      })
    }
  }

  render() {
    let {containerStyles, labelText, labelStyles, inputValue, inputStyles, changeEvt} = this.props;

    if(this.state.isFocused === true || this.state.hasValue === true) {
      labelStyles = { ...labelStyles, ...styles.labelFocus};
    }

    return <View style={styles.container}>
        <View style={styles.leftBorder} />
        <View>
          <Text style={{...styles.label, ...labelStyles}}>{labelText}</Text>
          <TextInput style={{...styles.input, ...inputStyles}} value={inputValue} onChange={changeEvt} onEndEditing={this._onBlur} onFocus={this._onFocus} {...this.props} />
        </View>
        <View style={styles.rightBorder} />
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    position: 'relative',
    borderColor: '#f00',
  },
  leftBorder: {
    width: 25,
    height: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#1d1d1d'
  },
  rightBorder: {
    width: 25,
    height: 50,
    position: 'absolute',
    top: 0,
    right: 0,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderTopWidth: 2,
    borderColor: '#1d1d1d'
  },
  label: {
    fontSize: 14,
    position: 'absolute',
    top: 18,
    left: 20,
    color: '#1d1d1d'
  },
  labelFocus: {
    fontSize: 12,
    top: 7
  },
  input: {
    width: '100%',
    height: 50,
    paddingHorizontal: 20,
    fontSize: 14,
    paddingTop: 14
  }
});