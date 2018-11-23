
import React from 'react'
import { StyleSheet, Text, TextInput, View, Button,TouchableOpacity} from 'react-native'
import firebase from 'firebase';

export default class SignUpScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      email: '', 
      password: '', 
      errorMessage: null 
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

render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.title]}>Sign Up</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <Text>{"\n"}</Text>
        <TextInput style={styles.textInput}
          placeholder="Email Address"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />        
        <TextInput style={styles.textInput}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <TouchableOpacity
          style={[styles.signupScreenButton]}
          onPress={this.handleSignUp}
        >
        <Text style={{color: 'white' }}>
          COMFIRM
        </Text>
        </TouchableOpacity>
       {/* <TouchableOpacity
          style={[styles.signupScreenButton]}          
          onPress={() => this.props.navigation.navigate('LoginScreen')}
        >
        <Text style={[{color:'white'}]}>
        ALREADY HAVE AN ACCOUNT? GO TO LOGIN
        </Text>
        </TouchableOpacity>  */}
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