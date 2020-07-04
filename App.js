import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegisterScreen from './screens/RegisterScreen';

import * as firebase from 'firebase';
import SetAccountTypeScreen from './screens/SetAccountTypeScreen';
import JobListScreen from './screens/Employee/JobListScreen';
import PostJobScreen from './screens/Employer/PostJobScreen';
import ProfileScreen from './screens/Profile/ProfileScreen';
import EditProfileScreen from './screens/EditProfileScreen';
import JobDetailsScreen from './screens/JobDetailsScreen';

import {decode, encode} from 'base-64';
require("firebase/firestore");

if (!global.btoa) {  global.btoa = encode }

if (!global.atob) { global.atob = decode }

var firebaseConfig = {
  apiKey: "AIzaSyC1QQtou2Wb4gytHp7-iltxbPRrkpBUyck",
  authDomain: "epic-jobs.firebaseapp.com",
  databaseURL: "https://epic-jobs.firebaseio.com",
  projectId: "epic-jobs",
  storageBucket: "epic-jobs.appspot.com",
  messagingSenderId: "540226969010",
  appId: "1:540226969010:web:0e8e6fc3270db366b758ab",
  measurementId: "G-2CLPP7675F"
};
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const AppStack = createStackNavigator({
  Home: HomeScreen,
  JobList: JobListScreen,
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
















