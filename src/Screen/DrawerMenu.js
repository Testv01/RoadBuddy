import React, { Component } from 'react';
import { View, Text ,StyleSheet } from 'react-native';
import {Content} from 'native-base';

export default class SamplingSlide extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Content style={{backgroundColor:'#ffffff'}}>
        <Text style={{justifyContent:'center'}}> Hello! Mor </Text>
      </Content>
    );
  }
}
const styles = StyleSheet.create({
    
})