import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';
import SetAccountTypeScreen from './screens/SetAccountTypeScreen';

import JobListScreen from './screens/Employee/JobListScreen';
import JobsAppliedScreen from './screens/Employee/JobsAppliedScreen';

import PostJobScreen from './screens/Employer/PostJobScreen';
import JobsPostedScreen from './screens/Employer/JobsPostedScreen';

import ProfileScreen from './screens/Profile/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';

import {decode, encode} from 'base-64';
require("firebase/firestore");

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

var firebaseConfig = {
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const AppStack = createStackNavigator({
  Home: HomeScreen,
  JobList: JobListScreen,
  JobsApplied: JobsAppliedScreen,
  JobsPosted: JobsPostedScreen,
  JobDetails: JobDetailsScreen,
  EditProfile: EditProfileScreen,
  PostJob: PostJobScreen,
  Profile: ProfileScreen,
  SetAccountType: SetAccountTypeScreen,
})

const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "Loading",
    }
  )
)
















