import React, { Component } from 'react';
import {Button,TextInput,View,StyleSheet,Text,
    Image,} from 'react-native';
import Tags from "react-native-tags";
import ImagePicker from "react-native-image-picker";

const options = {
	title: 'img picker',
	takePhotoButtonTitle: 'Take photo with your camera',
	chooseFromLibraryButtonTitle: 'Choose photo from library',
}

export default class Report extends Component {

    constructor(props) {
        super(props);
        this.state = {
          avatarSource: null,
        }
    }

    pickImageHandler = () => {
        ImagePicker.showImagePicker(options, (response) => {
      
          if (response.didCancel) {
            console.log('User cancelled image picker');
          }
          else if (response.error) {
            console.log('Image Picker Error: ', response.error);
          }
      
          else {
            let source = { uri: response.uri };
            this.setState({
              avatarSource: {uri: response.uri},
              pic: response.data
            });
          }
        });
      }

      resetHandler = () =>{
        this.setState({
          avatarSource: null
        });
      }

    render() {
        return (            
            <View style={style.reportContainer}>
                <View style={styles.container}>
                    <View style={styles.placeholder}>
                    {/* โค้ดพังอยู่นี่จ้ะ VVV */}
                        <Image source={this.state.avatarSource} style={styles.previewImage} />
                        {/* <Image source={{uri: props.pickImage }} style={styles.previewImage} /> */}
                    </View>
                    <View style={styles.button}>

                        <Button title="Pick Image" onPress={this.pickImageHandler} buttonStyle={styles.round}/>
                        
                        <Button title="Reset" onPress={this.resetHandler} />
                    
                    </View>
                </View>
                <TextInput 
                    style={style.topic}
                    placeholder = "Enter Topic" 
                    onChangeText={this.props.changeTopic}
                />
                <TextInput 
                    style={style.topic}
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder = "Enter Description" 
                    onChangeText={this.props.changeDescription}
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
                <Button title="Send Report" onPress={this.props.onSendReport} />
            </View>
        );
    }
};

const style = StyleSheet.create({
    reportContainer:{
        width: '100%',
        marginTop:20,
        flex:1
    },
    topic:{
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: '#ffffff'
    },
})

const styles = StyleSheet.create({
    container: {
        alignItems:"center"  ,      
        flexDirection:"row",
        margin:20
    },
    placeholder: {
        borderWidth: 1,
        borderColor: "black",
        backgroundColor: "#eee",
        width: "70%",
        height: 280,
    },
    button: {
        width: "20%",
        marginLeft:20,
        flexDirection:"column",
        justifyContent: "space-around"
    },  
    previewImage: {
        width: "100%",
        height: "100%"
    },
    round:{        
        borderRadius: 5
    }
});