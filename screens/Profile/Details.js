import React from 'react'
import { StyleSheet, Text, ScrollView , View } from 'react-native'
import { Icon } from 'react-native-elements'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 20,
  },
  iconRow: {
    flex: 2,
    justifyContent: 'center',
  },
  Column: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 5,
  },
  Text: {
    fontSize: 16,
  },
  Row: {
    flex: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingRight: 5
  },
  ColumnList: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginBottom: 8,
  },
  TextListHead: {
    fontSize: 15,
    color: '#666',
    marginBottom: 5,
    textTransform: "uppercase"
  },
  TextList: {
    fontSize: 14,
    marginBottom: 4
  },

})

const Tel = ({
  email,
  onPressEmail,
  number,
  onPressTel,
  experience,
  skills,
  previousExperience,
  education,
  projects,
  accomplishments,
  socialLinks,
}) => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
              name="call"
              color='#01b9b6'
              onPress={() => onPressTel()}
            />
        </View>
        <View style={styles.Row}>
          <View style={styles.Column}>
            <Text style={styles.Text}>{number}</Text>
          </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="email"
                underlayColor="transparent"
                color='#01b9b6'
                onPress={() => onPressEmail()}
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
            <Text style={styles.Text}>{email}</Text>
            </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
            <Text style={styles.Text}>Experience - {experience} years</Text>
            </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
            <Text style={styles.Text}>Skills - {skills.join(', ')}</Text>
            </View>
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
                <Text style={styles.Text}>Previous Experience:</Text>
            </View>
            {
                previousExperience.map((item, idx)=>{
                    // console.log(item);  
                    return(
                    <View key={idx} style={styles.ColumnList}>
                        <Text style={styles.TextListHead}>{item.post}</Text>
                        <Text style={styles.TextList}>{item.company}</Text>
                        <Text style={styles.TextList}>{item.duration}</Text>
                        <Text style={styles.TextList}>{item.desc}</Text>
                    </View>
                    )
                })
            }
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
                <Text style={styles.Text}>Education:</Text>
            </View>
            {
                education.map((item, idx)=>{
                    // console.log(item);  
                    return(
                        <View key={idx} style={styles.ColumnList}>
                            <Text style={styles.TextListHead}>{item.course}</Text>
                            <Text style={styles.TextList}>{item.major}</Text>
                            <Text style={styles.TextList}>{item.passingYear}</Text>
                            <Text style={styles.TextList}>{item.grade}</Text>
                        </View>
                    )}
                )
            }
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
                <Text style={styles.Text}>Projects:</Text>
            </View>
            {
                projects.map((item, idx)=>{
                    return(
                        <View key={idx} style={styles.ColumnList}>
                            <Text style={styles.TextListHead}>{item.name}</Text>
                            <Text style={styles.TextList}>{item.workedOn}</Text>
                            <Text style={styles.TextList}>{item.duration}</Text>
                            <Text style={styles.TextList}>{item.desc}</Text>
                        </View>
                    )}
                )
            }
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
                <Text style={styles.Text}>Accomplishments:</Text>
            </View>
            {
                accomplishments.map((item, idx)=>{
                    return(
                        <View key={idx} style={styles.ColumnList}>
                            <Text style={styles.TextListHead}>{item.accomplishment}</Text>
                            <Text style={styles.TextList}>{item.issuedBy}</Text>
                            <Text style={styles.TextList}>{item.duration}</Text>
                            <Text style={styles.TextList}>{item.desc}</Text>
                        </View>
                    )}
                )
            }
        </View>
      </View>

      <View style={styles.container}>
        <View style={styles.iconRow}>
            <Icon
                name="control-point-duplicate"
                underlayColor="transparent"
                color='#01b9b6'
            />
        </View>
        <View style={styles.Row}>
            <View style={styles.Column}>
                <Text style={styles.Text}>Social media Links:</Text>
            </View>
            {
                socialLinks.map((item, idx)=>{
                    return(
                        <View key={idx} style={styles.ColumnList}>
                            <Text style={styles.TextListHead}>{item.name}</Text>
                            <Text style={styles.TextList}>{item.link}</Text>
                        </View>
                    )}
                )
            }
        </View>
      </View>


    </ScrollView>
  )
}

export default Tel