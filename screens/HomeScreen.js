import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import SetAccountTypeScreen from './SetAccountTypeScreen';
import * as firebase from 'firebase';
require("firebase/firestore");


export default class HomeScreen extends React.Component {

  static navigationOptions ={
    header: null
  };

  state={
    searchStatus: '',
    doc: null,
    uid: "",
    email: "",
    accountType: "",
    displayName:""
  }

  componentDidMount=async ()=>{
    this.setState({
      uid: await firebase.auth().currentUser.uid,
      doc: await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid),
      searchStatus: 'searching'
    })
      this.state.doc.get().then((data) => {
        if (data.exists) {
          this.setState({ searchStatus : 'searched' })
            if(data.data().accountType){
              this.setState({ accountType: data.data().accountType, displayName: data.data().displayName })
            }
            else{
              this.props.navigation.push("SetAccountType");
            }
        } else {
          this.setState({ searchStatus : 'empty' })
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
      <TouchableOpacity style={styles.buttonLogout} onPress={this.signOutUser}>
        <Text style={{ color: "#FFF", fontWeight: "500"}}>Log Out</Text>
      </TouchableOpacity>
      {
          this.state.searchStatus == 'searching' &&
          <View style={{alignSelf: "center", marginTop: 32}}>
            {/* <Text style={{fontSize: 12, color: 'blue'}}>Loading Jobs..</Text> */}
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
      }


      { this.state.searchStatus == 'searched' && 
      <View style={{paddingHorizontal: 30}}>
      <Text style={styles.text}>Hi {this.state.displayName}!</Text>
      <Text style={styles.text}>{this.state.email}</Text>
      <Text style={styles.text}>
        Your account type is:
        {this.state.accountType}
      </Text>

      <View style={{marginTop: 30}}>
        <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.push("EditProfile")}
            >
            <Text style={{ color: "#FFF", fontWeight: "500"}}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      <View>
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
        <View>
          <TouchableOpacity style={styles.button}
            onPress={()=>this.props.navigation.push("PostJob")}
            >
            <Text style={{ color: "#FFF", fontWeight: "500"}}>Post A Job</Text>
          </TouchableOpacity>
        </View>
        )
      }


      </View>
      }
      {
        this.state.searchStatus == 'empty' && 
        <View style={{alignContent: "center", justifyContent: "center"}}>
          <Text style={{alignSelf: "center" ,fontSize: 16, color: '#000'}}>Login Again Please</Text>
        </View>
      }

    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: '#01b9b611'
    // alignItems: "center",
    // justifyContent: "center",
  },
  text:{
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '300'
  },
  button:{
    marginHorizontal: 30,
    marginVertical:30,
    paddingHorizontal: 20,
    backgroundColor: "#01b9b6e2",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonLogout:{
    marginHorizontal: 30,
    marginVertical:30,
    paddingHorizontal: 5,
    paddingVertical: 5,
    backgroundColor: "rgb(199,50,50)",
    borderRadius: 100,
    width: 70,
    height: 70,
    alignItems: "center",
    justifyContent: "center"
  }

});
