/**
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, Alert, Button, FlatList, StyleSheet, Text, TextInput, View} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import DepthChart from './DepthChart.js';
import DataStore from 'react-native-simple-store';
const DataStoreKey = 'depthChartArray';

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);

    this.state = {
      depthChartData: DepthChart.GetEmptyObject(),
      addPlayerName: ''
    }
  }

  componentDidMount() {
    DataStore.get(DataStoreKey)
    .then((data) => {
      var depthChartData = DepthChart.GeneratePairingsFromPlayerArray(data);
      this.setState({
        depthChartData: depthChartData
      });
      SplashScreen.hide();
    });
  }

  render() {
    return (
      <View style={styles.depthChartComponentMainContainer}>
        <View style={styles.depthChartColumnContainer}>
          <View style={styles.depthChartColumn}>
            <Text style={styles.depthChartTitleText}>{this._appendCounter('Depth Chart', this.state.depthChartData.Players)}</Text>
            <FlatList style={styles.depthChartList}
              data={this.state.depthChartData.Players}
              renderItem={({item}) => <Text style={styles.depthChartListItem}>{item.name}</Text>}
              keyExtractor={(item, index) => item.name}
              ListEmptyComponent={<Text style={styles.depthChartListItemEmpty}>Enter players below</Text>}
              />
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
            <View style={styles.depthChartAddButtonWrapper}>
                <Button
                  onPress={this._onDepthChartAddButtonPress.bind(this)}
                  title='Add'
                  color='blue'
                  />
              </View>
          </View>
          <View style={styles.depthChartColumn}>
            <Text style={styles.depthChartTitleText}>{this._appendCounter('All Pairings', this.state.depthChartData.Pairings)}</Text>
            <FlatList style={styles.depthChartList}
              data={this.state.depthChartData.Pairings}
              renderItem={({item}) => <Text style={styles.depthChartListItemCompressed}>{item.name}</Text>}
              keyExtractor={(item, index) => item.name}
              ListEmptyComponent={<Text style={styles.depthChartListItemEmpty}>Enter at least 2 players</Text>}
              />
          </View>
        </View>
        <View style={styles.depthChartFooter}>
          <View style={styles.depthChartClearAllButtonWrapper}>
            <Button
              onPress={this._onDepthChartClearAllButtonPress.bind(this)}
              title='Clear All'
              color='red'
              />
          </View>
        </View>
      </View>
    );
  }

  _appendCounter(name, items) {
    if (items.length == 0)
      return name;
    else
      return name + ' (' + items.length + ')';
  }

  _onDepthChartAddButtonPress() {
    var dcResponse = DepthChart.Add(this.state.depthChartData.Players, this.state.addPlayerName);

    if (dcResponse.Error) {
      if (dcResponse.ErrorMessage) {
        Alert.alert(dcResponse.ErrorMessage);
      }
      return;
    }

    DataStore.save(DataStoreKey, dcResponse.UpdatedDepthChartData.Players);
    this._depthChartAddTextbox.setNativeProps({text: ''});
    this.setState({
      depthChartData: dcResponse.UpdatedDepthChartData,
      addPlayerName: ''
    });
  }

  _onDepthChartClearAllButtonPress() {
    Alert.alert(
      'Confirm',
      'Are you sure you want to Clear All?',
      [
        { text: 'Cancel' },
        { text: 'OK', onPress: () => this._onDepthChartClearAllButtonConfirm()}
      ]
    );
  }

  _onDepthChartClearAllButtonConfirm() {
    DataStore.delete(DataStoreKey);
    this.setState({
      depthChartData: DepthChart.GetEmptyObject()
    });
  }
}

const styles = StyleSheet.create({
  depthChartComponentMainContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  depthChartColumnContainer : {
    flex: 9,
    flexDirection: 'row',
  },
  depthChartColumn : {
    width: '50%',
    padding: 20,
  },
  depthChartTitleText: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 10,
  },
  depthChartList: {
    borderWidth: 1,
    borderColor: 'black',
    paddingBottom: 3,
    paddingLeft: 3,
    paddingRight: 3,
  },
  depthChartListItem: {
    fontSize: 24,
    borderWidth: 1,
    borderColor: 'darkgray',
    marginTop: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  depthChartListItemCompressed: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'darkgray',
    marginTop: 3,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 20,
    paddingRight: 20,
  },
  depthChartListItemEmpty: {
    fontSize: 24,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: 'darkgray',
    marginTop: 3,
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 3,
    paddingRight: 3,
  },
  depthChartFooter: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  depthChartAddTextboxWrapper: {
    marginTop: 20,
  },
  depthChartAddTextbox: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
  depthChartAddButtonWrapper: {
    marginTop: 20,
    marginBottom: 20,
  },
  depthChartClearAllButtonWrapper: {
    margin: 20,
  }
});
