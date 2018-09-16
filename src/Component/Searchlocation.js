import React from 'react';
import { View, Image,Text } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};

const searchLocation = props => {
  return (
      <GooglePlacesAutocomplete
        placeholder='Enter Location'
        minLength={2}
        autoFocus={false}
        returnKeyType={'default'}
        fetchDetails={true}
        renderDescription={row => row.description} // custom description render
        onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
          console.log(data, details);
        }}
        
        getDefaultValue={() => ''}
        
        query={{
          // available options: https://developers.google.com/places/web-service/autocomplete
          key: 'AIzaSyB_1gqNDYMyc10X_3lp5qh2iTM3DlAm4gE',
          language: 'en', // language of the results
          types: '(cities)' // default: 'geocode'
        }}
        
        styles={{
          textInputContainer: {
            backgroundColor: 'rgba(0,0,0,0)',
            borderTopWidth: 0,
            borderBottomWidth:0
          },
          textInput: {
            marginLeft: 0,
            marginRight: 0,
            height: 38,
            color: '#5d5d5d',
            fontSize: 16
          },
          predefinedPlacesDescription: {
            color: '#1faadb'
          },
        }}
        currentLocation={false}
    />
  );
}

export default searchLocation;