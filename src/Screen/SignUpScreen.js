
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import firebase from 'firebase';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      errorMessage: null ,
      confirmPassword: ''
    }
  }
  
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => this.props.navigation.navigate('MainScreen'))
      .then(()=>{ alert("Welcome , "+this.state.email); })
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  checkConfirmPass=()=>{
    const pass = this.state.password
    const cPass = this.state.confirmPassword
    if (pass !== cPass){
      this.setState({ errorMessage : "Password not matching" })
    } else {
      this.handleSignUp()
    }
  }

render() {
    return (
      <View style={styles.container}>
        <Text>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TextInput
          secureTextEntry
          placeholder="Confirm Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={confirmPassword => this.setState({ confirmPassword })}
          value={this.state.confirmPassword}
        />
        <Button title="Sign Up" onPress={this.checkConfirmPass} />
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  }
})