/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class DepthChartListItem extends Component<Props> {
  renderLeftActions = (progress, dragX) => {
    return (
      <RectButton style={styles.deleteButton} onPress={this._onDeletePress}>
        <View style={styles.actionIconWrapper}>
          <Icon name='delete-forever' style={styles.actionIcon} />
        </View>
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
  actionIcon: {
    color: 'white',
    fontSize: hp('3%'),
  },
  actionIconWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButton: {
    width: wp('7%'),
    backgroundColor: 'red',
  },
  swipeableButton: {
    backgroundColor: '#FAFAFA',
  },
});
