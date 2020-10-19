import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';

import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
require("firebase/firestore");



export default class JobDetailsScreen extends React.Component {
  
    state={
        currentUserUid: '',
        currentUserName: '',
        accountType: '',
        applyingStatus:'',
        jobId: '',
        jobTitle: '', 
        jobDescription: '',
        skillsRequired: [''], 
        companyName: '', 
        jobLocation: [''], 
        jobOpenings: '', 
        lastDate: '',
        salary:'',
        candidates: [],
        jobsApplied: [''],
        jobsPosted: [''],
        candidates: [],
        newCandidate: []
    }

    applyJob=()=>{
        this.setState({ applyingStatus: 'applying' })
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({ jobsApplied: this.state.jobsApplied }, {merge: true})
            .then(()=> {
                firebase.firestore().collection('jobs').doc(this.state.jobId)
                    .set({ 
                        candidates: this.state.newCandidate
                     },{merge: true})
                    .then(()=>{
                        this.setState({applyingStatus: 'applied'})
                    })
            })
            .catch((err)=> console.log(err,"error"))
    }

    deleteJob=()=>{
        console.log('deleted');
        let newArr = this.state.jobsPosted.filter(x=> x != this.state.jobId);
        firebase.firestore().collection('jobs').doc(this.state.jobId)
                .delete()
                .then(()=>{
                    firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                        .set({
                            jobsPosted: newArr
                        }, {merge: true})
                        .then(()=> {this.props.navigation.navigate('Home') })
                        .catch((err)=> {
                            alert('Could not Delete, Try Again !!')
                            console.log(err,"error")
                        })
                })
        
    }

    componentDidMount=()=>{
        this.setState({
            ...this.props.navigation.state.params
        })
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
                .then(doc => {
                    this.setState({ 
                        accountType: doc.data().accountType,
                        // candidates: doc.data().candidates,
                        // newCandidates: [...doc.data().candidates].push([
                        //     {uid: doc.data().uid, displayName: doc.data().displayName}
                        // ])
                     });
                    if(doc.data().accountType === 'employee'){
                      if(doc.data().jobsApplied.find(x=> x===this.props.navigation.state.params.jobId)){
                        this.setState({ applyingStatus: 'applied' });
                      }
                      else{
                        this.setState({ jobsApplied: [...doc.data().jobsApplied, this.props.navigation.state.params.jobId] })
                      }
                    }
                    else{
                        this.setState({ jobsPosted: doc.data().jobsPosted  })

                    }
                    
                })
                .catch((err)=> console.log("error", err));
            // console.log(this.props.navigation.state.params.candidates);  
            console.log(this.props.navigation.state.params);  
    }

    render(){
        const{
            jobLocation
            ,salary
            ,jobTitle
            ,jobDescription
            ,skillsRequired
            ,companyName
            ,jobOpenings
            ,lastDate
            ,candidates
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
                <Text style={styles.heading}>Monthly Salary: </Text>
                <Text style={styles.body}>
                    {salary}
                </Text>
                <Text style={styles.heading}>Number of openings: </Text>
                <Text style={styles.body}>
                    {jobOpenings}
                </Text>
                <Text style={styles.heading}>Last Date to Apply: </Text>
                <Text style={styles.body}>{lastDate}</Text>
                <Text style={styles.heading}>Number of candidates till now: </Text>
                <Text style={styles.body}>{candidates.length}</Text>
                {
                    this.state.accountType === 'employer' &&
                    candidates.length>0 && candidates.map(( candidateItem, candidateIdx ) => (
                        <Text key={candidateIdx} style={styles.body}
                        onPress={()=>this.props.navigation.push("Profile", {propUid: candidateItem.uid})}
                        >
                            {candidateItem.displayName}
                        </Text>
                    ))

                }
                <View style={{
                    marginTop: 13,
                    borderBottomColor: '#01b9b6c3',
                    borderBottomWidth: 0.6,
                    }}
                    />
                </View>

                    {
                        this.state.accountType === 'employer' ?

                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={()=>this.deleteJob()}
                            >
                            <Text style={{ color: "#FFF", fontWeight: "500"}}>
                                Delete
                            </Text>
                        </TouchableOpacity>
                        
                        :

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
  },
  deleteButton:{
    marginHorizontal: 30,
    marginVertical:30,
    backgroundColor: "#e94e40",
    borderRadius: 10,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },

});
