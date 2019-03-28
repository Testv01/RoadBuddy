import React from 'react';
import { View, Text ,StyleSheet,TouchableHighlight } from 'react-native';
import { withNavigation } from 'react-navigation';

class DrawerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const label = this.props.label
    const specific = this.props.specific
    return (
    <TouchableHighlight onPress={()=>this.props.navigation.navigate('NotificationScreen',{specific})}>
    <View style={{padding:10,backgroundColor:'#d3d3d3'}}> 
          <Text style={{fontSize:24}}>
              {label}
          </Text>
    </View>
  </TouchableHighlight>)
  }
}

// withNavigation returns a component that wraps MyBackButton and passes in the
// navigation prop
export default withNavigation(DrawerButton);