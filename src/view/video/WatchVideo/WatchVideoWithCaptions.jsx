import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Feather,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import axios from "axios";

const WatchVideoWithCaptions = ({ route }) => {
  const { data } = route.params;
  const { videoId } = data.id;
  console.log("videoId:", videoId);

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [repeatOnOff, setRepeatOnOff] = useState(true);
  const [playCaption, setPlayCaption] = useState(true);

  const [videoUrl, setVideoUrl] = useState(
    `https://www.youtube.com/watch?v=${videoId}`
  );
  const [subtitles, setSubtitles] = useState("");

  const [currentCaption, setCurrentCaption] = useState("");

  // Fetch subtitles when the component mounts
  const downloadSubtitle = async () => {
    setLoading(true);
    try {
      // Fetch the HTML from downsub.com
      const response = await fetch(
        `https://downsub.com/?url=${encodeURIComponent(videoUrl)}`
      );
      const html = await response.text();

      // Use a regex to extract the .srt link from the HTML
      const srtLinkMatch = html.match(/(https[^"]+\.srt)/); // Match the .srt link

      if (srtLinkMatch) {
        const srtLink = srtLinkMatch[1];

        // Now fetch the SRT file
        const srtResponse = await fetch(srtLink);
        const srtText = await srtResponse.text();

        setSubtitles(srtText);
      } else {
        console.error("No subtitle link found.");
      }
    } catch (error) {
      console.error("Error downloading subtitles:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    downloadSubtitle();
  }, [videoUrl]);

  const parseSRT = (srt) => {
    // Function to parse SRT format to display in the app
    const lines = srt.split("\n");
    const parsedSubtitles = [];
    let currentSubtitle = "";

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim() === "") continue; // Skip empty lines
      if (!isNaN(lines[i].trim())) continue; // Skip the subtitle index
      if (lines[i].includes("-->")) continue; // Skip the timecode line

      currentSubtitle += lines[i] + " ";
      if (i === lines.length - 1 || lines[i + 1].trim() === "") {
        parsedSubtitles.push(currentSubtitle.trim());
        currentSubtitle = "";
      }
    }
    return parsedSubtitles;
  };

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
      {/* video */}
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

          // onChangeState={repeatVideo} // You can uncomment this to handle repeating the video
        />
      </View>

      {/* caption */}
      <View style={{ flex: 6, borderBottomWidth: 1 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView>
            <View
              style={{
                width: "100%",
                borderBottomWidth: 1,
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
                {subtitles}
              </Text>
            </View>
          </ScrollView>
        )}
      </View>

      {/* bottom bar */}
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
