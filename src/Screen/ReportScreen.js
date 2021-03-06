
import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, CheckBox, TouchableHighlight, TouchableOpacity } from 'react-native';

import UsersMap from 'src/Component/UsersMap';
import Report from 'src/Component/Report';
import firebase from '../Services/firebaseCfg.js'
import FirebaseInitial from '../Services/FirebaseInitial';
import { Icon } from 'native-base';
import RNFetchBlob from 'react-native-fetch-blob';
import { Dialog } from 'react-native-simple-dialogs';

//       fs.readFile(uploadUri, 'base64')
//       .then((data) => {
//         return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//         uploadBlob = blob
//         storageRef.put(blob, { contentType: mime })
//         return imageRef.put(blob, { contentType: mime })
//       })
//       .then(() => {
//         uploadBlob.close()
//         return imageRef.getDownloadURL()
//       })
//       .then((url) => {
//         resolve(url)
//       })
//       .catch((error) => {
//         reject(error)
//       })
//   })
// }

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
      Modal: false,
      uploadURL : "",

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
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  hadleSelectedFile = (data) => {
    this.setState({ selectedFile: data })
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
        //vvvvvvvvv comment เอามาวางตรงนี้ชั่วคราวก่อน เพราะคอมเมนท์ส่วนอัพภาพไป 
        this.uploadPic();
        // FirebaseInitial.insertReport(
        //   position.coords.latitude,
        //   position.coords.longitude,
        //   this.state.topicText,
        //   this.state.descText,
        //   this.state.uploadURL,
        //   this.state.accident,
        //   this.state.roadProblem,
        //   this.state.drainSystem,
        //   this.state.electricity,
        //   this.state.lightSystem,
        // )
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

        // console.log(this.state.selectedFile)

        // alert("Send Success!");
        // this.props.navigation.goBack();
        this.setState({ Modal: true })
        // this.props.navigation.replace('CallInfoSubmitScreen')
      },
      err => console.log(err)
    );
  };
  
	uploadPic = () => {
		const img = (this.state.selectedFile).uri;

		const blob = RNFetchBlob.polyfill.Blob;
		const fs = RNFetchBlob.fs;
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
    const Fetch = RNFetchBlob.polyfill.Fetch
    window.fetch = new Fetch({
      // enable this option so that the response data conversion handled automatically
      auto : true,
      // when receiving response data, the module will match its Content-Type header
      // with strings in this array. If it contains any one of string in this array, 
      // the response body will be considered as binary data and the data will be stored
      // in file system instead of in memory.
      // By default, it only store response data to file system when Content-Type 
      // contains string `application/octet`.
      binaryContentTypes : [
          'image/',
          'video/',
          'audio/',
          'foo/',
      ]
    }).build()

    window.Blob = blob;
    let rand = Math.random().toString(36);
    let uploadBlob = null;
    const imgRef = firebase.storage().ref('avatar').child(rand+'.jpg');
    let mime = 'image/jpg'
    fs.readFile( img ,'base64')
      .then( (data) => {
        return blob.build(data , {type : '${mime};BASE64'})
      }).then( (blob) => {
        uploadBlob = blob
        return imgRef.put(blob , { contentType : mime})
      }).then((resp) => {
        console.log(resp);
        return imgRef.getDownloadURL();
    }).then( (url) => {
      this.setState({
        avatarSource: null,
        uploadURL : url
      })
      FirebaseInitial.insertReport(
        this.state.userLocation.latitude,
        this.state.userLocation.longitude,
        this.state.topicText,
        this.state.descText,
        url,
        this.state.accident,
        this.state.roadProblem,
        this.state.drainSystem,
        this.state.electricity,
        this.state.lightSystem,
      )
      uploadBlob.close();
    }).catch( (error) => {
        console.log(error);
      })
	}

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
  checkEL = () => {
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
      this.setState({ buttonColorAcc: 'green' });
      this.checkAcc();
    } else if (b1 == 'green') {
      this.setState({ buttonColorAcc: null });
      this.checkAcc();
    }
  }
  onRpButtonPress = () => {
    const b1 = this.state.buttonColorRP;
    if (b1 == null) {
      this.setState({ buttonColorRP: 'green' });
      this.checkRP();
    } else if (b1 == 'green') {
      this.setState({ buttonColorRP: null });
      this.checkRP();
    }
  }
  onDsButtonPress = () => {
    const b1 = this.state.buttonColorDS;
    if (b1 == null) {
      this.setState({ buttonColorDS: 'green' });
      this.checkDS();
    } else if (b1 == 'green') {
      this.setState({ buttonColorDS: null });
      this.checkDS();
    }
  }
  onElButtonPress = () => {
    const b1 = this.state.buttonColorEL;
    if (b1 == null) {
      this.setState({ buttonColorEL: 'green' });
      this.checkEL();
    } else if (b1 == 'green') {
      this.setState({ buttonColorEL: null });
      this.checkEL();
    }
  }
  onLsButtonPress = () => {
    const b1 = this.state.buttonColorLS;
    if (b1 == null) {
      this.setState({ buttonColorLS: 'green' });
      this.checkLS();
    } else if (b1 == 'green') {
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
  goCallinfo() {
    this.setState({ Modal: false })
    this.props.navigation.replace('CallInfoSubmitScreen')
  }
  goMain() {
    this.setState({ Modal: false })
    this.props.navigation.replace('MainScreen')
  }




  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Report
            changeTopic={this.setTopic}
            changeDescription={this.setDesc}
            changeReportType={this.setReportType}
            hadleSelectedFile={this.hadleSelectedFile}
          />
          <Text style={{ color: 'white', padding: 8,fontWeight : 'bold',marginTop: 6}}>TAGS</Text>

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
              <TouchableOpacity onPress={this.onAccButtonPress} style={{ backgroundColor: this.state.buttonColorAcc, marginLeft: 5, borderRadius: 4 }}>
                <Text style={styles.thatButton}>Accident</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onRpButtonPress} style={{ backgroundColor: this.state.buttonColorRP, marginLeft: 5, borderRadius: 4 }}>
                <Text style={styles.thatButton}>Road Problem</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onDsButtonPress} style={{ backgroundColor: this.state.buttonColorDS, marginLeft: 5, borderRadius: 4 }}>
                <Text style={styles.thatButton}>Drain System</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onElButtonPress} style={{ backgroundColor: this.state.buttonColorEL, marginLeft: 5, borderRadius: 4 }}>
                <Text style={styles.thatButton}>Electricity</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={this.onLsButtonPress} style={{ backgroundColor: this.state.buttonColorLS, marginLeft: 5, borderRadius: 4 }}>
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
        <Dialog style={{ color: '#203546' }}
          visible={this.state.Modal}
          title="Send Success! Do you want to contact an organization immediately?"
          // title="Do you want to contact an organization immediately?" 
          titleStyle={{ textAlign: 'center', color: '#203546' }}
          onTouchOutside={() => { this.setState({ Modal: false }) }}
        >
          <View style={{ marginBottom: 20, alignItems: 'center', flexDirection: 'row', flex:1 }}>
            
          <View  style={{ flex:1, alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.ScreenButton, { backgroundColor: "#35495A", /*marginLeft: 100,*/ }]}
                onPress={() => { this.goCallinfo() }}
              >
                <Text style={{ color: 'white' }}>Yes</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex:1, alignItems: 'center'}}>
              <TouchableOpacity
                style={[styles.ScreenButton, { backgroundColor: "#4D6375",  }]}
                onPress={() => { this.goMain() }}
              >
                <Text style={{ color: 'white' }}>No</Text>
              </TouchableOpacity>
            </View>

          </View>
        </Dialog>

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
    color: '#f7c744',
    fontSize: 16,
  },
  ScreenButton: {
    height: 40,
    width: 100,
    borderRadius: 20,
    // marginLeft: 50,
    // marginRight: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',

  },
});