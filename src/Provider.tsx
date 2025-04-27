import React, { PropsWithChildren, useRef, useState, useCallback, useMemo } from 'react'
import { Dimensions, LayoutChangeEvent } from 'react-native'
import { Host, Portal } from 'react-native-portalize'
import Animated, { Easing, runOnJS, useAnimatedStyle, useSharedValue, withDelay, withSequence, withTiming } from 'react-native-reanimated'
import ButtonsAlert from './components/ButtonsAlert'
import DefaultAlert from './components/DefaultAlert'
import { theme } from './constants/theme'
import Context from './Context'
import { AlertController, AlertMethods, AlertProps, AlertType, AlertWithButtonProps, ButtonStyle, AlertButton, ProviderProps } from './types'

const Provider: React.FC<PropsWithChildren<ProviderProps>> = ({ children, fonts, meta }) => {
  const opacity = useSharedValue(0)

  const [height, setHeight] = useState(0)
  const [isOpen, setIsOpen] = useState(false)
  const [alertState, setAlertState] = useState<{
    title: string | null
    description: string | null
    type: AlertType
    buttons: AlertButton[]
  }>({
    title: null,
    description: null,
    type: AlertType.None,
    buttons: []
  })
  
  const { title, description, type, buttons } = alertState
  
  const alertShowingRef = useRef(false)
  
  const clearState = useCallback(() => {
    setIsOpen(false)
    setHeight(0)
    setAlertState(prev => ({
      ...prev,
      type: AlertType.None
    }))

    alertShowingRef.current = false
  }, [])

  const processButtons = useCallback((buttons: AlertButton[] | undefined) => {
    if (!buttons || buttons.length === 0) {
      return [{ text: 'OK', style: ButtonStyle.Bold }]
    }
    
    const cancelButtonOnList = buttons.find(button => button.style === ButtonStyle.Cancel)
    if (!cancelButtonOnList) {
      return buttons
    }
    
    const filteredButtons = buttons.filter(button => button.style !== ButtonStyle.Cancel)
    if (buttons.length > 2) {
      filteredButtons.push(cancelButtonOnList)
    } else {
      filteredButtons.unshift(cancelButtonOnList)
    }
    
    return filteredButtons
  }, [])
  
  const setNewAlert = useCallback((alertData: AlertController) => {
    const { title, description, type, buttons } = alertData
    const processedButtons = processButtons(buttons)
    
    setAlertState({
      title,
      description: description || null,
      type: type ?? AlertType.Regular,
      buttons: processedButtons
    })

    setIsOpen(true)
    alertShowingRef.current = true
    animateIn(type ?? AlertType.Regular)
  }, [processButtons])

  const show = useCallback(({ title, description, type, buttons }: AlertController) => {
    if (alertShowingRef.current) {
      opacity.value = withTiming(0, {
        duration: 100,
        easing: Easing.out(Easing.ease)
      }, () => {
        runOnJS(setNewAlert)({ title, description, type, buttons })
      })
    } else {
      setNewAlert({ title, description, type, buttons })
    }
  }, [opacity, setNewAlert])

  const handleLayout = useCallback(({ nativeEvent: { layout: { height: layoutHeight } } }: LayoutChangeEvent) => {
    if (!layoutHeight) return
    setHeight(layoutHeight)
  }, [])
  
  const animateIn = useCallback((alertType: AlertType) => {
    if (alertType === AlertType.Message) {
      opacity.value = withTiming(1, { duration: 350, easing: Easing.out(Easing.ease) })
    } else {
      opacity.value = withSequence(
        withTiming(1, { duration: 350 }),
        withDelay(2500, withTiming(0, { duration: 350 }, () => runOnJS(clearState)()))
      )
    }
  }, [clearState, opacity])

  const success = useCallback((props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Success
    })
  }, [show])

  const error = useCallback((props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Error
    })
  }, [show])

  const warning = useCallback((props: AlertProps) => {
    show({
      ...props,
      type: AlertType.Warning
    })
  }, [show])

  const message = useCallback((props: AlertWithButtonProps) => {
    show({
      ...props,
      type: AlertType.Message
    })
  }, [show])
  
  const buttonClick = useCallback((callback?: () => any) => {
    if (callback) callback()
    
    opacity.value = withTiming(0, {
      duration: 200,
      easing: Easing.out(Easing.ease)
    }, () => runOnJS(clearState)())
  }, [clearState, opacity])
  
  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  }, [opacity])

  const alertMethods = useMemo(() => ({
    message,
    success,
    error,
    warning
  }), [message, success, error, warning])
  
  const ref = useRef<AlertMethods>(alertMethods)
  
  React.useEffect(() => {
    ref.current = alertMethods
  }, [alertMethods])

  const windowHeight = useMemo(() => Dimensions.get('window').height, [])
  const windowWidth = useMemo(() => Dimensions.get('window').width, [])
  const paddingHorizontal = useMemo(() => (windowWidth * 10) / 100, [windowWidth])
  
  const positionStyle = useMemo(() => 
    height ? { top: (windowHeight / 2) - (height / 2) } : {}, 
    [height, windowHeight]
  )
  
  const messageAlertStyle = useMemo(() => ({
    position: 'absolute' as const,
    left: paddingHorizontal,
    width: windowWidth - (paddingHorizontal * 2),
    top: height ? (windowHeight / 2) - (height / 2) : windowHeight / 2
  }), [height, windowHeight, windowWidth, paddingHorizontal])

  const shouldRenderAlert = type !== AlertType.None && isOpen
  
  return (
    <Context.Provider value={ref}>
      <Host>
        <Portal>
          {shouldRenderAlert && (
            type === AlertType.Message ? (
              <Animated.View
                style={[{
                  backgroundColor: theme.colors.backgroundModal,
                  flex: 1,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 99999
                }, animatedStyle]}
              >
                <ButtonsAlert
                  title={title}
                  description={description}
                  buttons={buttons}
                  buttonClick={buttonClick}
                  onLayout={handleLayout}
                  style={messageAlertStyle}
                  fonts={fonts}
                  meta={meta}
                />
              </Animated.View>
            ) : (
              <DefaultAlert
                title={title}
                description={description}
                type={type}
                style={[positionStyle, animatedStyle]}
                onLayout={handleLayout}
                fonts={fonts}
                meta={meta}
              />
            )
          )}
        </Portal>
        {children}
      </Host>
    </Context.Provider>
  )
}

export default React.memo(Provider)
