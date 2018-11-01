
import React, { Component } from 'react';
import { StyleSheet, View,Text,Button,ScrollView,CheckBox, } from 'react-native';

import UsersMap from 'src/Component/UsersMap';
import Report from 'src/Component/Report';

import FirebaseInitial from '../Services/FirebaseInitial';

export default class ReportScreen extends Component {

  constructor(props) {
    super(props);
		this.state = {
      userLocation:null,
      usersPlaces:[],
      topicText:"",
      descText:"",
      reportType: "",    
      pickedImage: null,
      pic: null,
      roadProblem: false,
      accident:false,
      buttonColor: 'lightblue',
    }
  }
  
  componentDidMount() {
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
        // fetch('https://test-2e10e.firebaseio.com/places.json',{
        //   method: 'POST',
        //   body: JSON.stringify({
        //     latitude:position.coords.latitude,
        //     longitude:position.coords.longitude, 
        //     topic: this.state.topicText,
        //     description:this.state.descText,
        //     image:this.state.pickedImage,
        //     // date:FirebaseInitial.asd()
        //   })
        // })

        // change the way of using Firebase
        
        FirebaseInitial.insertReport(
          position.coords.latitude,
          position.coords.longitude,
          this.state.topicText,
          this.state.descText,
          this.state.pickedImage,
          this.state.accident,
          this.state.roadProblem
        )
        alert("Send Success!");
        this.props.navigation.goBack() ;                            
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
 checkAcc() {
  this.setState({ 
    accident:!this.state.accident 
  })
}
 checkRP(){
  this.setState({ 
    roadProblem:!this.state.roadProblem 
  })
}
onButtonPress = () => {
  const b1 = this.state.buttonColor;
  if(b1=='lightblue'){
  this.setState({ buttonColor: 'lightgreen' }); 
  }else if(b1=='lightgreen'){    
  this.setState({ buttonColor: 'lightblue' }); 
  }
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

  
  /**
     * The first arg is the options object for customization (it can also be null or omitted for default options),
     * The second arg is the callback which sends object: response (more info below in README)
     */
    
    

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
            
            <Report 
                changeTopic={this.setTopic}                  
                changeDescription={this.setDesc} 
                changeReportType={this.setReportType}
            />
            <Text>Tags</Text>
            
            
            <ScrollView horizontal={true}>
            <Button
                title="TestTestTestTestTest"
                color={this.state.buttonColor}
                onPress={this.onButtonPress}
              />
              <Button
                title="TestTestTestTestTest"
                color={this.state.buttonColor}
                onPress={this.onButtonPress}
              />
              <Button
                title="TestTestTestTestTestTestTest"
                color={this.state.buttonColor}
                onPress={this.onButtonPress}
              />
              <CheckBox value={this.state.accident} onChange={()=> this.checkAcc()}/><Text>Accident</Text>
              <CheckBox value={this.state.roadProblem} onChange={()=> this.checkRP()}/><Text>Road Problem</Text>
            </ScrollView>
                
            <Button title="Send Report" onPress={this.sendReportHandler} />
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
