import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as firebase from 'firebase';
import { Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
require("firebase/firestore");

export default function EditProfileScreen({navigation}) {

  const [errorMessage, setErrorMessage] = useState("");
  const [currentUser, setCurrentUser] = useState();

  const [displayName, setDisplayName] = useState('')
  const [number, setNumber] = useState(""); 
  const [skills, setSkills] = useState(['']);
  const [experience, setExperience] = useState(""); 
  const [address, setAddress] = useState({ country:"", state:"", city:"" });
  const [country, setCountry] = useState(address.country);
  const [state, setState] = useState(address.state);
  const [city, setCity] = useState(address.city);

  const [previousExperience, setPreviousExperience] = useState([
    {post:"",company:"",duration:"",desc:""},
  ]);
  const [education, setEducation] = useState([
    {course:"",major:"",passingYear:"",grade:""}
  ]); 
  const [projects, setProjects] = useState([
      {name:"",workedOn:"",duration: "",desc:""}
  ]);
  const [accomplishments, setAccomplishments] = useState([
      {  accomplishment: "",  issuedBy: "",  duration: "",  desc: ""}
  ]);
  const [socialLinks, setSocialLinks] = useState([
    {name:"Portfolio", link:""},
    {name:"Github", link:""},
    {name:"LinkedIn", link:""}
]);

  useEffect(() => {
    if(currentUser == null){
        setCurrentUser(firebase.auth().currentUser);
        // console.log(currentUser);    
        firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid).get()
          .then(doc => {
            if(doc.data().displayName) setDisplayName(doc.data().displayName);
            if(doc.data().number) setNumber(doc.data().number);
            if(doc.data().experience) setExperience(doc.data().experience);
            if(doc.data().skills) setSkills(doc.data().skills);

            if(doc.data().address) setAddress(doc.data().address);
            if(doc.data().previousExperience) setPreviousExperience(doc.data().previousExperience);
            if(doc.data().education) setEducation(doc.data().education);
            if(doc.data().projects) setProjects(doc.data().projects);
            if(doc.data().accomplishments) setAccomplishments(doc.data().accomplishments);
            if(doc.data().socialLinks) setSocialLinks(doc.data().socialLinks);
          })
    }
  }, [currentUser]);

  let postDetails=()=>{
    let userData={
        displayName, 
        number, 
        skills, 
        experience, 
        address:{country, state, city}, 
        previousExperience, 
        education, 
        projects, 
        accomplishments, 
        socialLinks
    }
    // console.log(userData);

    // console.log(currentUser.uid);
    
    firebase.firestore().collection('users')
        .doc(currentUser.uid)
        .set(userData, {merge: true})
        .then(res => {
            console.log('Inserted');
            console.log(res);
        })
        .catch(err=>{
            console.log("error");
            console.log(err);
        });
  }

  let apostDetails = () =>{
    // navigation.goBack();
    console.log(socialLinks);
  }


  let RenderPreviousExperience=()=>{
    let addInput=()=>{
        setPreviousExperience([
            ...previousExperience,
            {post:"",company:"",duration:"",desc:""}
        ])
    }
    let removeInput=(idx)=>{
        console.log(previousExperience);
        
        let arr = previousExperience;
        console.log(arr);
        arr.splice(idx, 1);
        console.log(arr);
        setPreviousExperience(arr)
        RenderPreviousExperience();
    }
    
    return(
        <View style={{marginTop: 32}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputTitle, {flex: 8}]}>Previous Employments</Text>
                <Icon
                borderRadius='50'
                color='green'
                name='add-circle-outline'
                onPress={()=>addInput()}
                />
            </View>
        {previousExperience.map((item, idx)=>{
            return(
            <View key={idx} style={{flexDirection: 'row-reverse' ,marginTop: 10}}>
                <Icon
                    style={{
                        flex: 3
                    }}
                    borderRadius='50'
                    color='red'
                    // name='remove-circle-outline'
                    onPress={()=>removeInput(idx)}
                />
                <View
                style={{
                    flex: 8
                }}
                >
                <TextInput
                placeholder="Post"
                editable={true}
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = previousExperience;
                    arr[idx].post = title;
                    setPreviousExperience(arr);
                } }
                // value={item.post}
                ></TextInput>
                <TextInput
                placeholder="Company"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = previousExperience;
                    arr[idx].company = title;
                    setPreviousExperience(arr);
                } }
                // value={item.company}
                ></TextInput>
                <TextInput
                placeholder="Duration"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = previousExperience;
                    arr[idx].duration = title;
                    setPreviousExperience(arr);
                } } 
                // value={item.duration}
                ></TextInput>
                <TextInput
                placeholder="Description"
                multiline={true}
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = previousExperience;
                    arr[idx].desc = title;
                    setPreviousExperience(arr);
                } }
                // value={item.desc}
                ></TextInput>
                </View>
            </View>
            )})}
        </View>
    )
  }
  let RenderEducation =()=>{
    let addInput=()=>{
        setEducation([
            ...education,
            {course:"",major:"",passingYear:"",grade:""}
        ])
    }
    let removeInput=(idx)=>{
    }
    
    return(
        <View style={{marginTop: 32}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputTitle, {flex: 8}]}>Education Details</Text>
                <Icon
                borderRadius='50'
                color='green'
                name='add-circle-outline'
                onPress={()=>addInput()}
                />
            </View>
        {education.map((item, idx)=>{
            return(
            <View key={idx} style={{flexDirection: 'row-reverse' ,marginTop: 10}}>
                <Icon
                    style={{
                        flex: 3
                    }}
                    borderRadius='50'
                    color='red'
                    // name='remove-circle-outline'
                    onPress={()=>removeInput(idx)}
                />
                <View
                    style={{
                        flex: 8
                    }}
                >
                <TextInput
                placeholder="Course"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = education;
                    arr[idx].course = title;
                    setEducation(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Major"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = education;
                    arr[idx].major = title;
                    setEducation(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Passing Year"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = education;
                    arr[idx].passingYear = title;
                    setEducation(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Grade"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = education;
                    arr[idx].grade = title;
                    setEducation(arr);
                } }
                ></TextInput>
                </View>
            </View>
        )})}
        </View>
    )
  }

  let RenderProjects =()=>{
    let addInput=()=>{
        setProjects([
            ...projects,
            {name:"",workedOn:"",duration:"",desc:""}
        ])
    }
    let removeInput=(idx)=>{
    }
    
    return(
        <View style={{marginTop: 32}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputTitle, {flex: 8}]}>Your Projects</Text>
                <Icon
                borderRadius='50'
                color='green'
                name='add-circle-outline'
                onPress={()=>addInput()}
                />
            </View>
        {projects.map((item, idx)=>{
            return(
            <View key={idx} style={{flexDirection: 'row-reverse' ,marginTop: 10}}>
                <Icon
                    style={{
                        flex: 3
                    }}
                    borderRadius='50'
                    color='red'
                    // name='remove-circle-outline'
                    onPress={()=>removeInput(idx)}
                />
                <View
                    style={{
                        flex: 8
                    }}
                >
                <TextInput
                placeholder="Name of project"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = projects;
                    arr[idx].name = title;
                    setProjects(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Tools Used"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = projects;
                    arr[idx].workedOn = title;
                    setProjects(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Time Period"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = projects;
                    arr[idx].duration = title;
                    setProjects(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Description"
                multiline
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = projects;
                    arr[idx].desc = title;
                    setProjects(arr);
                } }
                ></TextInput>
                </View>
            </View>
        )})}
        </View>
    )
  }

  let RenderAccomplishments =()=>{
    let addInput=()=>{
        setAccomplishments([
            ...accomplishments,
            {accomplishment:"",issuedBy:"",duration:"",desc:""}
        ])
    }
    let removeInput=(idx)=>{
    }
    
    return(
        <View style={{marginTop: 32}}>
            <View style={{flexDirection: 'row'}}>
                <Text style={[styles.inputTitle, {flex: 8}]}>Accomplishments</Text>
                <Icon
                borderRadius='50'
                color='green'
                name='add-circle-outline'
                onPress={()=>addInput()}
                />
            </View>
        {education.map((item, idx)=>{
            return(
            <View key={idx} style={{flexDirection: 'row-reverse' ,marginTop: 10}}>
                <Icon
                    style={{
                        flex: 3
                    }}
                    borderRadius='50'
                    color='red'
                    // name='remove-circle-outline'
                    onPress={()=>removeInput(idx)}
                />
                <View
                    style={{
                        flex: 8
                    }}
                >
                <TextInput
                placeholder="Accomplishment"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = accomplishments;
                    arr[idx].accomplishment = title;
                    setAccomplishments(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Issued By"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = accomplishments;
                    arr[idx].issuedBy = title;
                    setAccomplishments(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Duration"
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = accomplishments;
                    arr[idx].duration = title;
                    setAccomplishments(arr);
                } }
                ></TextInput>
                <TextInput
                placeholder="Description"
                multiline
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = accomplishments;
                    arr[idx].desc = title;
                    setAccomplishments(arr);
                } }
                ></TextInput>
                </View>
            </View>
        )})}
        </View>
    )
  }

  let RenderSocialLinks =()=>{
    
    return(
        <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Other Links</Text>
        {socialLinks.map((item, idx)=>{
            return(
            <View key={idx} style={{marginTop: 10}}>
                <TextInput
                placeholder={item.name}
                style={styles.input} autoCapitalize="none"
                onChangeText={title => {
                    let arr = socialLinks;
                    arr[idx].link = title;
                    setSocialLinks(arr);
                } }
                ></TextInput>
            </View>
        )})}
        </View>
    )
  }


  return (

      <ScrollView style={styles.container}>

        <View style={styles.form}>
  
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Your Name</Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setDisplayName(text)}
            value={displayName}
            ></TextInput>
          </View>
  
          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Contact Number <Text style={{textTransform: 'none'}}>(With Country Code)</Text></Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => setNumber(text)}
            value={number}
            ></TextInput>
          </View>


          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Your Skills <Text style={{textTransform: 'none'}}>(Separated by comma)</Text></Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={text => {
              setSkills(text.split(","))
            }}
            value={skills.join(",")}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Experience <Text style={{textTransform: 'none'}}>(In years)</Text></Text>
            <TextInput
            style={styles.input} autoCapitalize="none"
            onChangeText={title => setExperience(title)}
            value={experience}
            ></TextInput>
          </View>

          <View style={{marginTop: 32}}>
            <Text style={styles.inputTitle}>Address</Text>
            <TextInput
            placeholder="Country"
            style={styles.input} autoCapitalize="none"
            editable={true}
            onChangeText={title => setCountry(title) }
            value={country}
            ></TextInput>
            <TextInput
            placeholder="State"
            style={styles.input} autoCapitalize="none"
            onChangeText={title => setState(title) }
            value={state}
            ></TextInput>
            <TextInput
            placeholder="City"
            style={styles.input} autoCapitalize="none"
            onChangeText={title => setCity(title) }
            value={city}
            ></TextInput>
          </View>


          <RenderPreviousExperience></RenderPreviousExperience>
          <RenderEducation></RenderEducation>
          <RenderProjects></RenderProjects>
          <RenderAccomplishments></RenderAccomplishments>
          <RenderSocialLinks></RenderSocialLinks>

        </View>





        <TouchableOpacity style={styles.button} onPress={()=> postDetails()}>
          <Text style={{ color: "#FFF", fontWeight: "500"}}>Post</Text>
        </TouchableOpacity>

      </ScrollView>
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
    fontSize:13,
    textTransform: "uppercase"
  },
  input:{
    borderBottomColor: "#8A8F9E",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize: 12,
    color: "#161F3D",
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
