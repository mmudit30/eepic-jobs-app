import React from 'react'

import contactData from '../../mocks/contact.json'

import Profile from './Profile'

const ProfileScreen = () => <Profile {...contactData} />

ProfileScreen.navigationOptions = () => ({
  // header: null,
  title: 'Profile',
  headerStyle: { backgroundColor: '#01b9b632' },
  headerTitleStyle: { color: 'white' },
})

export default ProfileScreen