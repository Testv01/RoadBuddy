import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button
} from 'react-native';
import MapView,{Marker,Callout} from 'react-native-maps';
import RNGooglePlaces from 'react-native-google-places';
import MapViewDirections from 'react-native-maps-directions';
import Autocomplete from 'react-native-autocomplete-input'
import CircleButton from 'react-native-circle-button'
import BackgroundGeolocation from 'react-native-mauron85-background-geolocation';
import FirebaseInitial from '../Services/FirebaseInitial';
import {  Icon, Fab } from 'native-base';

export default class MainScreen extends Component{
 

    

    constructor(props) {
      super(props);
      this.state = {
      usersPlaces:[],
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
      active: false
    };
    
    }
   
  
 
  componentWillMount(){
    FirebaseInitial.asd()
    navigator.geolocation.getCurrentPosition((position) => {
      this.setState({
        initialPosition:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          latitudeDelta:0.0922,
          longitudeDelta:0.0421
        },
        markerPosition:{
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        },
      })
    },
    (error) =>console.log(error))

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
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
        }
      })
    },
    (error) =>console.log(error))
  }

  componentWillUnmount() {
    BackgroundGeolocation.stop();
    BackgroundGeolocation.removeAllListeners('location');
    
  }

  

  
  FindPlace(text){
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


  SelectPlace(item){
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

  getUserPlacesHandler=()=>{
    fetch('https://test-2e10e.firebaseio.com/Report.json')
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
        BackgroundGeolocation.on('location', (location) => {
          let alertPlaces = [];
          BackgroundGeolocation.getCurrentLocation(function(response) {
            const lat = [response.latitude-0.005, response.latitude+0.005];
            const lon = [response.longitude-0.005, response.longitude+0.005];
            Object.keys(placesArray).map(key => {
              if(placesArray[key].latitude >= lat[0] && placesArray[key].latitude <= lat[1]
                && placesArray[key].longitude >= lon[0] && placesArray[key].longitude <= lon[1]) {
                  let report = placesArray[key];
                  alertPlaces.push(placesArray[key]) // <------ add report in area
                }
            });

            alert(alertPlaces)
          })
        });
        BackgroundGeolocation.start();
      })
  };

  Direction(){
    this.setState({initail:this.state.origin})
    this.setState({destinate:this.state.destinationplace})
    this.getUserPlacesHandler()
    }
  
  
  

  render() {
    const usersMarkers = this.state.usersPlaces.map(userPlace => (
      <MapView.Marker coordinate={userPlace} key={userPlace.id} title={userPlace.topic} />
    ));
    const data = this. state.place;
    const place = []
    const x =  Object.values(this.state.place).forEach(function(value) {
      place.push(Object.values(value)[3])
    });
      
    const origin = this.state.initail;
    const destination = this.state.destinate;
    const GOOGLE_MAPS_APIKEY = "AIzaSyB_1gqNDYMyc10X_3lp5qh2iTM3DlAm4gE"
    return (
      <View style={styles.container}>
      <MapView style={styles.map}
        showsMyLocationButton
        showsUserLocation
        initialRegion={this.state.initialPosition}
        showsTraffic
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
            <TouchableOpacity onPress={() =>this.SelectPlace(item) }>
              <Text style={styles.itemText}>{Object.values(item)[3]} </Text>
              <Text style={styles.itemText}> </Text>
            </TouchableOpacity>
          )}
      />
      
      <View style={{width:50,left:100}}>
        <Button title='Go'  onPress={this.Direction.bind(this)}/>
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
            <Button style={{ backgroundColor: '#34A34F' }} onPress={()=> this.props.navigation.navigate('CallInfoScreen')}>
              <Icon name="info-outline" type='MaterialIcons' />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={()=> this.props.navigation.navigate('NotificationScreen')}>
              <Icon name="ios-notifications" type='Ionicons' />
            </Button>
            <Button  style={{ backgroundColor: '#DD5144' }} onPress={()=> this.props.navigation.navigate('ReportScreen')}>
              <Icon name="report-problem" type='MaterialIcons' />
            </Button>
          </Fab>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 50
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    width:240
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
  },
  map:{
    ...StyleSheet.absoluteFillObject
  },
});