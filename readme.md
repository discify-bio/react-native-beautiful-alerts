# React Native Beautiful Alerts

A modern, customizable alert system for React Native applications with beautiful animations and flexible styling options.

[![npm version](https://img.shields.io/npm/v/react-native-beautiful-alerts.svg)](https://www.npmjs.com/package/react-native-beautiful-alerts)
[![license](https://img.shields.io/npm/l/react-native-beautiful-alerts.svg)](https://github.com/discify-bio/react-native-beautiful-alerts/blob/main/LICENSE)

<p align="center">
  <a href="https://snack.expo.dev/t4rl9bWi0">View Live Demo</a> •
  <a href="https://github.com/discify-bio/react-native-beautiful-alerts/issues">Report Bug</a> •
  <a href="https://github.com/discify-bio/react-native-beautiful-alerts/issues">Request Feature</a>
</p>

## Features

- 🎨 Multiple alert types: success, error, warning, and custom messages
- ⚡ Smooth animations with Lottie integration
- 🎛️ Customizable buttons with different styles
- 🔧 Flexible styling options
- 📱 Works on both iOS and Android

## Installation

Install the package:

```sh
bun install react-native-beautiful-alerts @react-native-community/blur lottie-react-native react-native-portalize react-native-reanimated
```

## Setup

Wrap your app with the `Provider` component:

```typescript
import { Provider } from 'react-native-beautiful-alerts'

const App = () => {
  return (
    <Provider>
      <YourApp />
    </Provider>
  )
}
```

## Usage

### Basic Alerts

Show simple alerts with automatic dismissal:

```typescript
import { useAlert } from 'react-native-beautiful-alerts'

const MyComponent = () => {
  const alert = useAlert()

  const showSuccessAlert = () => {
    alert.success({
      title: 'Success!',
      description: 'Your action completed successfully'
    })
  }

  const showErrorAlert = () => {
    alert.error({
      title: 'Error',
      description: 'Something went wrong'
    })
  }

  const showWarningAlert = () => {
    alert.warning({
      title: 'Warning',
      description: 'Please check your input'
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={showSuccessAlert}>
        <Text>Show Success Alert</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### Custom Alerts with Buttons

Create alerts with custom buttons and actions:

```typescript
import { useAlert, ButtonStyle } from 'react-native-beautiful-alerts'

const MyComponent = () => {
  const alert = useAlert()

  const showCustomAlert = () => {
    alert.message({
      title: 'Custom Alert',
      description: 'Choose an action',
      buttons: [
        {
          text: 'Cancel',
          style: ButtonStyle.Cancel,
          onPress: () => console.log('Cancelled')
        },
        {
          text: 'Confirm',
          style: ButtonStyle.Bold,
          onPress: () => console.log('Confirmed')
        },
        {
          text: 'Delete',
          style: ButtonStyle.Danger,
          onPress: () => console.log('Deleted')
        }
      ]
    })
  }

  return (
    <View>
      <TouchableOpacity onPress={showCustomAlert}>
        <Text>Show Custom Alert</Text>
      </TouchableOpacity>
    </View>
  )
}
```

### Button Styles

Available button styles:

- `ButtonStyle.Regular` - Standard button
- `ButtonStyle.Bold` - Bold/Primary button
- `ButtonStyle.Cancel` - Cancel button (positioned first or last depending on number of buttons)
- `ButtonStyle.Danger` - Destructive action button

## Customization

You can customize fonts and styles by passing props to the Provider:

```typescript
<Provider
  fonts={{
    regular: 'YourFontRegular',
    semiBold: 'YourFontSemiBold',
    bold: 'YourFontBold',
    extraBold: 'YourFontExtraBold'
  }}
  meta={{
    backgroundColor: '#FFFFFF',
    dangerColor: '#FF3B30',
    defaultColor: '#007AFF',
    buttonFontSize: 16,
    titleFontSize: 18,
    descriptionFontSize: 14
  }}
>
  <YourApp />
</Provider>
```

## Contributing

Contributions are welcome! If you have ideas for improvements or find any issues, please open an issue or submit a pull request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

Distributed under the ISC License. See `LICENSE` for more information.
