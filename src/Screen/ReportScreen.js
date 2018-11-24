
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, CheckBox, TouchableHighlight,TouchableOpacity} from 'react-native';

import UsersMap from 'src/Component/UsersMap';
import Report from 'src/Component/Report';

import FirebaseInitial from '../Services/FirebaseInitial';
import { Icon } from 'native-base';

export default class ReportScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      userLocation: null,
      usersPlaces: [],
      topicText: "",
      descText: "",
      reportType: "",
      pickedImage: null,
      pic: null,
      roadProblem: false,
      accident: false,
      drainSystem: false,
      electricity: false,
      lightSystem: false,
      buttonColor: '',
      buttonColorAcc: null, // เปลี่ยน String เป็น null นะ
      buttonColorRP: null,
      buttonColorDS: null,
      buttonColorEL: null,
      buttonColorLS: null,
      
    }
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        userLocation: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0010,
          longitudeDelta: 0.0010,
        }
      });

    }, err => console.log(err));

  }

  sendReportHandler = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({
          userLocation: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
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
          this.state.roadProblem,
          this.state.drainSystem,
          this.state.electricity,
          this.state.lightSystem
        )
        alert("Send Success!");
        this.props.navigation.goBack();
      },
      err => console.log(err)
    );
  };

  setTopic = (text) => {
    this.setState({ topicText: text })
  }
  setDesc = (text) => {
    this.setState({ descText: text })
  }

  setReportType = (reportType) => {
    this.setState({ reportType: reportType })
  }
  checkAcc = () => {
    this.setState({
      accident: !this.state.accident
    })
  }
  checkRP = () => {
    this.setState({
      roadProblem: !this.state.roadProblem
    })
  }
  checkDS = () => {
    this.setState({
      drainSystem: !this.state.drainSystem
    })
  }
  checkEC = () => {
    this.setState({
      electricity: !this.state.electricity
    })
  }
  checkLS = () => {
    this.setState({
      lightSystem: !this.state.lightSystem
    })
  }
  onAccButtonPress = () => {
    const b1 = this.state.buttonColorAcc;
    if (b1 == null) {
      this.setState({ buttonColorAcc: 'lightgreen' });
      this.checkAcc();
    } else if (b1 == 'lightgreen') {
      this.setState({ buttonColorAcc: null });
      this.checkAcc();
    }
  }
  onRpButtonPress = () => {
    const b1 = this.state.buttonColorRP;
    if (b1 == null) {
      this.setState({ buttonColorRP: 'lightgreen' });
      this.checkRP();
    } else if (b1 == 'lightgreen') {
      this.setState({ buttonColorRP: null });
      this.checkRP();
    }
  }
  onDsButtonPress = () => {
    const b1 = this.state.buttonColorDS;
    if (b1 == null) {
      this.setState({ buttonColorDS: 'lightgreen' });
      this.checkDS();
    } else if (b1 == 'lightgreen') {
      this.setState({ buttonColorDS: null });
      this.checkDS();
    }
  }
  onElButtonPress = () => {
    const b1 = this.state.buttonColorEL;
    if (b1 == null) {
      this.setState({ buttonColorEL: 'lightgreen' });
      this.checkEL();
    } else if (b1 == 'lightgreen') {
      this.setState({ buttonColorEL: null });
      this.checkEL();
    }
  }
  onLsButtonPress = () => {
    const b1 = this.state.buttonColorLS;
    if (b1 == null) {
      this.setState({ buttonColorLS: 'lightgreen' });
      this.checkLS();
    } else if (b1 == 'lightgreen') {
      this.setState({ buttonColorLS: null });
      this.checkLS();
    }
  }
  getUserPlacesHandler = () => {
    fetch('https://test-2e10e.firebaseio.com/report.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray = [];
        for (const key in parsedRes) {
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
          <Text style={{ color: 'white', padding: 5 }}>Tags</Text>

          <View style={styles.thatStyle}>
            <ScrollView horizontal={true} contentContainerStyle={styles.contentContainer}>
              {/* <View style={styles.thatButton}> */}
                {/* <Button
                  title="Accident"
                  color={this.state.buttonColorAcc}
                  onPress={this.onAccButtonPress}
                />

              </View>
              <View style={styles.thatButton}>
                <Button
                  title="Road Problem"
                  color={this.state.buttonColorRP}
                  onPress={this.onRpButtonPress}
                />

              </View>
              <View style={styles.thatButton}>
                <Button
                  title="Drain System"
                  color={this.state.buttonColorDS}
                  onPress={this.onDsButtonPress}
                />

              </View>
              <View style={styles.thatButton}>
                <Button
                  title="Electricity"
                  color={this.state.buttonColorEC}
                  onPress={this.onEcButtonPress}
                />

              </View>
              <View style={styles.thatButton}>
                <Button
                  title="Light System"
                  color={this.state.buttonColorLS}
                  onPress={this.onLsButtonPress}
                /> */}
                <TouchableOpacity onPress={this.onAccButtonPress} style={{backgroundColor:this.state.buttonColorAcc , marginLeft:5, borderRadius:4}}>
                  <Text style={styles.thatButton}>Accident</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onRpButtonPress} style={{backgroundColor:this.state.buttonColorRP ,  marginLeft:5 , borderRadius:4}}>
                  <Text style={styles.thatButton}>Road Problem</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDsButtonPress} style={{backgroundColor:this.state.buttonColorDS , marginLeft:5 ,borderRadius:4}}>
                  <Text style={styles.thatButton}>Drain System</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onElButtonPress} style={{backgroundColor:this.state.buttonColorEL , marginLeft:5 , borderRadius:4}}>
                 <Text style={styles.thatButton}>Electricity</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onLsButtonPress} style={{backgroundColor:this.state.buttonColorLS , marginLeft:5 , borderRadius:4}}>
                  <Text style={styles.thatButton}>Light System</Text>
                </TouchableOpacity>

              {/* </View> */}
            </ScrollView>
          </View>

          <UsersMap
            userLocation={this.state.userLocation}
            usersPlaces={this.state.usersPlaces}
          />
        </View>
        <View style={{ marginLeft: 178, marginTop: 5 }}>
          <Icon fontSize='50' name='send' type='FontAwesome' style={{ color: 'blue', width: 70, fontSize: 48 }} onPress={this.sendReportHandler} />
          <Text style={{ fontSize: 24, fontWeight: 'bold', right: 15 }}>Submit</Text>
        </View>
      </ScrollView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#203546',
    margin: 5
  },
  thatStyle: {
    padding: 10,
    marginBottom: 5
  },
  thatButton: {
    margin: 5,
    color:'white',
    fontSize:16,
   
  }
});