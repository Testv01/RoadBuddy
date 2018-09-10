
import React, { Component } from 'react';
import { StyleSheet, View,Text,Button } from 'react-native';
import CircleButton from 'react-native-circle-button';

import UsersMap from 'src/Component/UsersMap';

export default class MainScreen extends Component {
  state ={
    userLocation:null,
    usersPlaces:[],
    topicText:""
  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta: 0.0010,
          longitudeDelta: 0.0010,
        }
      });
      
    }, err => console.log(err));

  }

  componentWillMount(){
    this.getUserPlacesHandler;
  }

  
  getUserPlacesHandler=()=>{
    fetch('https://test-2e10e.firebaseio.com/places.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray=[];
        for(const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key,
            topic: parsedRes[key].topic
          });
        }
        this.setState({
          usersPlaces: placesArray
        });
      })
  };

  render() {
    return (
     <View style={styles.container}>
      
        <UsersMap 
                userLocation={this.state.userLocation} 
                usersPlaces={this.state.usersPlaces} 
        />
        <View style={styles.button}>
          <Button 
            title="Get Places" 
            color='red' 
            onPress={this.getUserPlacesHandler} 
          />
        </View> 
{/* 
        <View style={styles.button}>
          <Button 
            onPress={()=> this.props.navigation.navigate('ReportScreen')} 
            title="Report" 
          />
        </View> 
        <View style={styles.button}>
          <Button 
            onPress={()=> this.props.navigation.navigate('NotificationScreen')} 
            title="Notification" 
          />
        </View> 
        
        <View style={styles.button}>
          <Button 
            onPress={()=> this.props.navigation.navigate('CallInfoScreen')} 
            title="Call Info" 
          />
        </View> 
*/} 
        <View style={{ flex: 1 }}>
                <CircleButton 
                  size={45} 
                  onPressButtonTop={()=> this.props.navigation.navigate('ReportScreen')}
                  onPressButtonLeft={()=> this.props.navigation.navigate('NotificationScreen')}
                  onPressButtonRight={()=> this.props.navigation.navigate('CallInfoScreen')}
                />
        </View>

      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute', 
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor: '#ffe79b',
  },
  button:{
    marginTop:10,
  }
});
