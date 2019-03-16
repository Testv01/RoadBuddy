import React, { Component } from 'react';
import { View, Text ,StyleSheet ,Image} from 'react-native';
import {Content} from 'native-base';

export default class NotificationDetailScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item');
    return (
      <View style={{backgroundColor:'#ffffff',flex:1}}>
            <Image style={{width: 150, height: 150,alignSelf:'center',margin:20}}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
            />
            <View style={styles.row}>
                <Text style={styles.detail}>Topic: </Text>
                <Text style={styles.description}>{item.topic}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.detail}>Description: </Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row'
    },
    detail: {
        margin: 5,
        fontSize: 16,
        color: 'blue',
        textAlign: 'left',
    },
    description: {
        margin: 5,
        fontSize: 14
    }
})