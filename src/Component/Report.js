import React, { Component } from 'react';
import {Button,TextInput,View,StyleSheet,Picker} from 'react-native';

const report = props =>{
    
    state = { 
        topicText: 'Useless Placeholder' ,
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
                placeholder = "Enter Description" 
                onChangeText={props.changeDescription}
            />

            <Picker style={style.topic} 
            selectedValue = {this.state.selectedValue} 
            onValueChange = {(itemValue, itemIndex) => this.setState({reportType: itemValue})}>
               <Picker.Item label = "Road Problem" value = "Road_Problem" />
               <Picker.Item label = "Traffic" value = "Traffic" />
               <Picker.Item label = "Accident" value = "Accident" />
            </Picker>

            
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