import React, {
	Component
} from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	Image,
	Button,
	TextInput,
	Picker
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import FirebaseInitial from '../Services/FirebaseInitial';
const options = {
	title: 'img picker',
	takePhotoButtonTitle: 'Take photo with your camera',
	chooseFromLibraryButtonTitle: 'Choose photo from library',
}

export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			avatarSource: null,
			pic: null
		}
	}

	onPress = () => {
		//alert('clicked');

		ImagePicker.showImagePicker(options, (response) => {
			console.log('Response = ', response);

			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('Image Picker Error: ', response.error);
			} else {
				let source = {
					uri: response.uri
				};

				// You can also display the image using data:
				// let source = { uri: 'data:image/jpeg;base64,' + response.data };

				this.setState({
					avatarSource: source,
					pic: response.data
				});
			}
		});
	}


}