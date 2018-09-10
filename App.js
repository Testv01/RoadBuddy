
import React, { Component } from 'react';
import { StyleSheet, View,Text,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from 'src/Screen/MainScreen'
import ReportScreen from 'src/Screen/ReportScreen'
import NotificationScreen from 'src/Screen/NotificationScreen'
import CallInfoScreen from 'src/Screen/CallInfoScreen'

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator({
  MainScreen:{screen : MainScreen},
  ReportScreen:{screen: ReportScreen},
  NotificationScreen:{screen: NotificationScreen},
  CallInfoScreen:{screen: CallInfoScreen}
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ffffff',
  },
});
