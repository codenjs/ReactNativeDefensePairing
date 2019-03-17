/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Animated, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {RectButton} from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class DepthChartListItem extends Component {
  constructor(props) {
    super(props);
    this._animationValue = new Animated.Value(1);
  }

  renderLeftActions = () => {
    return (
      <RectButton style={styles.deleteButton} onPress={this._onDeletePress}>
        <View style={styles.actionIconWrapper}>
          <Icon name='delete-forever' style={styles.actionIcon} />
        </View>
      </RectButton>
    );
  };

  _onDeletePress = () => {
    Animated.timing(this._animationValue, {
      toValue: 0,
      duration: 300,
    }).start(() => {
      this.props.onDelete(this.props.index);
    });
  };

  render() {
    return (
      <Animated.View style={this._animationStyles()}>
        <Swipeable
          overshootLeft={false}
          renderLeftActions={this.renderLeftActions}>
          <RectButton style={styles.swipeableButton}>
            {this.props.children}
          </RectButton>
        </Swipeable>
      </Animated.View>
    );
  }

  _animationStyles() {
    return [
      {
        opacity: this._animationValue
      },
      {
        backgroundColor: this._animationValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['rgba(0, 0, 0, 1)', 'rgba(0, 0, 0, 0)']
        })
      },
    ];
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

DepthChartListItem.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number,
  onDelete: PropTypes.func
};
