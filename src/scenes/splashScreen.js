import React from "react";
import { Video } from "expo-av";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { Asset } from "expo-asset";
import { useNavigation } from "@react-navigation/native";


class SplashScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      muteVideo: false
    }
  }

  componentWillUnmount(){
    this.setState({muteVideo: true});
  }

  goHome=()=>{
    const {navigation} = this.props;
    this.setState({muteVideo: true})
    navigation.navigate("Home");
  }

  _onPlaybackStatusUpdate = (playbackStatus) => {
    //const {route}=this.props;
    if (playbackStatus.didJustFinish){
      //if(route.name==="SplashScreen"){
        this.goHome();
      //}
    }
  }


  render() {
    const {muteVideo} = this.state;
    const video = Asset.fromModule(
      require("../../assets/videos/splashVideo.mp4")
    ).uri;
    return (
      <View style={styles.backgroundVideo}>
        <Video
          source={{ uri: video }}
          rate={1.0}
          volume={1.0}
          isMuted={muteVideo}
          resizeMode="cover"
          shouldPlay
          onEnded={()=>this.goHome()}
          //onPlaybackStatusUpdate={(playBackStatus)=>this._onPlaybackStatusUpdate(playBackStatus)}
          style={{height:"100%", width:"100%"}}
        />
        <Text style={styles.skipButton} onPress={()=>this.goHome()}>Omitir</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex:1,
    height:"100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  skipButton:{
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: 'white',
    padding: 20
  },
});

export default SplashScreen;
