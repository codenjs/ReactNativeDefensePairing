/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Alert, Button, FlatList, KeyboardAvoidingView, StyleSheet, Text, TextInput, View} from 'react-native';
DepthChart = require('./DepthChart.js');

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    const players = [
      {name: 'Claude'},
      {name: 'John'},
      {name: 'Jake'},
      {name: 'Deckard'},
      {name: 'Logan'},
      {name: 'Braedan'}
    ];
    this.state = {
      depthChartArray: players,
      addPlayerName: ''
    }
  }

  render() {
    return (
      <View style={styles.depthChartComponentMainContainer}>
        <Text style={styles.depthChartTitleText}>Depth Chart</Text>
        <View style={styles.depthChartWrapper}>
          <View style={styles.depthChartBody}>
            <FlatList style={styles.depthChartList}
              data={this.state.depthChartArray}
              renderItem={({item}) => <Text style={styles.depthChartItem}>{item.name}</Text>}
              keyExtractor={(item, index) => item.name}
              />
          </View>
          <View style={styles.depthChartFooter}>
            <KeyboardAvoidingView behavior='height'>
              <View style={styles.depthChartAddTextboxWrapper}>
                <TextInput style={styles.depthChartAddTextbox}
                  ref={component => this._depthChartAddTextbox = component}
                  placeholder='Enter Player Name'
                  onChangeText={(data) => this.setState({ addPlayerName: data })}
                  underlineColorAndroid='transparent'
                  autoComplete='off'
                  autoCorrect={false}
                  />
              </View>
            </KeyboardAvoidingView>
            <KeyboardAvoidingView behavior='height'>
              <View style={styles.depthChartAddButtonWrapper}>
                <Button
                  onPress={this._onDepthChartAddButtonPress.bind(this)}
                  title='Add'
                  />
              </View>
            </KeyboardAvoidingView>
          </View>
        </View>
        <Text style={styles.depthChartTitleText}>Every Pair o' D</Text>
        <Text style={styles.depthChartCombinationsEmpty}>None</Text>
        <Button
          onPress={this._onDepthChartClearAllButtonPress.bind(this)}
          title='Clear All'
          color='red'
          />
      </View>
    );
  }

  _onDepthChartAddButtonPress() {
    var dcResponse = DepthChart.Add(this.state.depthChartArray, this.state.addPlayerName);

    if (dcResponse.Error) {
      if (dcResponse.ErrorMessage) {
        Alert.alert(dcResponse.ErrorMessage);
      }
      return;
    }

    this._depthChartAddTextbox.setNativeProps({text: ''});
    this.setState({
      depthChartArray: dcResponse.UpdatedDepthChartArray
    });
  }

  _onDepthChartClearAllButtonPress() {
    this.setState({
      depthChartArray: []
    });
  }
}

const styles = StyleSheet.create({
  depthChartComponentMainContainer: {
    flex: 1,
    flexDirection: 'column', // main axis
    justifyContent: 'flex-start', // main axis
    alignItems: 'center', // cross axis
    margin: 15,
  },
  depthChartTitleText: {
    fontSize: 40,
    textAlign: 'center',
    margin: 10,
  },
  depthChartWrapper: {
    flex: 1,
  },
  depthChartBody: {
    flex: 0.9,
  },
  depthChartList: {
    margin: 20,
    backgroundColor: 'lightgray',
  },
  depthChartItem: {
    fontSize: 25,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'darkgray',
    marginTop: 3,
    padding: 3,
  },
  depthChartFooter: {
    flex: 0.1,
    flexDirection: 'row', // main axis
    marginLeft: 100,
    marginRight: 100,
    backgroundColor: 'lightgray',
  },
  depthChartAddTextboxWrapper: {
    flex: 2,
  },
  depthChartAddButtonWrapper: {
    flex: 1,
  },
  depthChartAddTextbox: {
    fontSize: 25,
    borderWidth: 1,
    borderColor: 'black',
    marginRight: 50,
    padding: 3,
  },
  depthChartCombinationsEmpty: {
    fontSize: 25,
    margin: 20,
  }
});
