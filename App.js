
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
  MainScreen:{
    screen : MainScreen,
    navigationOptions: () => ({
      title: `Road Buddy`,
    }),
  },
  ReportScreen:{
    screen: ReportScreen,
    navigationOptions: () => ({
      title: `Report`,
    }),
  },
  NotificationScreen:{
    screen: NotificationScreen,
    navigationOptions: () => ({
      title: `Notification`,
    }),
  },
  CallInfoScreen:{
    screen: CallInfoScreen,
    navigationOptions: () => ({
      title: `Call Info`,
    }),
  }
})

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 30,
    backgroundColor: '#ffffff',
  },
});
