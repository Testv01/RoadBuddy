import React, { Component } from 'react';
import {Button,TextInput,View,StyleSheet} from 'react-native';

const report = props =>{
    
    state = { 
        topicText: 'Useless Placeholder' 
    };
      
    return (
        <View style={style.reportContainer}>
            <TextInput 
                style={style.topic}
                placeholder = "Enter Topic" 
                onChangeText={props.changeTopic}
            />
            <TextInput 
                style={style.topic}
                multiline = {true}
                numberOfLines = {4}
                placeholder = "Enter Topic" 
                onChangeText={props.changeDescription}
            />
            <Button title="Send Report" onPress={props.onSendReport} />
        </View>
    );
};

const style = StyleSheet.create({
    reportContainer:{
        width: '100%',
        height:200,
        marginTop:20
    },
    topic:{
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#ffffff'
    },
})


export default report;