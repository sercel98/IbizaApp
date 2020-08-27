import React, {Component} from "react";
import {ActivityIndicator, Image, View} from "react-native";
import firebaseClient from "../services/firebaseClient";

export default class AsyncImage extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      image: props.image,
      url: "",
    };
  }

  componentDidMount() {
    this._isMounted = true;
    this.getAndLoadHttpUrl();
  }
  //ayuda a evitar memory leaks por el async
  componentWillUnmount() {
    this._isMounted = false;
  }

  getAndLoadHttpUrl() {
      if (!this._isMounted) return;
      const ref = firebaseClient.storage.ref();
      const folderRef = ref.child(this.props.folder);
      const imageRef = folderRef.child(this.state.image);

      imageRef
          .getDownloadURL()
          .then((data) => {
              if (this._isMounted) {
                  this.setState({url: data});
                  this.setState({loading: false});
              }
          })
          .catch((error) => {
              if (this._isMounted) {
                  //TO DO: Arreglar esto por si una url se ingresa mal muestre le notfound
                  this.setState({url: this.props.folder + "/notfound.png"});
                  this.setState({loading: false});
              }
          });
  }

  render() {
    const {loading} = this.state;
    if (loading === true) {
      return (
          <View
              key={this.props.image}
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
          >
            <ActivityIndicator />
          </View>
      );
    } else {
      return (
          <Image style={this.props.style} source={{ uri: this.state.url }} />
      );
    }
  }
}
