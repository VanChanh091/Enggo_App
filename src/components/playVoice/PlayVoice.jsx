import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";

const PlayVoice = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [paused, setPaused] = useState(true);
  const [sound, setSound] = useState(null);

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
    let newSpeed;
    if (playbackSpeed === 1.0) {
      newSpeed = 1.5;
    } else if (playbackSpeed === 1.5) {
      newSpeed = 2.0;
    } else {
      newSpeed = 1.0;
    }
    // await TrackPlayer.setRate(newSpeed);
    setPlaybackSpeed(newSpeed);
  };

  const playSound = async () => {
    try {
      // Nếu đã có âm thanh đang phát, hủy âm thanh trước khi phát từ mới
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });

      // Tạo âm thanh mới từ file require
      const { sound: newSound } = await Audio.Sound.createAsync(
        require("../../audio/Listening/climateChange/SwitzerlandAndItaly_1.mp3")
      );
      setSound(newSound); // Lưu lại đối tượng âm thanh mới để quản lý

      // Phát âm thanh
      await newSound.playAsync();
    } catch (error) {
      console.error("Lỗi khi phát âm thanh: ", error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flex: 1.7,
          borderTopWidth: 1,
          borderColor: "#d0d0d0",
        }}
      >
        {/* play duration*/}
        <View style={{ flex: 0.7, flexDirection: "row" }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "#666" }}>
              {formatTime(currentTime)}
            </Text>
          </View>
          <View style={{ flex: 7 }}>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={duration}
              value={currentTime}
              onValueChange={(value) => videoRef.current.seek(value)}
              minimumTrackTintColor="#1E90FF"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#1E90FF"
            />
          </View>
          <View
            style={{
              flex: 1.5,

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 15, color: "#666" }}>
              {formatTime(duration)}
            </Text>
          </View>
        </View>

        {/* Playback controls */}
        <View
          style={{
            width: "100%",
            height: 50,
            flexDirection: "row",
          }}
        >
          {/* speed */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={changePlaybackSpeed}>
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {playbackSpeed}x
              </Text>
            </TouchableOpacity>
          </View>

          {/* back 5s */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={skipBackward}>
              <Icon name="replay-5" size={35} color="#888" />
            </TouchableOpacity>
          </View>

          {/* play/pause */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={togglePlayPause}>
              <Icon
                name={paused ? "play-arrow" : "pause"}
                size={50}
                color="#1E90FF"
              />
            </TouchableOpacity>
          </View>

          {/* next 5s */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={skipForward}>
              <Icon name="forward-5" size={35} color="#888" />
            </TouchableOpacity>
          </View>

          {/* repeat */}
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={() => console.log("Repeat")}>
              <Icon name="repeat" size={35} color="#1E90FF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayVoice;

const styles = StyleSheet.create({});
