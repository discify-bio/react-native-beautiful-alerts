import { BlurView } from '@react-native-community/blur'
import React, { useMemo } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'
import { theme } from '../constants/theme'
import { ButtonStyle, Props, ProviderProps } from '../types'

const ButtonsAlert: React.FC<Props & ProviderProps> = ({ title, description, buttonClick, buttons, style, onLayout, fonts, meta }) => {
  const blurViewStyle = useMemo((): ViewStyle => ({
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    top: 0
  }), [])

  const containerStyle = useMemo(() => [
    styles.container,
    {
      backgroundColor: meta.backgroundColor || styles.container.backgroundColor
    }
  ], [meta.backgroundColor])

  const titleStyle = useMemo(() => [
    styles.title,
    {
      fontFamily: fonts.bold,
      fontSize: meta.titleFontSize || styles.title.fontSize,
      color: meta.defaultColor || styles.title.color
    }
  ], [fonts.bold, meta.defaultColor, meta.titleFontSize])

  const descriptionStyle = useMemo(() => [
    styles.description,
    {
      fontFamily: fonts.regular,
      color: meta.defaultColor || styles.description.color,
      fontSize: meta.descriptionFontSize || styles.description.fontSize
    }
  ], [fonts.regular, meta.defaultColor, meta.descriptionFontSize])

  return (
    <Animated.View
      style={[
        styles.alert,
        style
      ]}
      onLayout={onLayout}
    >
      <View style={{ width: '100%' }}>
        <BlurView
          blurRadius={25}
          style={blurViewStyle}
        />
        <View
          style={containerStyle}
        >
          <View
            style={styles.wrapper}
          >
            <Text style={titleStyle}>
              {title}
            </Text>
            {description && (
              <Text style={descriptionStyle}>
                {description}
              </Text>
            )}
          </View>
          {buttons.length > 0 && (
            <View
              style={[styles.buttonsContainer, styles.borderTop]}
            >
              {buttons.map((button, i) => (
                <ButtonItem 
                  key={i}
                  button={button} 
                  buttonClick={buttonClick}
                  index={i}
                  totalButtons={buttons.length}
                  fonts={fonts}
                  meta={meta}
                />
              ))}
            </View>
          )}
        </View>
      </View>
    </Animated.View>
  )
}

interface ButtonItemProps {
  button: {
    text: string
    style: ButtonStyle
    onPress?: () => any
  }
  buttonClick: (callback?: () => any) => any
  index: number
  totalButtons: number
  fonts: {
    semiBold: string
    regular: string
    bold: string
    extraBold: string
  }
  meta: {
    backgroundColor?: string
    dangerColor?: string
    defaultColor?: string
    buttonFontSize?: number
    titleFontSize?: number
    descriptionFontSize?: number
  }
}

const ButtonItem = React.memo(({ button, buttonClick, index, totalButtons, fonts, meta }: ButtonItemProps) => {
  const buttonStyle = useMemo(() => [
    styles.button, 
    totalButtons === 2 && styles.buttonBetween,
    index === 0 && styles.buttonFirst,
    totalButtons > 2 && index > 0 && styles.borderTop
  ], [index, totalButtons])

  const textStyle = useMemo(() => [
    styles.buttonText,
    {
      fontFamily: fonts.semiBold,
      fontSize: meta.buttonFontSize || styles.buttonText.fontSize,
      color: meta.defaultColor || styles.buttonText.color
    },
    (button.style === ButtonStyle.Bold || button.style === ButtonStyle.Cancel || button.style === ButtonStyle.Danger) && {
      fontFamily: fonts.extraBold
    },
    button.style === ButtonStyle.Danger && {
      ...styles.buttonTextDanger,
      color: meta.dangerColor || styles.buttonTextDanger.color
    }
  ], [button.style, fonts.extraBold, fonts.semiBold, meta.buttonFontSize, meta.dangerColor, meta.defaultColor])

  return (
    <TouchableOpacity
      onPress={() => buttonClick(button.onPress)}
      style={buttonStyle}
      activeOpacity={0.6}
    >
      <Text style={textStyle}>
        {button.text}
      </Text>
    </TouchableOpacity>
  )
})

const styles = StyleSheet.create({
  alert: {
    borderRadius: 14,
    overflow: 'hidden'
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(49, 48, 55, 0.5)'
  },
  wrapper: {
    padding: 20,
    display: 'flex',
    alignItems: 'center'
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
  },
  borderTop: {
    borderTopColor: theme.colors.border,
    borderTopWidth: 0.5,
  },
  buttonsContainer: {
    marginTop: 0,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    width: '100%'
  },
  buttonsBetween: {
    flexDirection: 'row'
  },
  buttonText: {
    fontSize: 17,
    color: theme.colors.white,
    textAlign: 'center'
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    width: '100%'
  },
  buttonBetween: {
    width: '50%',
  },
  buttonTextDanger: {
    color: theme.colors.red
  },
  buttonFirst: {
    borderRightColor: theme.colors.border,
    borderRightWidth: 0.5,
  }
})

export default React.memo(ButtonsAlert)
