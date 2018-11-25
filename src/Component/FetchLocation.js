import React from 'react';
import {Button} from 'react-native';

const fetchLocation = props =>{
    return (
        <Button title="Send Location" onPress={props.onSendLocation} />
    );
};

export default fetchLocation;