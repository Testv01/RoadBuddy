import React, { Component } from 'react';
import {Button,TextInput,View,StyleSheet,Text,
    Image,CheckBox,} from 'react-native';
import Tags from "react-native-tags";
import ImagePicker from "react-native-image-picker";
import {  Icon } from 'native-base';
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
          try:["report","007"]
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
                   
                </View>
                <View style={styles.button}>
                <View>
                    {/* <Button title='' onPress={this.pickImageHandler} buttonStyle={styles.round}/> */}
                        <Icon name="photo" type='FontAwesome' style={{color:'white'}} onPress={this.pickImageHandler}/>
                </View>
                <View style={{marginLeft:10}}>
                     {/* <Button title='' onPress={this.resetHandler} />  */}
                        <Icon name="repeat" type='FontAwesome' style={{color:'white'}} onPress={this.resetHandler} />
                </View>
              

                </View>
                <Text style={{color:'white',marginVertical:5}}>Topic</Text>
                <TextInput 
                    style={style.topic}
                    placeholder = "Enter Topic" 
                    onChangeText={this.props.changeTopic}
                />
                <Text style={{color:'white',marginVertical:5}} >Description</Text>
                <TextInput 
                    style={style.topic}
                    multiline = {true}
                    numberOfLines = {4}
                    placeholder = "Enter Description" 
                    onChangeText={this.props.changeDescription}
                />
                
                {/*<Tags
                    initialText=""
                    initialTags={this.state.try}
                    onChangeTags={tags => console.log(tags)}
                    onTagPress={(index, tagLabel, event, deleted) =>
                    console.log(index, tagLabel, event, deleted ? "deleted" : "not deleted")
                    }
                    containerStyle={{ justifyContent: "center" }}
                    inputStyle={{ backgroundColor: "white" }}
                /> */}           
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
        backgroundColor: '#ffffff',
        marginTop:5,
        marginHorizontal:15
    },
})

const styles = StyleSheet.create({
    container: {
        alignItems:"center"  ,      
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
        marginLeft:170,
        marginBottom:20,
        flexDirection:'row'

        
    },  
    previewImage: {
        width: "100%",
        height: "100%"
    },
    round:{        
        borderRadius: 5
    }
});