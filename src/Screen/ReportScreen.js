
import React, { Component } from 'react';
import { StyleSheet, View,Text,Button,ScrollView, } from 'react-native';

import UsersMap from 'src/Component/UsersMap';
import Report from 'src/Component/Report';
import ImagePicker from "react-native-image-picker";

export default class ReportScreen extends Component {

  state ={
    userLocation:null,
    usersPlaces:[],
    topicText:"",
    descText:"",
    reportType: "",    
    pickedImage: null,
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
  
  sendReportHandler=()=>{
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation:{
            latitude:position.coords.latitude,
            longitude:position.coords.longitude,
            latitudeDelta: 0.0010,
            longitudeDelta: 0.0010,
          }
        });
        fetch('https://test-2e10e.firebaseio.com/places.json',{
          method: 'POST',
          body: JSON.stringify({
            latitude:position.coords.latitude,
            longitude:position.coords.longitude, 
            topic: this.state.topicText,
            description:this.state.descText,
            image:this.state.pickedImage
          })
        })
        alert("Send Success!");
        this.setTopic("");
        this.props.navigation.navigate('MainScreen') ;
      },
      err => console.log(err)
    );
  };

  setTopic=(text)=>{
    this.setState({topicText:text})
  }
  setDesc=(text)=>{
    this.setState({descText:text})
  }

  setReportType = (reportType) => {
    this.setState({ reportType: reportType })
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

  pickImageHandler = () => {
    ImagePicker.showImagePicker({title: "Pick an Image", maxWidth: 800, maxHeight: 600}, res => {
      if (res.didCancel) {
        console.log("User cancelled!");
      } else if (res.error) {
        console.log("Error", res.error);
      } else {
        this.setState({
          pickedImage: { uri: res.uri }
        });
        
      }
    });
  }
  /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    
    resetHandler = () =>{
      this.setState({
        pickedImage: null
      });
    }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
            
            <Report 
                changeTopic={this.setTopic}                  
                changeDescription={this.setDesc} 
                changeReportType={this.setReportType}
                onSendReport={this.sendReportHandler} 
                pickImagePressed={this.pickImageHandler}
                resetPressed={this.resetHandler}
            />
            <UsersMap 
                userLocation={this.state.userLocation} 
                usersPlaces={this.state.usersPlaces} 
            />
        </View> 
        </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex:1,
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor: '#ffe79b',
    margin:5
  },
});
