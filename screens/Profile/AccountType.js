import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginVertical: 25,
  },
  column:{
      paddingRight: 40,
      alignItems: "flex-end"
  },
  text: {    
    textTransform: "uppercase",
    fontSize: 18,
    fontWeight: '500',
    color: '#117afb'
  },
  separatorContainer: {
    flexDirection: 'row',
  },
  separatorOffset: {
    flex: 2,
    flexDirection: 'row',
  },
  separator: {
    flex: 8,
    flexDirection: 'row',
    borderColor: '#EDEDED',
    borderWidth: 0.8,
  },

})

const AccountType = ({ accountType }) => (
  <View>
      <View style={styles.row}>
        <View style={styles.column}>
          <Text style={styles.text}>Account Type - {accountType}</Text>
        </View>
      </View>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorOffset} />
        <View style={styles.separator} />
      </View>
  </View>
)

export default AccountType