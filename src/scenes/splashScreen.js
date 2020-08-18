import React, { useState, useEffect } from "react";
import { Video } from "expo-av";
import { View, StyleSheet, Text } from "react-native";
import { Asset } from "expo-asset";
import {endSplashScreen} from '../actions/navigationActions'
import { useDispatch } from "react-redux";

export default function SplashScreen(props) {
  const [muteVideo, setMuteVideo] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      setMuteVideo(true);
    }
  }, []);

  const endVideo = () => {
    setMuteVideo(true);
    dispatch(endSplashScreen());
  }

  const onPlaybackStatusUpdate = (playbackStatus) => {
    if (playbackStatus.didJustFinish && !playbackStatus.isLooping) {
      // The player has just finished playing and will stop. Maybe you want to play something else?
      endVideo();
    }
  }
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
        onPlaybackStatusUpdate={onPlaybackStatusUpdate}
        style={{ height: "100%", width: "100%" }}
      />
      <Text style={styles.skipButton} onPress={endVideo}>Omitir</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  backgroundVideo: {
    flex: 1,
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  skipButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    color: 'white',
    padding: 20
  },
});
