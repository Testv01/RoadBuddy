import React from 'react';
import { StyleSheet, Text, View ,TextInput,FlatList,Keyboard,Button,TouchableOpacity} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Fab,Icon} from 'native-base';


export default class Searchbar extends React.Component {
    constructor(props) {
      super(props);
      this.state={
          searchBarFocused : false,
          active: false
      }
    }
    componentDidMount(){
        this.keyboardDidShow = Keyboard.addListener('keyboardDidShow',this.keyboardDidShow)
        this.keyboardDidHide  = Keyboard.addListener('keyboardDidHide',this.keyboardDidHide)
        
    }
    componentWillUnmount() {
        this.keyboardDidShow.remove();
        this.keyboardDidHide.remove();
    }
    
    keyboardDidShow = () => {
        this.setState({searchBarFocused:true})
    }
    keyboardDidHide = () => {
        this.setState({searchBarFocused:false})
        
    }
      
   
    showPlacelist=({item})=>{
        return(
            
            <TouchableOpacity onPress={this.state.searchBarFocused?null:()=>this.props.selectplace(item)}>
                <View style={{flex:1,backgroundColor:'white',justifyContent:'flex-start',paddingHorizontal:5,flexDirection:'column',padding:10}}>
                    <Text>{Object.values(item)[3]}</Text>
                </View>
            </TouchableOpacity>
        )
    }
  
    render() {
      return (
    <View style={styles.container}>
      <View style={{flex:1,padding:20}}>
      <View>
        <View style={{height:60,backgroundColor:'white',justifyContent:'flex-start',flexDirection:'row',alignItems:'center'}}>
        <Animatable.View animation='slideInRight' style={{height:50,backgroundColor:'white',padding:10,alignItems:'center'}}>
        <Animatable.View animation={this.state.searchBarFocused?'fadeInLeft':'fadeInRight'} duration={400}>
          <Icon name={this.state.searchBarFocused?'md-arrow-back':'md-menu'} style={{fontSize:30}} onPress={this.state.searchBarFocused?Keyboard.dismiss:()=>this.props.opendrawer()}/>
          </Animatable.View>
      </Animatable.View>
          <Animatable.View animation='slideInRight' style={{height:50,flex:1,backgroundColor:'white',flexDirection:'row',padding:5,alignItems:'center'}}>
            <TextInput 
                    placeholder="Search" 
                    style={{fontSize:16,flex:1}} 
                    onChangeText={text=>this.props.findplace(text)}
                    value={this.props.defaultvalue}
                    />
          </Animatable.View>
          </View>
          {this.props.showlist  ?
          <FlatList 
          style={{backgroundColor:this.state.searchBarFocused?'rgba(0,0,0,0.3)':'white'}}
          data={this.props.data} 
          renderItem={
            this.showPlacelist
          }
          keyExtractor={(item,index) => index.toString()}
        /> 
        : null
        }
        </View>
      </View>
      <View >
            <Fab
                active={this.state.active}
                direction="up"
                containerStyle={{ }}
                style={{ backgroundColor: '#5067FF' }}
                position="bottomRight"
                onPress={() => this.setState({ active: !this.state.active })}>
            <Icon name="add" type='MaterialIcons' />
            <Button style={{ backgroundColor: '#34A34F' }} onPress={()=> this.props.navigation.navigate('CallInfoScreen')}>
              <Icon name="info-outline" type='MaterialIcons' />
            </Button>
            <Button style={{ backgroundColor: '#3B5998' }} onPress={()=> this.props.navigation.navigate('NotificationScreen')}>
              <Icon name="ios-notifications" type='Ionicons' />
            </Button>
            <Button  style={{ backgroundColor: '#DD5144' }} onPress={()=> this.props.navigation.navigate('ReportScreen')}>
              <Icon name="report-problem" type='MaterialIcons' />
            </Button>
          </Fab>
        </View>
      </View>
      )
    }
}
  const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
  })