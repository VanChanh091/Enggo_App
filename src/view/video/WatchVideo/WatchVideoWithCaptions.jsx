import React, { useState, useRef, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const captions = [
  {
    text: "Hi, I'm Katie. Welcome to Oxford Online English! In this visual vocabulary lesson",
    startTime: 0,
  },
  { text: "Next caption text", startTime: 10 },
  // Add more captions with the corresponding start times
];

const WatchVideoWithCaptions = () => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === "ended") {
      setPlaying(false);
      Alert.alert("video has finished playing!");
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <YoutubePlayer
        height={500}
        play={playing}
        videoId={"iee2TATGMyI"}
        onChangeState={onStateChange}
      />
      <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default WatchVideoWithCaptions;
