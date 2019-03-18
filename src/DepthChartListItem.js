/**
 * @format
 * @flow
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

  _renderActionButton = (iconName, style, onPress) => {
    return (
      <RectButton style={style} onPress={onPress}>
        <View style={styles.actionIconWrapper}>
          <Icon name={iconName} style={styles.actionIcon} />
        </View>
      </RectButton>
    );
  };

  _renderLeftActions = () => {
    return (
      <View style={styles.actionButtonGroup}>
        {this._renderActionButton('keyboard-arrow-up', styles.moveButton, this._onMoveUpPress)}
        {this._renderActionButton('keyboard-arrow-down', styles.moveButton, this._onMoveDownPress)}
      </View>
    );
  };

  _renderRightActions = () => {
    return this._renderActionButton('delete-forever', styles.deleteButton, this._onDeletePress);
  };

  _onDeletePress = () => {
    Animated.timing(this._animationValue, {
      toValue: 0,
      duration: 300,
    }).start(() => {
      this.props.onDelete(this.props.index);
    });
  };

  _onMoveDownPress = () => {
    this.props.onMoveDown(this.props.index);
  };

  _onMoveUpPress = () => {
    this.props.onMoveUp(this.props.index);
  };

  render() {
    return (
      <Animated.View style={this._animationStyles()}>
        <Swipeable
          overshootLeft={false}
          overshootRight={false}
          renderLeftActions={this._renderLeftActions}
          renderRightActions={this._renderRightActions}
          >
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
  actionButtonGroup: {
    flexDirection: 'row'
  },
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
  moveButton: {
    width: wp('7%'),
    backgroundColor: 'blue',
  },
  swipeableButton: {
    backgroundColor: '#FAFAFA',
  },
});

DepthChartListItem.propTypes = {
  children: PropTypes.any,
  index: PropTypes.number,
  onDelete: PropTypes.func,
  onMoveDown: PropTypes.func,
  onMoveUp: PropTypes.func
};
