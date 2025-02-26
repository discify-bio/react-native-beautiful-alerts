import React, { MutableRefObject, PropsWithChildren, useEffect, useRef, useState } from 'react'
import { Animated, LayoutChangeEvent } from 'react-native'
import { Host, Portal } from 'react-native-portalize'
import ButtonsAlert from './components/ButtonsAlert'
import DefaultAlert from './components/DefaultAlert'
import { theme } from './constants/theme'
import Context from './Context'
import { AlertController, AlertMethods, AlertProps, AlertType, AlertWithButtonProps, ButtonStyle, AlertButton, ProviderProps } from './types'

const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({ children, fonts, meta }) => {
  const opacity = useRef(new Animated.Value(0)).current
  const [height, setHeight] = useState(0)

  const [isOpen, setIsOpen] = useState(false)

  const [title, setTitle] = useState<string | null>(null)
  const [description, setDescription] = useState<string | null>(null)
  const [type, setType] = useState<AlertType>(AlertType.None)
  const [buttons, setButtons] = useState<AlertButton[]>([])
  const ref = useRef<AlertMethods>(null) as MutableRefObject<AlertMethods>
  useEffect(() => {
    ref.current = {
      message,
      success,
      error,
      warning
    }
  }, [])

  const show = ({ title, description, type, buttons }: AlertController) => {
    setTitle(title)
    setDescription(description || null)
    setType(type ?? AlertType.Regular)

    if (buttons) {
      const cancelButtonOnList = buttons.find(button => button.style === ButtonStyle.Cancel)
      if (!cancelButtonOnList) return setButtons(buttons)

      const filteredButtons = buttons.filter(button => button.style !== ButtonStyle.Cancel)
      if (buttons.length > 2) {
        filteredButtons.push(cancelButtonOnList)
      } else {
        filteredButtons.unshift(cancelButtonOnList)
      }
      
      setButtons(filteredButtons)
    } else {
      setButtons([{ text: 'OK', style: ButtonStyle.Bold }])
    }
  }

  const start = ({ nativeEvent: { layout: { height } } }: LayoutChangeEvent) => {
    if (height === 0) return

    setHeight(() => {
      setIsOpen(true)
      Animated.sequence([
        Animated.timing(opacity, {
          useNativeDriver: true,
          toValue: 1,
          duration: 350,
          delay: 100
        }),
        type !== AlertType.Message ? 
        Animated.timing(opacity, {
          useNativeDriver: true,
          toValue: 0,
          duration: 350,
          delay: 2500
        }) : undefined as any
      ].filter(r => r)).start(() => type !== AlertType.Message && clearState())
      return height
    })
  }

  const success = (props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Success
    })
  }

  const error = (props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Error
    })
  }

  const warning = (props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Warning
    })
  }

  const message = (props: AlertWithButtonProps) => {
    show({
      ...props,
      type: AlertType.Message
    })
  }

  const buttonClick = (callback?: () => any) => {
    if (callback) callback()
    Animated.timing(opacity, {
      useNativeDriver: true,
      toValue: 0,
      duration: 200
    }).start(clearState)
  }

  const clearState = () => {
    setIsOpen(false)
    setHeight(0)
    setType(AlertType.None)
  }

  return (
    <Context.Provider
      value={ref}
    >
      <Host>
        <Portal>
          {type === AlertType.None ? null
          : type === AlertType.Message ? (
            <>
              <ButtonsAlert
                height={height}
                title={title}
                description={description}
                buttons={buttons}
                buttonClick={buttonClick}
                style={{
                  opacity: 0,
                  top: 10000,
                  left: 10000
                }}
                onLayout={start}
                fonts={fonts}
                meta={meta}
              />
              {isOpen && (
                <Animated.View
                  style={{
                    backgroundColor: theme.colors.backgroundModal,
                    flex: 1,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 99999,
                    opacity
                  }}
                >
                  <ButtonsAlert
                    height={height}
                    title={title}
                    description={description}
                    buttons={buttons}
                    buttonClick={buttonClick}
                    fonts={fonts}
                    meta={meta}
                  />
                </Animated.View>
              )}
            </>
          ) : (
            <>
              <DefaultAlert
                height={height}
                title={title}
                description={description}
                onLayout={start}
                style={{
                  opacity: 0,
                  top: 10000,
                  left: 10000
                }}
                fonts={fonts}
                meta={meta}
              />
              {isOpen && (
                <DefaultAlert
                  height={height}
                  title={title}
                  description={description}
                  type={type}
                  style={{
                    opacity: opacity as any
                  }}
                  fonts={fonts}
                  meta={meta}
                />
              )}
            </>
          )}
        </Portal>
        {children}
      </Host>
    </Context.Provider>
  )
}

export default Provider
