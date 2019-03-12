/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';

export default class DepthChartListItem extends Component<Props> {
  renderLeftActions = (progress, dragX) => {
    return (
      <RectButton style={styles.deleteButton} onPress={this._onDeletePress}>
        <Text style={styles.deleteButtonText}>X</Text>
      </RectButton>
    );
  };

  _onDeletePress = () => {
    this.props.onDelete(this.props.index);
  };

  render() {
    return (
      <Swipeable
        overshootLeft={false}
        renderLeftActions={this.renderLeftActions}>
        <RectButton style={styles.swipeableButton}>
          {this.props.children}
        </RectButton>
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
  },
  deleteButtonText: {
    color: 'white',
    padding: 15,
  },
  swipeableButton: {
    backgroundColor: '#FAFAFA',
  },
});
