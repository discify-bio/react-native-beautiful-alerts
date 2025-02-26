import { BlurView } from '@react-native-community/blur'
import React from 'react'
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../constants/theme'
import { ButtonStyle, Props, ProviderProps } from '../types'

const width = Dimensions.get('window').width
const padding = width * 10 / 100

const ButtonsAlert: React.FC<Props & ProviderProps> = ({ height, title, description, buttonClick, buttons, style, onLayout, fonts, meta }) => {
  return (
    <View
      style={[
        {
          ...styles.alert,
          top: (Dimensions.get('window').height / 2) - (height / 2)
        },
        style
      ]}
      onLayout={onLayout}
    >
      <BlurView
        blurRadius={25}
      >
        <View
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
            <Text
              style={[
                styles.title,
                {
                  fontFamily: fonts.bold,
                  fontSize: meta.titleFontSize || styles.title.fontSize,
                  color: meta.defaultColor || styles.title.color
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
                    fontFamily: fonts.regular,
                    color: meta.defaultColor || styles.description.color,
                    fontSize: meta.descriptionFontSize || styles.description.fontSize
                  }
                ]}
              >
                {description}
              </Text>
            )}
          </View>
          {buttons.length > 0 && (
            <View
              style={[styles.buttonsContainer, styles.borderTop]}
            >
              {buttons.map((button, i) => (
                <TouchableOpacity
                  onPress={() => buttonClick(button.onPress)}
                  key={i}
                  style={[
                    styles.button, buttons.length === 2 && styles.buttonBetween,
                    i === 0 && styles.buttonFirst,
                    buttons.length > 2 && i > 0 && styles.borderTop
                    ]}
                    activeOpacity={0.6}
                >
                  <Text
                    style={[
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
                    ]}
                  >
                    {button.text}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </BlurView>
    </View>
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

export default ButtonsAlert
