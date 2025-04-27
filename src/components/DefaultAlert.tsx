import { BlurView } from '@react-native-community/blur'
import React, { useMemo } from 'react'

import { Dimensions, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import Error from '../animations/Error'
import Success from '../animations/Success'
import Warning from '../animations/Warning'
import { theme } from '../constants/theme'
import { AlertType, DefaultProps, ProviderProps } from '../types'

const width = Dimensions.get('window').width
const padding = width * 10 / 100

const DefaultAlert: React.FC<DefaultProps & ProviderProps> = ({ title, description, style, onLayout, type, fonts, meta }) => {
  const getIcon = useMemo(() => {
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
  }, [type])

  const titleStyle = useMemo(() => [
    styles.title,
    {
      fontFamily: fonts.bold || undefined,
      color: meta.defaultColor || styles.title.color,
      fontSize: styles.title.fontSize || meta.titleFontSize
    }
  ], [fonts.bold, meta.defaultColor, meta.titleFontSize])

  const descriptionStyle = useMemo(() => [
    styles.description,
    {
      fontFamily: fonts.regular || undefined,
      color: meta.defaultColor || styles.description.color,
      fontSize: styles.description.fontSize || meta.descriptionFontSize
    }
  ], [fonts.regular, meta.defaultColor, meta.descriptionFontSize])

  const blurViewStyle = useMemo((): ViewStyle => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    backgroundColor: meta.backgroundColor || styles.container.backgroundColor
  }), [meta.backgroundColor])

  return (
    <Animated.View
      style={[
        styles.alert,
        style
      ]}
      onLayout={onLayout}
      pointerEvents='none'
    >
      <View
        style={styles.container}
      >
        <BlurView
          blurRadius={25}
          style={blurViewStyle}
        />
        <View
          style={styles.wrapper}
        >
          {getIcon}
          <Text style={titleStyle}>
            {title}
          </Text>
          {description && (
            <Text style={descriptionStyle}>
              {description}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  alert: {
    position: 'absolute',
    width: width - (padding * 2),
    left: padding,
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
    backgroundColor: 'transparent',
    zIndex: 2
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

export default React.memo(DefaultAlert)
