import { BlurView } from '@react-native-community/blur'
import React from 'react'

import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native'
import Error from '../animations/Error'
import Success from '../animations/Success'
import Warning from '../animations/Warning'
import { theme } from '../constants/theme'
import { AlertType, DefaultProps, ProviderProps } from '../types'

const width = Dimensions.get('window').width
const padding = width * 10 / 100

const DefaultAlert: React.FC<DefaultProps & ProviderProps> = ({ height, title, description, style, onLayout, type, fonts, meta }) => {
  const getIcon = () => {
    switch (type) {
      case AlertType.Success:
        return <Success/>
      case AlertType.Error:
        return <Error/>
      case AlertType.Warning:
        return <Warning/>
      default:
        return null
    }
  }

  return (
    <Animated.View
      style={[
        {
          ...styles.alert,
          top: (Dimensions.get('window').height / 2) - (height / 2),
        },
        style
      ]}
      onLayout={onLayout}
      pointerEvents='none'
    >
      <BlurView
        blurRadius={25}
        style={[
          styles.container,
          {
            backgroundColor: meta.backgroundColor || styles.container.backgroundColor
          }
        ]}
      >
        <View
          style={styles.wrapper}
        >
          {getIcon()}
          <Text
            style={[
              styles.title,
              {
                fontFamily: fonts.bold || undefined,
                color: meta.defaultColor || styles.title.color,
                fontSize: styles.title.fontSize || meta.titleFontSize
              }
            ]}
          >
            {title}
          </Text>
          {description && (
            <Text
              style={[
                styles.description,
                {
                  fontFamily: fonts.regular || undefined,
                  color: meta.defaultColor || styles.description.color,
                  fontSize: styles.description.fontSize || meta.descriptionFontSize
                }
              ]}
            >
              {description}
            </Text>
          )}
        </View>
      </BlurView>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    width: width - (padding * 2),
    left: padding,
    top: Dimensions.get('window').height / 2,
    borderRadius: 14,
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(49, 48, 55, 0.5)',
  },
  wrapper: {
    padding: 20,
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    backgroundColor: 'transparent'
  },
  title: {
    fontSize: 18,
    color: theme.colors.white,
    marginTop: 5,
    lineHeight: 24,
    textAlign: 'center'
  },
  description: {
    fontSize: 16,
    color: theme.colors.white,
    lineHeight: 20,
    marginTop: 5,
    textAlign: 'center'
  }
})

export default DefaultAlert
