import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { MaterialIcons, Feather, FontAwesome } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import Icon from "react-native-vector-icons/MaterialIcons";

const DetailOfListening = ({ navigation, route }) => {
  const { data } = route.params;

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

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      </Appbar.Header>

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
                fontWeight: 600,
                fontSize: 20,
                marginTop: 15,
                marginHorizontal: 10,
              }}
            >
              {data.title}
            </Text>
            <TouchableOpacity
              style={{ marginTop: 15 }}
              onPress={() => navigation.navigate("TestListen")}
            >
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
                  <TouchableOpacity>
                    <MaterialIcons name="g-translate" size={28} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ paddingHorizontal: 25 }}>
                    <Feather name="repeat" size={28} color="black" />
                  </TouchableOpacity>

                  <TouchableOpacity>
                    <FontAwesome name="volume-up" size={28} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* play voice */}
        <View>{/* Playback controls */}</View>
      </View>
    </PaperProvider>
  );
};

export default DetailOfListening;

const styles = StyleSheet.create({});
