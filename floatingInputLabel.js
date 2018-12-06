import React from 'react';
import { View, Text, TextInput, StyleSheet, Animated } from 'react-native';

export default class FloatingInputLabel extends React.Component {
  state = {
    isFocused: false,
    hasValue: false,
    borderWidth: new Animated.Value(25),
    labelPos: new Animated.Value(18)
  }

  _setAnimations = (borderWidth, labelPos) => {
    Animated.timing(this.state.borderWidth, {
      toValue: borderWidth,
      duration: 450
    }).start();

    Animated.timing(this.state.labelPos, {
      toValue: labelPos,
      duration: 250
    }).start();
  }

  _onFocus = () => {
    this.setState({isFocused: true});
    this._setAnimations(50, 7);
  }

  _onBlur = (e) => {
    const value = e.nativeEvent.text;
    if(value.trim() === "") {
      this.setState({
        isFocused: false,
        hasValue: false
      });
      this._setAnimations(25, 18);
    } else {
      this.setState({
        isFocused: false,
        hasValue: true
      });
      this._setAnimations(50, 7);
    }
  }

  render() {
    let {containerStyles, labelText, labelStyles, inputValue, inputStyles, changeEvt} = this.props;
    let {borderWidth, labelPos} = this.state;

    // Place the label above the input if is focused or it has a value after editing 
    if(this.state.isFocused === true || this.state.hasValue === true) {
      labelStyles = { ...labelStyles, ...styles.labelFocus};
    }

    return <View style={{...styles.container, ...containerStyles}}>
        <Animated.View style={{...styles.leftBorder, width: borderWidth}} />
        <View>
          <Animated.Text style={{ ...styles.label, ...labelStyles, top: labelPos}}>{labelText}</Animated.Text>
          <TextInput style={{...styles.input, ...inputStyles}} value={inputValue} onChange={changeEvt} onEndEditing={this._onBlur} onFocus={this._onFocus} {...this.props} />
        </View>
        <Animated.View style={{...styles.rightBorder, width: borderWidth}} />
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
    width: 20,
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
    width: 20,
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