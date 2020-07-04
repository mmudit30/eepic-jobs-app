import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import * as firebase from 'firebase';
import { ScrollView, FlatList, TouchableOpacity } from 'react-native-gesture-handler';
require("firebase/firestore");
import {Ionicons} from '@expo/vector-icons';

export default class JobsPostedScreen extends React.Component  {
state={
      searchStatus: '',
      jobsPosted: [''],
      jobs:[{
        jobId: '',
        jobTitle: '', 
        jobDescription: '', 
        skillsRequired: [''], 
        companyName: '', 
        jobLocation: [''], 
        jobOpenings: '', 
        lastDate: '',
      }]
  }

  
componentDidMount() {
    // console.log("hi1");
    this.setState({ searchStatus: 'searching' });
        firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .get().then((userData)=>{
                let arrJobsPosted=[];
                arrJobsPosted = userData.data().jobsPosted;
                if(arrJobsPosted.length != 0){
                    let JobDataArr=[];
                    arrJobsPosted.forEach(JobID =>{
                        firebase.firestore().collection('jobs').doc(JobID).get()
                            .then((jobData)=>{
                                JobDataArr.push(jobData.data());
                                // setJobs(JobDataArr);
                            }).then(()=>{
                                if(JobDataArr.length == arrJobsPosted.length){
                                    this.setState({ jobs: JobDataArr, searchStatus: 'searched' })

                                }
                            })              
                    })
                }
                else{
                  this.setState({ searchStatus: 'empty' })                }
            })
            .catch((err)=>console.log("error", err));    
  }

  render(){

    return (
      <View style={styles.container}>

        <Text style={{color: 'rgb(0,100,200)',fontSize: 18, alignSelf: "center", textTransform: "uppercase"}} onPress={()=> props.navigation.goBack()}>Posted Jobs</Text>
        {
          this.state.searchStatus == 'searching' &&
          <View style={{alignSelf: "center", marginTop: 32}}>
            {/* <Text style={{fontSize: 12, color: 'blue'}}>Loading Jobs..</Text> */}
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        }
        {
          this.state.searchStatus == 'empty' &&
          <View>
            <Text style={{
              marginTop: 30,
              alignSelf: "center",
              fontSize: 14,
              color: '#e94e40'
            }}>
              You have not posted any job.
            </Text>
          </View>
        }


        <ScrollView style={{paddingVertical:12}} showsHorizontalScrollIndicator={false}>
        { this.state.jobs.length!=0 && this.state.jobs.map((item, idx)=>
            item.jobId != '' && 
            <View key={idx} style={styles.item} >
              <Text style={{fontSize: 16, color: '#01b9b6'}}>
                {item.jobTitle} 
              </Text>
              <Text style={{fontSize: 14, marginTop: 4}}>
                {item.companyName}
              </Text>
              <Text style={{fontSize: 12, marginTop: 4}}>
                {/* Description <br/> */}
                {item.jobDescription}
              </Text>
              <ScrollView style={{marginTop: 6}} horizontal={true} showsHorizontalScrollIndicator={false}>
                {
                  item.skillsRequired.map((skill,skillIdx) => (
                    <Text key={skillIdx} style={{fontSize:12, paddingHorizontal:12, paddingVertical:4, borderRadius:20, backgroundColor:'#01b9b6d9', color:'#fff', marginRight: 6}}>
                      {skill.trim()}
                    </Text>
                  ))
                }
              </ScrollView>
              <View></View>
              <Text style={{fontSize:12, marginTop: 4}}>Number of openings : {item.jobOpenings}</Text>
              <Text style={{fontSize:12, marginTop: 4}}>Apply last by : {item.lastDate}</Text>
              <View
                style={{
                  marginTop: 12,
                  borderBottomColor: '#01b9b6c3',
                  borderBottomWidth: 0.5,
                }}
              />
              <TouchableOpacity>
                <Ionicons
                onPress={()=>{this.props.navigation.push("JobDetails", item)}}
                style={{marginTop: 4, alignSelf:"center"}}
                name="ios-arrow-forward" size={24} color="#01b9b6"
                >
                </Ionicons>
              </TouchableOpacity>

            </View>


            
          )
        }
        </ScrollView>

      </View>
    )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    paddingBottom: 20,
    marginHorizontal: 20
  },
  item:{
    borderRadius: 10,
    marginVertical: 6,
    padding: 30,
    backgroundColor: '#f3f7fa',
    borderBottomColor: '#01b9b6',
    borderBottomWidth: 4
  }
});
