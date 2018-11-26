import React, { Component } from 'react';
import { StyleSheet, View, Text, Button, FlatList, Image, TouchableOpacity } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import { Icon } from 'native-base';
export default class CallInfoSubmitScreen extends Component {
  state = {
    phoneNumbers: [],
    lasttag: [],
    tagtrue: [],
  }
  componentWillMount() {
    const url = 'https://test-2e10e.firebaseio.com/Report.json'
    fetch(url)
      .then(res => res.json())
      .then(parsedRes => {
        var lastArray = [];
        for (const key in parsedRes) {

          lastArray.push({

            Accident: parsedRes[key].accident,
            RoadProblem: parsedRes[key].roadProblem,
            DrainSystem: parsedRes[key].drainSystem,
            Electricity: parsedRes[key].electricity,
            LightSystem: parsedRes[key].lightSystem,
          });
        }
        this.setState({
          lasttag: lastArray[lastArray.length - 1]
        });

        var tagtrue = []
        if (this.state.lasttag != null) {
          if (this.state.lasttag.Accident == true) {
            tagtrue.push('Accident')
          }
          if (this.state.lasttag.RoadProblem == true) {
            tagtrue.push('Road Problem')
          }
          if (this.state.lasttag.DrainSystem == true) {
            tagtrue.push('Drain System')
          }
          if ((this.state.lasttag.Electricity == true) && (this.state.lasttag.LightSystem == true)) {
            tagtrue.push('Electricity, Light System')
          } else {
            if (this.state.lasttag.Electricity == true) {
              tagtrue.push('Electricity')
            }
            if (this.state.lasttag.LightSystem == true) {
              tagtrue.push('Light System')
            }
          }


        }

        const url = 'https://test-2e10e.firebaseio.com/ShownCall.json'
        fetch(url)
          .then(res => res.json())
          .then(parsedRes => {
            var phonesArray = [];
            for (const key in parsedRes) {
              console.log(parsedRes)
              if (tagtrue.includes(key)) {
                for (i = 0; i < Object.values(parsedRes[key]).length; i++) {
                  phonesArray.push({
                    id: key,
                    tag: Object.values(parsedRes[key])[i],
                  });
                }

              }
            }

            this.setState({
              phoneNumbers: phonesArray
            });


          })


      })



  }
  componentDidMount() {

    // const url = 'https://test-2e10e.firebaseio.com/phoneNumber.json'
    // fetch(url)
    //   .then(res => res.json())
    //   .then(parsedRes => {
    //     const phonesArray=[];
    //     for(const key in parsedRes){
    //       phonesArray.push({
    //         id: key,
    //         number:parsedRes[key].number,
    //         name: parsedRes[key].name,
    //         description: parsedRes[key].description,
    //         pic: parsedRes[key].pic
    //       });
    //     }
    //     this.setState({
    //       phoneNumbers: phonesArray
    //     });
    //   })

  }


  renderReport = ({ item }) => {
    if (item.tags == null) {
      item.tags = "None"
    }
    return (
      <View style={{ flex: 1, flexDirection: 'row', padding: 10, backgroundColor: 'white' }}>
        <Image style={{ width: 80, height: 80, margin: 5 }}
          source={{ uri: item.tag.pic }}
        />
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text style={{ fontSize: 18, color: 'green', marginBottom: 15 }}>
            Name : {item.tag.name}
          </Text>
          <Text style={{ fontSize: 16, color: 'red' }}>
            Description : {item.tag.description}
          </Text>
          <Text style={{ fontSize: 16, color: 'blue' }}>
            Number : {item.tag.number}
          </Text>
          <Text style={{ fontSize: 14, color: 'black', fontStyle: 'italic' }}>
            Tags : {item.id}
          </Text>
        </View>
        <View style={{ backgroundColor: '#203546' }}>
          <Icon
            name='phone-in-talk'
            type='MaterialIcons'
            style={{ color: 'white', marginVertical: 40, height: 40, borderRadius: 15, fontSize: 36 }}
            onPress={() => RNImmediatePhoneCall.immediatePhoneCall(item.number)}
          />
        </View>

      </View>
    )
  };

  renderSeparator = () => {
    return (
      <View style={{ height: 1, width: '100%', backgroundColor: 'black' }}>
      </View>
    )
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.phoneNumbers}
          renderItem={this.renderReport}
          keyExtractor={(item, index) => index}
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
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgb(32, 53, 70)',
  },
});