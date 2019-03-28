import React, { Component } from 'react';
import { View, Text ,StyleSheet,TouchableHighlight } from 'react-native';
import {Content} from 'native-base';
import firebase from 'firebase';
import DrawerButton from './DrawerButton' 

export default class SamplingSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const mail =  firebase.auth().currentUser.email
    return (
      <Content style={{backgroundColor:'#ffffff'}}>
        <DrawerButton label="All Report " specific={false}/>
        <DrawerButton label="Your Report " specific={true}/>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
    
})