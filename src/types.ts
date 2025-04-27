import { LayoutChangeEvent, StyleProp, ViewStyle } from 'react-native'

export enum AlertType {
  None = 0,
  Regular = 1,
  Success = 2,
  Error = 3,
  Warning = 4,
  Message = 5
}

export enum ButtonStyle {
  Cancel = 0,
  Regular = 1,
  Bold = 2,
  Danger = 3
}

export interface AlertButton {
  text: string
  style: ButtonStyle
  onPress?: () => any
}

export interface AlertProps {
  title: string
  description?: string
}

export interface AlertWithButtonProps extends AlertProps {
  buttons?: AlertButton[]
}

export interface AlertController extends AlertWithButtonProps {
  type: AlertType
}

export interface AlertMethods {
  message: (props: AlertWithButtonProps) => void
  success: (props: AlertProps) => void
  error: (props: AlertProps) => void
  warning: (props: AlertProps) => void
}

export interface DefaultProps {
  title: string | null
  description: string | null
  style?: StyleProp<ViewStyle>
  onLayout?: (props: LayoutChangeEvent) => any
  type?: AlertType
}

export interface Props extends DefaultProps {
  buttons: AlertButton[]
  buttonClick: (callback?: () => any) => any
}

export interface FontsProps {
  semiBold: string
  regular: string
  bold: string
  extraBold: string
}

export interface StyleProps {
  backgroundColor?: string
  dangerColor?: string
  defaultColor?: string

  buttonFontSize?: number
  titleFontSize?: number
  descriptionFontSize?: number
}

export interface ProviderProps {
  fonts: FontsProps
  meta: StyleProps
}
