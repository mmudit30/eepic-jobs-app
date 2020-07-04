import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
require("firebase/firestore");



export default class JobDetailsScreen extends React.Component {
  
    state={
        applyingStatus:'',
        jobId: '',
        jobTitle: '', 
        jobDescription: '', 
        skillsRequired: [''], 
        companyName: '', 
        jobLocation: [''], 
        jobOpenings: '', 
        lastDate: '',
        jobsApplied: ['']
    }

    applyJob=()=>{
        this.setState({ applyingStatus: 'applying' })

        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({ jobsApplied: this.state.jobsApplied }, {merge: true})
            .then(()=> {this.setState({applyingStatus: 'applied'})})
            .catch((err)=> console.log(err,"error"))
    }

    componentDidMount=()=>{
        this.setState({
            ...this.props.navigation.state.params
        })
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
                .then(doc => {
                  if(doc.data().jobsApplied.find(x=> x===this.props.navigation.state.params.jobId)){
                      this.setState({ applyingStatus: 'applied' });
                  }
                  else{
                      this.setState({ jobsApplied: [...doc.data().jobsApplied, this.props.navigation.state.params.jobId] })
                  }
                })
                .catch((err)=> console.log("error", err));
    }

    render(){
        const{
            jobLocation
            ,jobTitle
            ,jobDescription
            ,skillsRequired
            ,companyName
            ,jobOpenings
            ,lastDate
        } = this.state;
        return (
            <ScrollView>
                <View style={styles.container}>
                <Text style={styles.heading}>Job Title</Text>
                <Text style={styles.body}>
                    {jobTitle} 
                </Text>

                <Text style={styles.heading}>Company Name</Text>
                <Text style={styles.body}>
                    {companyName}
                </Text>

                <Text style={styles.heading}>Job Description</Text>
                <Text style={styles.body}>
                    {jobDescription}
                </Text>
                <Text style={styles.heading}>Skills Required: </Text>
                {
                    skillsRequired.map((skill,skillIdx) => (
                    <Text key={skillIdx} style={styles.body}>
                        {skill.trim()}
                    </Text>
                    ))
                }
                <Text style={styles.heading}>Location for Job: </Text>
                {
                    jobLocation.map((location,locationIdx) => (
                    <Text key={locationIdx} style={styles.body}>
                        {location.trim()}
                    </Text>
                    ))
                }

                <Text style={styles.heading}>Number of openings: </Text>
                <Text style={styles.body}>
                    {jobOpenings}
                </Text>
                <Text style={styles.heading}>Last Date to Apply: </Text>
                <Text style={styles.body}>{lastDate}</Text>
                <View style={{
                    marginTop: 12,
                    borderBottomColor: '#01b9b6c3',
                    borderBottomWidth: 0.5,
                    }}
                    />
                </View>
                {
                    this.state.applyingStatus === 'applying' ?
                    <ActivityIndicator size='large'></ActivityIndicator> :

                    <TouchableOpacity 
                        style={
                            this.state.applyingStatus === 'applied' ?
                            styles.disabledButton : styles.button
                        }
                        disabled={
                            this.state.applyingStatus === 'applied' ?
                            true : false
                        }
                        onPress={()=>this.applyJob()}
                        >
                        <Text style={{ color: "#FFF", fontWeight: "500"}}>
                            {
                                this.state.applyingStatus === 'applied' ?
                                'Applied' : 'Apply'
                            }
                        </Text>
                    </TouchableOpacity>
                }

            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    borderRadius: 10,
    marginVertical: 6,
    padding: 30,
    backgroundColor: '#f3f7fa',
  },
  heading:{
    fontSize: 18,
    color: '#01b9b6',
    marginTop: 15
  },
  body:{
    fontSize: 14,
    padding: 5
  },
  button:{
    marginHorizontal: 30,
    marginVertical:30,
    backgroundColor: "#01b9b6",
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  disabledButton:{
    marginHorizontal: 30,
    marginVertical:30,
    backgroundColor: "#999",
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  }

});
