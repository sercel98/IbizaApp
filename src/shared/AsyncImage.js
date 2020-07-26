import React, { Component } from 'react'
import { Image, View, ActivityIndicator } from 'react-native'
import firebaseClient from '../services/firebaseClient'
export default class AsyncImage extends Component {

	constructor(props) {
		super(props)
		this.state =
		{
			loading: true,
			mounted: true,
			image: props.image,
			url: "",
		}
	}

	componentDidMount() {
		this.setState({ isMounted: true })
		this.getAndLoadHttpUrl()
	}
	//ayuda a evitar memory leaks por el async
	componentWillUnmount() {
		this.setState({ isMounted: false })
	}

	async getAndLoadHttpUrl() {
		if (this.state.mounted == true) {

			const ref = firebaseClient.storage.ref()
			const folderRef = ref.child(this.props.folder)
			const imageRef = folderRef.child(this.state.image);
			console.log(imageRef.name)

			imageRef.getDownloadURL().then(data => {
				this.setState({ url: data })
				this.setState({ loading: false })
			}).catch(error => {
				
				//TO DO: Arreglar esto por si una url se ingresa mal muestre le notfound
				this.setState({ url: this.props.folder+"/notfound.png" })
				this.setState({ loading: false })
			})
		}
	}

	render() {
		if (this.state.mounted == true) {
			if (this.state.loading == true) {
				return (
					<View key={this.props.image} style={{ width: '100%', alignItems: 'center', justifyContent: 'center' }} >
						<ActivityIndicator />
					</View>
				)
			}
			else {
				return (
					<Image style={this.props.style} source={{ uri: this.state.url }} />
				)
			}
		}
		else {
			return null
		}
	}
}


