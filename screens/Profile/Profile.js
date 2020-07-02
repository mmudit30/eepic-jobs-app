import React, { Component } from 'react'
import { Icon } from 'react-native-elements'
import {
  Image,
  ImageBackground,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'


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

class Contact extends Component {

  // constructor(props){
  //   super(props);
  //   console.log(props);    
  // }
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
      avatar,
      avatarBackground,
      name,
      address: { city, country },
      fProps
    } = this.props

    // console.log(this.props);
    
    return (
      <View style={styles.headerContainer}>
        <View style={styles.headerBackgroundImage}>
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={
                require('../../assets/mudit.jpg')
              }
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
                  {city}, {country}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    )
  }
    
  renderAccountType = () => {
    const {accountType} = this.props;
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
      tels:{number}, 
      emails:{email} 
    } = this.props;
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
        <View style={styles.container}>
          {/* <Card > */}
            {this.renderHeader()}
            {this.renderAccountType()}
            {this.renderDetails()}
          {/* </Card> */}
        </View>
      </ScrollView>
    )
  }
}

export default Contact