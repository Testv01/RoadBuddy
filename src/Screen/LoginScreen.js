
import React from 'react'
import {
  StyleSheet, Text, TextInput, View, Button,
  Image, TouchableWithoutFeedback, StatusBar,
  SafeAreaView, Keyboard, TouchableOpacity,
  KeyboardAVoidingView } from 'react-native';
// import { Button } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome'

import firebase from 'firebase';
<style>
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
</style>



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
      .then(() => this.props.navigation.navigate('MainScreen'))
      .then(() => { alert("Welcome , " + email); })
      .catch(error => this.setState({ errorMessage: error.message }));

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
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          <Text>{"\n"}</Text>
          <Button title="Login" color= '#00000000' onPress={this.onLoginButtonPress.bind(this)} />         
          <Text>{"\n"}</Text>
          <Button
            title="Do not have an account? Sign Up"
            color="#2FB052"
            onPress={() => this.props.navigation.navigate('SignUpScreen')}
          />
        </View>
      </SafeAreaView>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(32, 53, 70)',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: '#f7c744',
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 10
  },
  title: {
    fontFamily: 'Comfortaa',
    fontSize: 28,
    color: '#FFFFFF',
  }
})