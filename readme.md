<a name="readme-top"></a>

<br />
<div align="center">
  <h3 align="center">React Native Beautiful Alerts</h3>
  <p align="center">
    An Awesome alerts for your projects
    <br />
    <a href="https://snack.expo.dev/t4rl9bWi0">View Demo</a>
    ·
    <a href="https://github.com/discify-bio/react-native-beautiful-alerts/issues">Report Bug</a>
    ·
    <a href="https://github.com/discify-bio/react-native-beautiful-alerts/issues">Request Feature</a>
  </p>
</div>



<details>
  <summary>Menu</summary>
  <ol>
	  <li>
      <a href="#getting-started">Screenshots</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#define-app">Define app</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## Screenshort





<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

This is an example of how to list things you need to use the software and how to install them.
* npm
  ```sh
  npm install react-native-beautiful-alerts
  ```

### Define app

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

```typescript
import { Provider } from 'react-native-beautiful-alerts'

const App = () => {
	return (
		<Provider>
			<Routes/>
		</Provider>
	)
}
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

```typescript
import { useAlert, ButtonStyle } from 'react-native-beautiful-alerts'

const Component = () => {
	const alert = useAlert()

	// Show Alert Without Buttons
	const showAlertWithoutButtons = () => {
		alert.success({
			title: 'Success!',
			description: 'The description'
		})
		// Available types: error, warning, success
	}
	
	// Show Alert With Buttons
	const showAlertWithButtons = () => {
		alert.message({
			title: 'Title',
			description: 'Select an action',
			buttons: [
				{
					text: 'Click',
					style: ButtonStyle.Regular,
					onPress: () => console.log('Pressed!')
				},
				{
					text: 'Cancel',
					style: ButtonStyle.Cancel,
					onPress: () => console.log('Pressed!')
				},
				{
					text: 'Bold',
					style: ButtonStyle.Bold,
					onPress: () => console.log('Pressed!')
				},
				{
					text: 'Danger',
					style: ButtonStyle.Danger,
					onPress: () => console.log('Pressed!')
				}
			]
		})
	}
	return (
		<View>
			<TouchableOpacity
				onPress={showAlertWithoutButtons}
			>
				<Text>Show Success Alert</Text>
			</TouchableOpacity>
			<TouchableOpacity
				onPress={showAlertWithButtons}
			>
				<Text>Show Alert with Buttons</Text>
			</TouchableOpacity>
		</View>
	)
}
```

See the [open issues](https://github.com/discify-bio/react-native-beautiful-alerts/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
