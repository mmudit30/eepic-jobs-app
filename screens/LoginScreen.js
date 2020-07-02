import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");


export default class LoginScreen extends React.Component {

  static navigationOptions ={
    header: null
  };

  state={
    email: "",
    password: "",
    errorMessage: null
  }

  handleLogin=()=>{
    const {email, password} =this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => this.setState({ errorMessage: error.message }))
  }
  
  handleLoginGoogleFb(type){
    let provider;
    type == 'google' ?
    provider =new firebase.auth.GoogleAuthProvider()
    :
    provider =new firebase.auth.FacebookAuthProvider();

    firebase
      .auth()
      .signInWithPopup(provider)
      .then(doc=> {
        console.log(doc);
        
        const data = {
          uid: doc.user.uid,
          email: doc.user.email,
          displayName: doc.user.displayName,
          photoURL: doc.user.photoURL
        }
        firebase
          .firestore()
          .collection('users/')
          .doc(doc.user.uid)
          .set({
            ...data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }, { merge: true })
          .then(msg => console.log(msg))
          .catch(err => console.log(err));        
      })
      .catch(error => {
        console.log(error);
        this.setState({ errorMessage: error.message }) 
      });
  }

  render (){
    return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Hello again.\nWelcome back`}</Text>

      <View style={styles.errorMessage}>
        {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text> }
      </View>

      <View style={styles.form}>
        <View>
          <Text style={styles.inputTitle}>Email address</Text>
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

      <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
        <Text style={{ color: "#FFF", fontWeight: "500"}}>Sign in</Text>
      </TouchableOpacity>

      <View style={styles.googleFbView} >
        <TouchableOpacity style={styles.buttonGoogle} onPress={()=>this.handleLoginGoogleFb('google')}>
          <Text style={{ color: "#FFF", fontWeight: "500"}}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonFb} onPress={()=>this.handleLoginGoogleFb('facebook')}>
          <Text style={{ color: "#FFF", fontWeight: "500"}}>Facebook</Text>
        </TouchableOpacity>
      </View>


      <TouchableOpacity
       style={{ alignSelf: "center", marginTop: 32 }}
       onPress={()=>{this.props.navigation.navigate("Register")}}
        >
        <Text style={{ color: "#414969", fontSize: 13}}>
          New to Epic Jobs? <Text style={{ fontWeight:"500", color: "rgb(50,50,199)"}}>Sign Up</Text>
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
  },
  googleFbView:{
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginHorizontal: 20
  },
  buttonGoogle:{
    marginHorizontal: 10,
    backgroundColor: "rgba(250,50,50,0.8)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    flex: 1
  },
  buttonFb:{
    marginHorizontal: 10,
    backgroundColor: "rgba(50,50,199,0.7)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    flex: 1

  }


});
