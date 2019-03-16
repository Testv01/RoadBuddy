import React, { Component } from 'react';
import { StyleSheet, View,Text,FlatList,Image,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {Footer, FooterTab,Button, Icon} from 'native-base'


export default class NotificationScreen extends Component {
  state ={
    userLocation:null,
    usersPlaces:[],
  }
  componentWillMount(){
    const url = 'https://test-2e10e.firebaseio.com/Process.json'
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        const placesArray=[];
        for(const key in parsedRes){
          placesArray.push({
            latitude: parsedRes[key].latitude,
            longitude: parsedRes[key].longitude,
            id: key,
            topic: parsedRes[key].topic,
            description: parsedRes[key].description,
            user:parsedRes[key].user
          });
        }
        this.setState({
          usersPlaces: placesArray
        });
      })

  }

  
  renderReport=({item})=>{
    if(item.user == firebase.auth().currentUser.email){
      return(
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('NotificationDetailScreen',{item})}>
          <View style={{flex:1,flexDirection:'row',padding:10,backgroundColor:'white'}}> 
              <Image style={{width:80,height:80, margin:5}}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              />
              <View style={{flex:1,justifyContent:'center'}}>
                <Text style={{fontSize:18,color:'green',marginBottom:15}}>
                    Topic : {item.topic}
                </Text>            
                <Text style={{fontSize:16,color:'red'}}>
                    Description : {item.description}
                </Text>
                <Text style={{fontSize:16,color:'red'}}>
                    Sender : {item.user}
                </Text>
                <Text style={{fontSize:16,color:'red'}}>
                    Status : In Process
                </Text>
              </View>
          </View>
          </TouchableOpacity>
      )
    };
}

  renderSeparator=()=>{
    return(
      <View style={{height:1,width:'100%',backgroundColor:'black'}}>
      </View>
    )
  };

  render() {
    return (
     <View style={styles.container}>
        <FlatList
          data={this.state.usersPlaces}
          renderItem={this.renderReport}
          keyExtractor={(item,index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <Footer>
          <FooterTab>
              <Button vertical >
                {/* <Icon name="apps" /> */}
                <Text>1</Text>
              </Button>
              <Button vertical>
                {/* <Icon name="camera" /> */}
                <Text>2</Text>
              </Button>
              <Button vertical>
                {/* <Icon active name="navigate" /> */}
                <Text>3</Text>
              </Button>
            </FooterTab>
        </Footer>
      </View> 
    );
  }
}
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    position: 'absolute', 
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor: 'rgb(32, 53, 70)',
  },
});
