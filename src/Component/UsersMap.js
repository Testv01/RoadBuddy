import React from 'react';
import {View,StyleSheet,TextInput} from 'react-native';
import MapView from 'react-native-maps';

const usersMap = props =>{
    
    /*let userLocationMarker =null;

    if(props.userLocation){
        userLocationMarker = <MapView.Marker coordinate={props.userLocation}/>;
    }
    */
    const usersMarkers = props.usersPlaces.map(userPlace => (
        <MapView.Marker coordinate={userPlace} key={userPlace.id} title={userPlace.topic} />
    ));

    return (
        <View style={style.mapContainer}>
            <MapView 
                mapType="hybrid"
                showsUserLocation ={true}
                showsMyLocationButton={true}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0010,
                    longitudeDelta: 0.0010,
                }}
                region={props.userLocation}
                style={style.map}
            >
                {/*userLocationMarker*/}
                {usersMarkers}
            </MapView>
        </View>
    );
};

const style = StyleSheet.create({
    mapContainer:{
        width: '100%',
        height:300,
        marginTop:5,
        zIndex: -1
    },
    map:{
        width: '100%',
        height:'100%'
    }
})

export default usersMap;