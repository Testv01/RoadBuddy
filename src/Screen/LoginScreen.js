
import React from 'react'
import {
  StyleSheet, Text, TextInput, View, Button,
  Image, TouchableNativeFeedback, TouchableOpacity, StatusBar,
  SafeAreaView, Keyboard, TouchableHighlight,
  KeyboardAVoidingView,Alert
} from 'react-native';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome'
import firebase from 'firebase'

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'testsignup@mail.com',
      password: 'test1234',
      errorMessage: null
    }
  }

  onLoginButtonPress = () => {
    const { email, password } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {this.props.navigation.navigate('MainScreen')}) 
      .catch(error => this.setState({ errorMessage: error.message }))
      
  }
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <View style={styles.container}>
          <Text style={styles.title}>Road Buddy</Text>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          <Text style={{ color: 'white', marginRight: 260 }}>
            Email Address
            </Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <Text style={{ color: 'white', marginRight: 287.5, paddingTop: 8 }}>
            Password
            </Text>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Text>{"\n"}</Text>
          <TouchableOpacity
            style={[styles.loginScreenButton, { backgroundColor: "#4D6375" }]
            }
            onPress={this.onLoginButtonPress.bind(this)}
          >
            <Text style={{ color: 'white' }}>
              Login
            </Text>
            {/* https://material.io/tools/color/#!/?view.left=0&view.right=0&primary.color=00695C */}
            {/* <Button title="Login" color= '#00000000' onPress={this.onLoginButtonPress.bind(this)} />     */}
          </TouchableOpacity>
          {/* <Button title="Login" className="test" color= '#00000000' onPress={this.onLoginButtonPress.bind(this)} />          */}
          <Text>{"\n"}</Text>
          <TouchableOpacity
            style={[styles.loginScreenButton, {marginTop:1}/* , { backgroundColor:'black' } */]
            }
            onPress={ () => this.props.navigation.navigate('SignUpScreen')}
          >
            <Text style={{ color: 'white' }}>
              Sign Up
          </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView >
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 53, 70)',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white',
    marginLeft: 1
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#f7c744',
    height: 42,
    width: 350,
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 12,
  },
  title: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 36,
    color: '#FFFFFF',
    marginBottom: 70
  },
  loginScreenButton: {
    height: 40,
    width: 150,
    borderRadius: 20,
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  Borderza: {
    borderRadius: 50
  }
})