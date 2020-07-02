import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");


export default function SetAccountTypeScreen({navigation}) {
  const [type, setType] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  
  useEffect(() => {
    if(type !== ""){
      if(type === "employee"){
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .set({
          accountType: "employee",
          jobsApplied: []
        }, {merge: true}).then(res => navigation.navigate("Home", {type}));
      }
      if(type === "employer"){
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
        .set({
          accountType: "employer",
          jobsPosted: []
        }, {merge: true}).then(res => navigation.navigate("Home", {type}));
      }

    }
  }, [type])

    return (
    <View style={styles.container}>
      <Text style={styles.greeting}>{`Choose Account Type`}</Text>
      <View style={styles.errorMessage}>
        {errorMessage && <Text style={styles.error}>{errorMessage}</Text> }
      </View>
      <TouchableOpacity style={styles.buttonWork}
        onPress={()=>setType("employee")}
        >
        <Text style={{ color: "#FFF", fontWeight: "500"}}>Work</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonHire}
        onPress={()=>setType("employer")}
      >
        <Text style={{ color: "#FFF", fontWeight: "500"}}>Hire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 32 }} onPress={()=>firebase.auth().signOut()}>
        <Text>Log Out</Text>
      </TouchableOpacity>
    </View>
    )
  
}

const styles = StyleSheet.create({
  container: {
    
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
  buttonWork:{
    marginHorizontal: 30,
    marginVertical:30,
    backgroundColor: "rgb(50,50,199)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonHire:{
    marginHorizontal: 30,
    backgroundColor: "rgba(50,50,199,0.7)",
    borderRadius: 4,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }
});
