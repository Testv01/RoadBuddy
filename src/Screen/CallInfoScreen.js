import React, { Component } from 'react';
import { StyleSheet, View,Text,Button,FlatList,Image } from 'react-native';

export default class MainScreen extends Component {
  state ={
    phoneNumbers:[],
  }
  componentDidMount(){
    const url = 'https://test-2e10e.firebaseio.com/phoneNumber.json'
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        const phonesArray=[];
        for(const key in parsedRes){
          phonesArray.push({
            id: key,
            number:parsedRes[key].number,
            name: parsedRes[key].name,
            description: parsedRes[key].description
          });
        }
        this.setState({
          phoneNumbers: phonesArray
        });
      })

  }

  
  renderReport=({item})=>{
    return(
      <View style={{flex:1,flexDirection:'row',padding:10,backgroundColor:'white'}}>
          <Image style={{width:80,height:80, margin:5}}
            source={{uri: 'https://www.ototroniks.com/img/p/2/7/8/7/2787-large_default.jpg'}}
          />
          <View style={{flex:1,justifyContent:'center'}}>
            <Text style={{fontSize:18,color:'green',marginBottom:15}}>
                Topic : {item.name}
            </Text>            
            <Text style={{fontSize:16,color:'red'}}>
                Description : {item.description}
            </Text>
            <Text style={{fontSize:16,color:'blue'}}>
                Description : {item.number}
            </Text>
          </View>
      </View>
    )
  };

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
          data={this.state.phoneNumbers}
          renderItem={this.renderReport}
          keyExtractor={(item,index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
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
    backgroundColor: '#ffe79b',
  },
});
