import React, { Component } from 'react';
import {Button,TextInput,View,StyleSheet,Picker} from 'react-native';
import Tags from "react-native-tags";

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
            <Tags
                initialText=""
                initialTags={["Report"]}
                onChangeTags={tags => console.log(tags)}
                onTagPress={(index, tagLabel, event, deleted) =>
                console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                }
                containerStyle={{ justifyContent: "center" }}
                inputStyle={{ backgroundColor: "white" }}
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