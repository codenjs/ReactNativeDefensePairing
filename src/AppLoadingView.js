/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class AppLoadingView extends Component<Props> {
  render() {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  loadingText: {
    fontSize: 50,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'darkgray',
    margin: 20,
    padding: 20,
  }
});
