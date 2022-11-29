import LottieView from 'lottie-react-native'
import React from 'react'
import { StyleProp, StyleSheet, ViewStyle } from 'react-native'

interface IProps {
  style?: StyleProp<ViewStyle>
}

const Warning: React.FC<IProps> = ({ style }) => {
  return (
    <LottieView
      source={require('../../lottie/warning.json')}
      autoPlay
      style={[styles.view, style]}
      loop={false}
    />
  )
}

const styles = StyleSheet.create({
  view: {
    width: 40,
    height: 40
  }
})

export default Warning
