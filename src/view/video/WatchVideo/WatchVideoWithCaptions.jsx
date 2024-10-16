import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const WatchVideoWithCaptions = ({ route }) => {
  const { data } = route.params;
  const { videoId } = data.id;

  const [playing, setPlaying] = useState(true);
  const [repeatOnOff, setRepeatOnOff] = useState(true);
  const [playCaption, setPlayCaption] = useState(true);

  const repeatVideo = (state) => {
    if (state === "ended") {
      setPlaying(true); // Stop playing when the video ends
    }
  };

  const handleRepeat = () => {
    setRepeatOnOff(!repeatOnOff);
  };

  const handlePlayCaption = () => {
    setPlayCaption(!playCaption);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#152a55" }}>
      <View
        style={{
          flex: 3,
          paddingTop: 50,
        }}
      >
        <YoutubePlayer
          height="100%"
          videoId={data.videoId || videoId}
          play={playing}
          // onChangeState={onStateChange}
        />
      </View>
      <View style={{ flex: 6, borderBottomWidth: 1 }}>
        <ScrollView>
          <View
            style={{
              width: "100%",

              borderBottomWidth: 1,
              borderColor: "#fff",
              flexDirection: "row",
            }}
          >
            <View
              style={{
                flex: 7,
                borderRightWidth: 1,
                borderColor: "#fff",
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  color: "white",
                  paddingHorizontal: 10,
                  paddingBottom: 10,
                }}
              >
                Hi, I’m Katie. Welcome to Oxford Online English! In this visual
                vocabulary lesson
              </Text>
            </View>
            <View style={{ flex: 3, flexDirection: "row" }}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TouchableOpacity style={{ paddingLeft: 10 }}>
                  <MaterialIcons name="g-translate" size={32} color="white" />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {playCaption ? (
                  <TouchableOpacity
                    onPress={handlePlayCaption}
                    style={{ paddingRight: 10 }}
                  >
                    <Feather name="play-circle" size={35} color="white" />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={handlePlayCaption}
                    style={{ paddingRight: 10 }}
                  >
                    <Feather name="pause-circle" size={35} color="white" />
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flex: 1,
          backgroundColor: "#1548B3",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* back  */}
        <View style={{ justifyContent: "center", paddingLeft: 20 }}>
          <TouchableOpacity>
            <Ionicons name="chevron-back-outline" color="white" size={35} />
          </TouchableOpacity>
        </View>

        {/* restart && repeat */}
        <View style={{ flexDirection: "row", paddingRight: 20 }}>
          <Ionicons
            name="refresh-outline"
            color="white"
            size={35}
            style={{ paddingRight: 15 }}
          />

          {repeatOnOff ? (
            <TouchableOpacity onPress={handleRepeat}>
              <MaterialCommunityIcons
                name="repeat-off"
                size={35}
                color="white"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleRepeat}>
              <MaterialIcons name="repeat" size={35} color="white" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default WatchVideoWithCaptions;
