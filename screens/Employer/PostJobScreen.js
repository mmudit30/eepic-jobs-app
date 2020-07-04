import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
require("firebase/firestore");

export default function PostJobScreen({navigation}) {

  const [errorMessage, setErrorMessage] = useState("");

  const [postedBy, setPostedBy] = useState('')
  const [jobsPosted, setJobsPosted] = useState([]);
  const [jobTitle, setJobTitle] = useState(""); //1
  const [jobDescription, setJobDescription] = useState(""); //2
  const [skillsRequired, setSkillsRequired] = useState(['']); //3
  const [companyName, setCompanyName] = useState(''); //4
  const [jobLocation, setJobLocation] = useState(['']); //7
  const [jobOpenings, setJobOpenings] = useState(''); //6
  const [lastDate, setLastDate] = useState(''); //5

  useEffect(() => {
    setPostedBy(firebase.auth().currentUser.uid);
    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
            .then(doc => {
              setJobsPosted(doc.data().jobsPosted)
            })
  }, [jobsPosted]);

  let postJob=()=>{
    setSkillsRequired( skillsRequired.map(str => str.trim() ) );
    setJobLocation( jobLocation.map(str => str.trim() ) );
    let jobData={
      jobTitle, jobDescription, skillsRequired, companyName, jobLocation, jobOpenings, lastDate, postedBy
    }
    console.log(jobData);

    firebase.firestore().collection('jobs')
      .add({...jobData})
      .then(({id}) =>{
        console.log("Added job in job");
        const newArr = jobsPosted.concat([id+'']);
        // console.log(newArr);
        firebase.firestore().collection('jobs').doc(id).set({jobId: id}, {merge: true})
          .then(()=>'added id to job')
          .catch((err)=>console.log("error", err));
        firebase.firestore().collection('users').doc(postedBy).set({jobsPosted: newArr}, {merge: true})
          .then(()=> navigation.goBack())
          .catch((err)=> console.log("error", err));
      }).catch((err)=>console.log("error", err));
  }

  let postJomb = () =>{
    navigation.goBack();
  }


  return (
      <View style={styles.container}>

        {/* <View style={styles.errorMessage}>
          {errorMessage && <Text style={styles.error}>{errorMessage}</Text> }
        </View> */}

        <View style={styles.form}>

          <View>
            <Text style={styles.inputTitle}>Job Title</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={title => setJobTitle(title)}
            value={jobTitle}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Description</Text>
            <TextInput
            multiline
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setJobDescription(text)}
            value={jobDescription}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Skills Required <Text>(Separated by comma)</Text></Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => {
              setSkillsRequired(text.split(","))
            }}
            value={skillsRequired.join(",")}
            ></TextInput>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Company Name</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setCompanyName(text)}
            value={companyName}
            ></TextInput>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Job Location</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => {
              setJobLocation(text.split(","))
            }}
            value={jobLocation.join(",")}
            ></TextInput>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Number of Openings</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setJobOpenings(text)}
            value={jobOpenings}
            ></TextInput>
          </View>
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Last Date to Register</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setLastDate(text)}
            value={lastDate}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={()=> postJob()}>
          <Text style={{ color: "#FFF", fontWeight: "500"}}>Post</Text>
        </TouchableOpacity>

      </View>
  )
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
    marginTop: 24,
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
