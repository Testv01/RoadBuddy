import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
  Keyboard,
  Alert
} from 'react-native';
import {Drawer} from 'native-base';
import MapView,{Marker,Callout} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import FirebaseInitial from '../Services/FirebaseInitial';
import SearchBar from './Searchbar'
import SideBar from './DrawerMenu';
export default class MainScreen extends Component{
 
    constructor(props) {
      super(props);
      this.state = {
      usersPlaces:[],
      processPlaces:[],
      place: [],
      query: '', 
      initialPosition:{
        latitude: 0,
        longitude:0,
        latitudeDelta:0.0922,
        longitudeDelta:0.0421
      },
      markerPosition:{
        latitude:0,
        longitude:0
      },
      destinationplace:{
        latitude:0,
        longitude:0,
      },
      origin:{
        latitude:0,
        longitude:0,
      },
      initail:{
        latitude:0,
        longitude:0,
      },
      destinate:{
        latitude:0,
        longitude:0,
      },
      result:[],
      showlist:false
    };
    
    }
   
  
  componentWillMount(){
    FirebaseInitial.asd()
    navigator.geolocation.getCurrentPosition((position) => {
      console.log('====', position.coords.latitude, position.coords.longitude)
      this.setState({
        initialPosition:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        },
        markerPosition:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
      })
      this.getUserPlacesHandler()
      this.getProcessPlacesHandler()
    },
    (error) => console.log(error))

    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      notificationTitle: 'Background tracking',
      notificationText: 'enabled',
      debug: true,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });

  }
  componentDidMount(){
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        origin:{
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        }
      })
    },
    (error) =>console.log(error))
  }

  componentWillUnmount() {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners('location');
    
  }

  
  FindPlace=(text)=>{
    this.setState({showlist:true})
    this.setState({query:text})
    if(text == ''){
      this.setState({destinationplace:{
        latitude:0,
        longitude:0
      }})
    }
    RNGooglePlaces.getAutocompletePredictions(text, {
      type: 'geocode',
      country: 'TH'
    })
      .then((place) => {
      this.setState({place:place})
      })
      .catch(error => console.log(error.message));
  }


  SelectPlace=(item)=>{
    this.setState({showlist:false})
    this.Direction()
    this.setState({ query: Object.values(item)[3]})
    RNGooglePlaces.lookUpPlaceByID((item.placeID))
    .then((results) => {
        this.setState({
          destinationplace:{
            latitude:results.latitude,
            longitude:results.longitude
          }
        });
       
      }
    )
    .catch((error) => console.log(error.message));
  }

  getProcessPlacesHandler=()=>{
    fetch('https://test-2e10e.firebaseio.com/Process.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray=[];
        for(const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            description: parsedRes[key].description,
            id: key,
            topic: parsedRes[key].topic
          });
        }

        this.setState({
          processPlaces: placesArray
        });
      })
  };

  getUserPlacesHandler=()=>{
    fetch('https://test-2e10e.firebaseio.com/Report.json')
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray=[];
        for(const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            description: parsedRes[key].description,
            id: key,
            topic: parsedRes[key].topic
          });
        }

        this.setState({
          usersPlaces: placesArray
        });
        // BackgroundGeolocation.on('location', (location) => {
        //   let alertPlaces = [];
        //   BackgroundGeolocation.getCurrentLocation(function(response) {
        //     const lat = [response.latitude-0.005, response.latitude+0.005];
        //     const lon = [response.longitude-0.005, response.longitude+0.005];
        //     Object.keys(placesArray).map(key => {
        //       if(placesArray[key].latitude >= lat[0] && placesArray[key].latitude <= lat[1]
        //         && placesArray[key].longitude >= lon[0] && placesArray[key].longitude <= lon[1]) {
        //           let report = placesArray[key];
        //           alertPlaces.push(placesArray[key]) // <------ add report in area
        //           alert(
        //             'Report Nearby',
        //             ''+report.topic,
        //             [
        //               {text: 'Cancel', onPress: () => {  BackgroundGeolocation.stop(); }},
        //               {text: 'OK', onPress: () => console.log('OK Pressed')},
        //             ],
        //             { cancelable: false }
        //           )
        //         }
        //     });
        //   })
        // });
        // BackgroundGeolocation.start();
      })
  };

  Direction=()=>{
    this.setState({initail:this.state.origin})
    this.setState({
      destination:{
        latitude:this.state.destinationplace.latitude,
        longitude:this.state.destinationplace.latitude
      }
    });
    this.setState({destinate:this.state.destinationplace})
     //this.getUserPlacesHandler() // comment function alert พื้นที่ใกล้เคียง
    }

  closeDrawer = () => {
      this.drawer._root.close()
  };
  openDrawer = () => {
   
      this.drawer._root.open()
  };
  
  markerClick = (item) =>{ //แสดงผลหลังกด marker
    this.props.navigation.navigate('NotificationDetailScreen',{item})
  };
  

  render() {
    
    const reportMarkers = this.state.usersPlaces.map(userPlace => (
      <MapView.Marker 
        coordinate={userPlace} 
        key={userPlace.id} 
        title={userPlace.topic} 
        description={userPlace.description}
        pinColor={'green'} 
      >
        <MapView.Callout tooltip onPress={()=>this.markerClick(userPlace)}>
        <View style={styles.callOut} >
          <TouchableOpacity >
              <View style={{alignContent:"center"}}>
                  <Image
                    resizeMode="cover"
                    style={{width: 50, height: 50}}
                    source={require('src/image/UnderConstruct.png')}
                  />
                  {/* comment ^^ภาพยังไม่ขึ้น  */}
                  <Text style={{fontSize:15,fontWeight: 'bold'}}>{userPlace.topic}</Text>                  
                  <Text style={{marginTop:5}}>{userPlace.description}</Text>
              </View>
          </TouchableOpacity>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    ));

    const processMarkers = this.state.processPlaces.map(processPlace => (
      <MapView.Marker 
        coordinate={processPlace} 
        key={processPlace.id} 
        title={processPlace.topic} 
        description={processPlace.description}
        pinColor={'orange'} 
      >
        <MapView.Callout tooltip onPress={()=>this.markerClick(processPlace)}>
        <View style={styles.callOut} >
          <TouchableOpacity >
              <View style={{alignContent:"center"}}>
                  <Image
                    resizeMode="cover"
                    style={{width: 50, height: 50}}
                    source={require('src/image/UnderConstruct.png')}
                  />
                  {/* comment ^^ภาพยังไม่ขึ้น  */}
                  <Text style={{fontSize:15,fontWeight: 'bold'}}>{processPlace.topic}</Text>                  
                  <Text style={{marginTop:5}}>{processPlace.description}</Text>
              </View>
          </TouchableOpacity>
          </View>
        </MapView.Callout>
      </MapView.Marker>
    ));


    const data = this. state.place;
    const place = []
    const origin = this.state.initail;
    const destination = this.state.destinate;
    const GOOGLE_MAPS_APIKEY = "AIzaSyB_1gqNDYMyc10X_3lp5qh2iTM3DlAm4gE"
    console.log('-------', this.state.initialPosition)
    return (
      <Drawer
      ref={(ref) => { this.drawer = ref; }}
      content={<SideBar navigator={this.navigator} />}
      onClose={() => this.closeDrawer()} >
      <View style={styles.container}>
        <MapView style={styles.map}
          showsMyLocationButton={true}
          showsUserLocation={true}
          initialRegion={this.state.initialPosition}
          region={this.state.initialPosition}
          // showsTraffic
        >
          <Marker coordinate={this.state.markerPosition} />
          <Marker coordinate={destination} />
          
        

          <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={10}
            strokeColor='hotpink'
            alternatives={true}
          />

          {usersMarkers}
        </MapView>
        <View style={{justifyContent:'center',flexDirection:'row'}}>
      
        <Autocomplete 
            autoCapitalize="none"
            autoCorrect={true}
            data={data.length>=0 &&  place.includes(this.state.query) == true   ? [] : data }
            containerStyle={styles.autocompleteContainer}
            defaultValue={this.state.query}
            onChangeText={text => this.FindPlace(text)}
            placeholder="Enter Place"
            renderItem={(item )=> (
              <TouchableOpacity onPress={() => { 
                this.SelectPlace(item) 
              }  }>
                <Text style={styles.itemText}>{Object.values(item)[3]} </Text>
                <Text style={styles.itemText}> </Text>
              </TouchableOpacity>
            )}
        />
      
        <View style={{width:100,left:100}}>
        <Button style={{width:50}} title='Enter'  onPress={this.Direction.bind(this)}/>
      </View>
      </View>
      <View  style={{ flex: 1 }}>
        {/* <CircleButton 
                  size={45} 
                  onPressButtonTop={()=> this.props.navigation.navigate('ReportScreen')}
                  onPressButtonLeft={()=> this.props.navigation.navigate('NotificationScreen')}
                  onPressButtonRight={()=> this.props.navigation.navigate('CallInfoScreen')}
                  primaryColor="#f27663"
                  secondaryColor="#f99a8b"
                /> */}
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" type='MaterialIcons' />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={()=> this.props.navigation.navigate('CallInfoScreen')} title="">
              <Icon name="info-outline" type='MaterialIcons' />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={()=> this.props.navigation.navigate('NotificationScreen')} title="">
              <Icon name="ios-notifications" type='Ionicons' />
            </Button>
            <Button  style={{ backgroundColor: '#DD5144' }} onPress={()=> this.props.navigation.navigate('ReportScreen')} title="">
              <Icon name="report-problem" type='MaterialIcons' />
            </Button>
          </Fab>
        </View>
      </View>
      </Drawer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    
  },
  itemText: {
    fontSize: 15,
    margin: 2
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },callOut:{
    backgroundColor:'white',
    padding: 10,
    borderColor: "black",
    borderRadius: 10,
  },
  map:{
    ...StyleSheet.absoluteFillObject
  },
});