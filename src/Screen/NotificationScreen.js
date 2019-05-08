import React, { Component } from 'react';
import { StyleSheet, View,Text,FlatList,Image,TouchableOpacity } from 'react-native';
import firebase from 'firebase';
import {Footer, FooterTab,Button, Icon} from 'native-base';

export default class NotificationScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLocation:null,
      usersPlaces:[],
      processPlaces:[],
    };
  }
  
  componentWillMount(){
    const url = 'https://test-2e10e.firebaseio.com/Report.json'
    const userEmail = firebase.auth().currentUser.email;
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        let placesArray = [];
        // const placesArray = parsedRes.filter(function(place) {
        //   return place.user == userEmail
        // })
        // .map(function(place) {
        //   return {
        //     latitude: place.latitude,
        //     longitude: place.longitude,
        //     id: key,
        //     image: place.image,
        //     topic: place.topic,
        //     description: place.description,
        //     user:place.user
        //   }
        // });
        for(const key in parsedRes) {
          if(parsedRes[key].user == userEmail) {
            placesArray.push({
              latitude: parsedRes[key].latitude,
              longitude: parsedRes[key].longitude,
              id: key,
              image: parsedRes[key].image,
              topic: parsedRes[key].topic,
              description: parsedRes[key].description,
              user:parsedRes[key].user
            });
          }
        }
        this.setState({
          usersPlaces: placesArray
        });
      })

      // fetch('https://test-2e10e.firebaseio.com/Process.json')
      // .then(res => res.json())
      // .then(parsedRes => {
      //   const placesArray=[];
      //   for(const key in parsedRes){
      //     placesArray.push({
      //       latitude: parsedRes[key].latitude,
      //       longitude: parsedRes[key].longitude,
      //       id: key,
      //       topic: parsedRes[key].topic,
      //       description: parsedRes[key].description,
      //       user:parsedRes[key].user
      //     });
      //   }

      //   this.setState({
      //     processPlaces: placesArray
      //   });
      // })
  }

  
  renderReport=({item})=>{
    // if(item.user == firebase.auth().currentUser.email){
      return(
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('NotificationDetailScreen',{item})}>
          <View style={{flex:1,flexDirection:'row',padding:10,backgroundColor:'white'}}> 
              <Image style={{width:80,height:80, margin:5}}
                source={{uri: item.image}}
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
                    Status : Reported
                </Text>
              </View>
          </View>
          </TouchableOpacity>
      )
    // };
}

renderAllReport=({item})=>{
  
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
                  Status : Reported
              </Text>
            </View>
        </View>
        </TouchableOpacity>
    );
}

renderProcess=({item})=>{
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
                  Status : In Process....
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
    const {specific} = this.props.navigation
    return (
     <View style={styles.container}>
        <View style={{padding:10,backgroundColor:'white',flexDirection:"row",borderBottomColor:"black",borderBottomWidth:2}}> 
              <Text style={{fontSize:24,color:'lightBlue',flex:1}}>
                  {specific}
                  REPORTED
              </Text>
            <View style={{ right:0,flex:1,justifyContent:"flex-end",flexDirection:"row"}}>
            <Button style={{ backgroundColor: '#3B5998' ,right:0}} onPress={()=>this.props.navigation.pop() && this.props.navigation.navigate('NotificationScreen')} title="">
              <Icon name="refresh-circle" type='Ionicons'  />
            </Button>
            </View>
        </View>
        <FlatList
          data={this.state.usersPlaces}
          renderItem={this.renderReport}
          keyExtractor={(item,index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {/* <Footer>
          <FooterTab>
              <Button vertical >
                <Text>1</Text>
              </Button>
              <Button vertical>
                <Text>2</Text>
              </Button>
              <Button vertical>
                <Text>3</Text>
              </Button>
            </FooterTab>
        </Footer> */}
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
