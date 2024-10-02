import React, { useState, useRef } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";

const TestListen = () => {
  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const videoRef = useRef(null);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const onProgress = (data) => {
    setCurrentTime(data.currentTime);
  };

  const onLoad = (data) => {
    setDuration(data.duration);
  };

  const skipForward = () => {
    videoRef.current.seek(currentTime + 5);
  };

  const skipBackward = () => {
    videoRef.current.seek(currentTime - 5);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  const changePlaybackSpeed = () => {
    const newSpeed = playbackSpeed === 1.0 ? 1.5 : 1.0;
    setPlaybackSpeed(newSpeed);
  };

  return (
    <View style={styles.container}>
      {/* <Video
        ref={videoRef}
        source={{ uri: "https://your-media-url.mp4" }} // Replace with your video/audio source
        paused={paused}
        onProgress={onProgress}
        onLoad={onLoad}
        rate={playbackSpeed}
        style={styles.video}
      /> */}

      {/* Slider for progress control */}
      <View style={styles.progressContainer}>
        <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={(value) => videoRef.current.seek(value)}
          minimumTrackTintColor="#1E90FF"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1E90FF"
        />
        <Text style={styles.timeText}>{formatTime(duration)}</Text>
      </View>

      {/* Playback controls */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={changePlaybackSpeed}>
          <Text style={styles.speedText}>{playbackSpeed}x</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={skipBackward}>
          <Icon name="replay-5" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity onPress={togglePlayPause}>
          <Icon
            name={paused ? "play-arrow" : "pause"}
            size={40}
            color="#1E90FF"
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={skipForward}>
          <Icon name="forward-5" size={30} color="#888" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => console.log("Repeat")}>
          <Icon name="repeat" size={30} color="#1E90FF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestListen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "black",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 10,
  },
  timeText: {
    fontSize: 12,
    color: "#666",
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  controlsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  speedText: {
    fontSize: 16,
    color: "#1E90FF",
  },
});
