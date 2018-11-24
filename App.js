
import React, { Component } from 'react';
import { StyleSheet, AppRegistry ,Text,Button } from 'react-native';
import { StackNavigator } from 'react-navigation';

import MainScreen from 'src/Screen/MainScreen'
import ReportScreen from 'src/Screen/ReportScreen'
import NotificationScreen from 'src/Screen/NotificationScreen'
import CallInfoScreen from 'src/Screen/CallInfoScreen'
import LoadingScreen from 'src/Screen/LoadingScreen'
import LoginScreen from 'src/Screen/LoginScreen'
import SignUpScreen from 'src/Screen/SignUpScreen'

export default class App extends Component {

  
  
  initializeFirebase() {
  
    const firebase = require("firebase");
    const config = {
      apiKey: "AIzaSyAQqXC7P_OwwkkSfJscHLUIfro84Ipc0SI",
      authDomain: "test-2e10e.firebaseapp.com",
      databaseURL: "https://test-2e10e.firebaseio.com",
      projectId: "test-2e10e",
      storageBucket: "test-2e10e.appspot.com",
      messagingSenderId: "872972741228"
    };
   
    if (!firebase.apps.length) { 
             firebase.initializeApp(config); 
        } 
           
      

  }
  componentDidMount() {
    this.initializeFirebase();
  }
  render() {
    return (
      <AppNavigator/>
    );
  }
}

const AppNavigator = StackNavigator({
  //LoadingScreen:{
    //screen : LoadingScreen,
  //},
  LoginScreen:{
    screen : LoginScreen,
    navigationOptions: {
      header: null
    }
  },
  SignUpScreen:{
    screen : SignUpScreen,
  },
  MainScreen:{
    screen : MainScreen,
    navigationOptions: () => ({
      title: `Road Buddy`,
      header: null
    }),
  },
  ReportScreen:{
    screen: ReportScreen,
    navigationOptions: () => ({
      title: `Report`,
      headerStyle: {
        backgroundColor: 'rgb(32, 53, 70)',
       
      },
      headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
          
    }),
   
    
  },
  NotificationScreen:{
    screen: NotificationScreen,
    navigationOptions: () => ({
      title: `Notification`,
      headerStyle: {
        backgroundColor: 'rgb(32, 53, 70)',
       
      },
      headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
    }),
  },
  CallInfoScreen:{
    screen: CallInfoScreen,
    navigationOptions: () => ({
      title: `Call Info`,
      headerStyle: {
        backgroundColor: 'rgb(32, 53, 70)',
       
      },
      headerTitleStyle: { color: 'white' },
        headerTintColor: 'white',
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

AppRegistry.registerComponent('RoadBuddy', () => AppNavigator);