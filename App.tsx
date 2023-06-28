import { Text, View } from 'react-native'
import React, { Component } from 'react'
import FifteenDayCalendar from './src/Homescreen'

export class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <FifteenDayCalendar/>
      </View>
    )
  }
}

export default App