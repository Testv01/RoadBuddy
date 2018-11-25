
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native'
import firebase from 'firebase';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: null,
      confirmPassword: ''
    }
  }

  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)  
      .catch(error => this.setState({ errorMessage: error.message }))    
      .then(() => this.props.navigation.navigate('LoginScreen'))
      .then(function (sendEmailVerify){
        if (sendEmailVerify ===false ){
          return false;
        }else{
          firebase.auth().currentUser.sendEmailVerification()
          .then(() => { alert("Email Varification Sent! Please check your email."); })
          return true;
        }
    })
  }
  
  checkConfirmPass = () => {
    const pass = this.state.password
    const cPass = this.state.confirmPassword
    if (pass !== cPass) {
      this.setState({ errorMessage: "Password not matching" })
    } else {
      this.handleSignUp()
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title]}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Text>{"\n"}</Text>
        <TextInput style={[styles.textInput /* ,{fontStyle : 'italic'}*/ ]}
          placeholderTextColor="#EAEAEA"
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput style={styles.textInput}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#EAEAEA"          
          autoCapitalize="none"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          style={styles.textInput}
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor="#EAEAEA"
          autoCapitalize="none"
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
        />
        <TouchableOpacity
          style={[styles.signupScreenButton]}
          onPress={this.handleSignUp}
        >
          <Text style={{ color: 'white' }}>
            COMFIRM
        </Text>
        </TouchableOpacity>
        {/* <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        /> */}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#203546',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textInput: {
    height: 42,
    backgroundColor: 'rgba(255,255,255,0.2)',    
    color: '#f7c744',
    width: '90%',
    color: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
    paddingHorizontal: 15
  },
  text: {
    color: 'white',
    marginLeft: 1
  },
  title: {
    fontFamily: "Comfortaa-Bold",
    fontSize: 36,
    color: '#FFFFFF',
    marginTop: 10
  },
  signupScreenButton: {
    height: 40,
    width: 150,
    borderRadius: 20,
    backgroundColor: "#4D6375",
    marginLeft: 50,
    marginRight: 50,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
})