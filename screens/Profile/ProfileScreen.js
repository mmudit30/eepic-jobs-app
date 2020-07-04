import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import { Image, Linking, ScrollView, StyleSheet, Text, View, ActivityIndicator } from 'react-native'

import * as firebase from 'firebase';
require("firebase/firestore");
import AccountType from './AccountType'
import Details from './Details'

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#FFF',
    borderWidth: 0,
    flex: 1,
    margin: 0,
    padding: 0,
  },
  container: {
    flex: 1,
  },
  headerBackgroundImage: {
    paddingBottom: 20,
    paddingTop: 35,
    backgroundColor: '#01b9b622',
    borderBottomEndRadius: 100,    
  },
  headerContainer: {},
  headerColumn: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  userAddressRow: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  userCityRow: {
    backgroundColor: 'transparent',
    justifyContent: "center"
  },
  userCityText: {
    color: '#A5A5A5',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
  },
  userImage: {
    borderColor: '#01b9b6',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
    alignSelf: "center"
  },
  userNameText: {
    color: '#01b9b6',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
})

class ProfileScreen extends Component {
  static navigationOptions = () => ({
    // header: null,
    title: 'Profile',
    headerStyle: { backgroundColor: '#01b9b632' },
    headerTitleStyle: { color: 'white' },
  })

  state={
    uid:                  '',
    photoURL:             'https://www.pngfind.com/pngs/m/470-4703547_icon-user-icon-hd-png-download.png',
    searchStatus:         '',
    accountType:          '',
    email:                '',
    displayName:          '',
    number:               '',
    experience:           '',
    skills:               [''],
    address:              {city:'', country:'', state:''},
    previousExperience:   [
      {post:"",company:"",duration:"",desc:""},
    ],
    education:            [
      {course:"",major:"",passingYear:"",grade:""}
    ],
    projects:             [
      {name:"",workedOn:"",duration: "",desc:""}
    ],
    accomplishments:      [
      {  accomplishment: "",  issuedBy: "",  duration: "",  desc: ""}
    ],
    socialLinks:          [
      {name:"Portfolio", link:""},
      {name:"Github", link:""},
      {name:"LinkedIn", link:""}
    ]
  }
  componentDidMount=()=>{
    console.log(this.props.navigation.state.params);
    
    this.setState({
      uid: this.props.navigation.state.params.propUid,
      searchStatus: 'searching',
    })
    firebase.firestore().collection('users').doc(this.props.navigation.state.params.propUid.trim()).get()
      .then(doc => {
        console.log(doc);
        console.log(doc.data());

        // if(doc.data().photoURL)             this.setState({ photoURL: doc.data().photoURL});
        if(doc.data().email)                this.setState({ email: doc.data().email});
        if(doc.data().accountType)          this.setState({ accountType: doc.data().accountType});
        if(doc.data().displayName)          this.setState({ displayName: doc.data().displayName});
        if(doc.data().number)               this.setState({ number:           doc.data().number});
        if(doc.data().experience)           this.setState({ experience:   doc.data().experience});
        if(doc.data().skills)               this.setState({ skills:           doc.data().skills});
        if(doc.data().address)              this.setState({ address:  doc.data().address});
        if(doc.data().previousExperience)   this.setState({ previousExperience:  doc.data().previousExperience});
        if(doc.data().education)            this.setState({ education:  doc.data().education});
        if(doc.data().projects)             this.setState({ projects:  doc.data().projects});
        if(doc.data().accomplishments)      this.setState({ accomplishments:  doc.data().accomplishments});
        if(doc.data().socialLinks)          this.setState({ socialLinks:  doc.data().socialLinks});
        this.setState({
          searchStatus: 'searched'
        });
      })
      .catch((err)=>{
        console.log('Not found');
        console.log(err);        
        this.setState({searchStatus: 'notfound'})
      })
  }
  
  onPressPlace = () => {
    console.log('place')
  }

  onPressTel = number => {
    Linking.openURL(`tel://${number}`).catch(err => console.log('Error:', err))
  }

  onPressEmail = email => {
    Linking.openURL(`mailto://${email}?subject=subject&body=body`).catch(err =>
      console.log('Error:', err)
    )
  }

  renderHeader = () => {
    const {
      name,
      address: { city, country, state },
    } = this.state;

    // console.log(this.props);
    
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerBackgroundImage}>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={{
                headers: {
                  
                },
                uri: this.state.photoURL
              }}
            />
            <Text style={styles.userNameText}>{name}</Text>
            <View style={styles.userAddressRow}>
              <View>
                <Icon
                  name="place"
                  color='#A5A5A5'
                  onPress={()=>this.onPressPlace}
                />
              </View>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                  {city}, {state}, {country}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
  renderAccountType = () => {
    const {accountType} = this.state;
    return(
      <AccountType
        accountType={accountType}
      />
    )
  }
  renderDetails = ()=>{
    const { 
      projects,
      accomplishments,
      socialLinks,
      education, 
      previousExperience, 
      skills, 
      experience,
      number, 
      email
    } = this.state;
    return(
      <Details
        email={email}
        onPressEmail={this.onPressEmail}
        number={number}
        onPressTel={this.onPressTel}
        experience={experience}
        skills={skills}
        previousExperience={previousExperience}
        education={education}
        projects={projects}
        accomplishments={accomplishments}
        socialLinks={socialLinks}
          />
    )
  }

  render() {
    return (
      <ScrollView style={styles.scroll}>
        {
          this.state.searchStatus == 'searching' &&
          <View style={{alignSelf: "center", marginTop: 32}}>
            <Text style={{fontSize: 12, color: 'blue'}}>Loading Profile..</Text>
            <ActivityIndicator size="large"></ActivityIndicator>
          </View>
        }
        {
          this.state.searchStatus == 'searched' && 
          <View style={styles.container}>
              {this.renderHeader()}
              {this.renderAccountType()}
              {this.renderDetails()}
          </View>
        }
      </ScrollView>
    )
  }
}

export default ProfileScreen