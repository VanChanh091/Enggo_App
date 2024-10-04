import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";
import { Audio } from "expo-av";
import HeaderScreen from "../../components/header/HeaderScreen";

const DetailOfListening = ({ navigation, route }) => {
  const { data } = route.params;

  const [paused, setPaused] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [sound, setSound] = useState(null);
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
    <PaperProvider>
      <HeaderScreen title="" />

      <View style={{ flex: 1 }}>
        <ScrollView>
          <View
            style={{
              width: "100%",
              height: 120,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: 500,
                fontSize: 20,
                marginTop: 15,
                marginHorizontal: 10,
              }}
            >
              {data.title}
            </Text>
            <TouchableOpacity style={{ marginTop: 15 }} onPress={playSound}>
              <MaterialIcons name="g-translate" size={28} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8, marginTop: 10 }}>
            {data.content.map((item, index) => (
              <View key={index}>
                <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
                  {item.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    width: "100%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <TouchableOpacity key={index} onPress={playSound}>
                    <MaterialIcons name="g-translate" size={28} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginLeft: 15 }}>
                    <FontAwesome name="volume-up" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* play voice */}
        <View
          style={{
            width: "100%",
            height: 140,
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
    </PaperProvider>
  );
};

export default DetailOfListening;

const styles = StyleSheet.create({});
