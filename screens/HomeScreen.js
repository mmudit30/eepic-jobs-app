import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import SetAccountTypeScreen from './SetAccountTypeScreen';
require("firebase/firestore");


export default class HomeScreen extends React.Component {

  static navigationOptions ={
    header: null
  };

  state={
    doc: null,
    uid: "",
    email: "",
    accountType: "",
    displayName:""
  }

  componentDidMount=async ()=>{
    this.setState({
      uid: await firebase.auth().currentUser.uid,
      doc: await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
    })
      this.state.doc.get().then((data) => {
        if (data.exists) {
            if(data.data().accountType){
              this.setState({ accountType: data.data().accountType, displayName: data.data().displayName })
            }
            else{
              this.props.navigation.push("SetAccountType");
            }
        } else {
            console.log("No such document!");
        }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
    
    const {email} = firebase.auth().currentUser;
    this.setState({email});
  }
  componentDidUpdate=()=>{
    // console.log(this.state.accountType);    
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);    
    if (nextProps.navigation.state.params.type) {
      this.setState({accountType: nextProps.navigation.state.params.type});
    }
  }

  signOutUser=()=>{
    firebase.auth().signOut();
  }


  render (){
    return (
    <View style={styles.container}>
      <TouchableOpacity style={{ marginTop: 32 }} onPress={this.signOutUser}>
        <Text>Log Out</Text>
      </TouchableOpacity>


      <Text>Hi {this.state.displayName}!</Text>
      <Text>{this.state.email}</Text>
      <Text>
        Your account type is:
        {this.state.accountType}
      </Text>

      <View style={{marginVertical: 30}}>
        <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.push("Profile")}
            >
            <Text style={{ color: "#FFF", fontWeight: "500"}}>Profile</Text>
        </TouchableOpacity>
      </View>


      {
        (this.state.accountType === "employee" && 
        <View>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.push("JobList")}
            >
            <Text style={{ color: "#FFF", fontWeight: "500"}}>Search Jobs</Text>
          </TouchableOpacity>
        </View>
        )
      }

      {
        (this.state.accountType === "employer" && 
        <View style={{ marginVertical: 30 }}>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.push("PostJob")}
            >
            <Text style={{ color: "#FFF", fontWeight: "500"}}>Post A Job</Text>
          </TouchableOpacity>
        </View>
        )
      }


    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30
    // alignItems: "center",
    // justifyContent: "center",
  },
  button:{
    marginHorizontal: 30,
    marginVertical:30,
    paddingHorizontal: 20,
    backgroundColor: "rgb(50,50,199)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});
