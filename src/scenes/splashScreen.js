import React from "react";
import { Video } from "expo-av";
import { View, StyleSheet, Text } from "react-native";
import { Asset } from "expo-asset";

class SplashScreen extends React.Component {
  render() {
    const { video } = Asset.fromModule(
      require('../../assets/videos/splashVideo.mp4')
    ).uri;
    return (
      <View style={styles.backgroundVideo}>
        <Video
          source={{ uri: video }}
          rate={1.0}
          volume={1.0}
          isMuted={true}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: 300, height: 300 }}
        />
        <Text style={{color: 'white'}}>AAAAAAAAAAAAAAAAAAA</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    backgroundColor: 'black',
  },
});

export default SplashScreen;
