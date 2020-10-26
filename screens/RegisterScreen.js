import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");


export default class RegisterScreen extends React.Component {

  static navigationOptions ={
    header: null
  };

  state={
    uid: "",
    name: "",
    email: "",
    password: "",
    errorMessage: null
  }

  handleSignUp= async()=>{
      console.log(this.state.email, this.state.password);
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(doc => {
            console.log(doc);
            this.setState({
              uid: doc.user.uid,
            })
        })
        .catch(error => { 
          console.log("Error");
          console.log(error);
          this.setState({ errorMessage: error.message })
         });
  }
  componentDidUpdate(){
    if(this.state.uid !== ""){
      console.log("Will run");
      firebase.firestore().collection('users').doc(this.state.uid+'').set({
        uid: this.state.uid,
        email: this.state.email,
        displayName: this.state.name,
        password: this.state.password,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true })
      .then(()=>{
        console.log("then");
      })
      .catch(()=>{
        console.log("catch");
      })
      
    }
  }

  render (){
    return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello\nSign up to get started.`}</Text>

      <View style={styles.errorMessage}>
        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Full Name</Text>
          <TextInput
          style={styles.input} autoCapitalize="none"
          onChangeText={name => this.setState({name})}
          value={this.state.name}
          ></TextInput>
        </View>
    
        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Email Address</Text>
          <TextInput style={styles.input} autoCapitalize="none"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
          ></TextInput>
        </View>

        <View style={{marginTop: 32}}>
          <Text style={styles.inputTitle}>Password</Text>
          <TextInput style={styles.input} secureTextEntry autoCapitalize="none" 
            onChangeText={password => this.setState({password})}
            value={this.state.password} 
          ></TextInput>
        </View>

      </View>

      <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
        <Text style={{ color: "#FFF", fontWeight: "500"}}>Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }}
      onPress={()=>{console.log(this.props);
        this.props.navigation.navigate("Login")}}
      >
        <Text style={{ color: "#414969", fontSize: 13}}>
          Already Registered? <Text style={{ fontWeight:"500", color: "rgb(50,50,199)"}}>Log In</Text>
        </Text>
      </TouchableOpacity>

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  greeting:{
    marginTop:32,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center"
  },
  errorMessage:{
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 30
  },
  error:{
    marginVertical: 20,
    color: "#E9446A",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center"
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30
  },
  inputTitle: {
    color: "#8A8F9E",
    fontSize:10,
    textTransform: "uppercase"
  },
  input:{
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 15,
    color: "#161F3D"
  },
  button:{
    marginHorizontal: 30,
    backgroundColor: "rgb(50,50,199)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});
