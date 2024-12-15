import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";

const WatchVideoWithCaptions = ({ navigation, route }) => {
  const { data } = route.params;
  const videoId = data?.videoId || data.id?.videoId;

  // const API_KEY = "AIzaSyBbI6fO7DrTmpRYh3NwXGaXLWSr04ysY2g"; //api key cua anh da` :))
  const API_KEY = "AIzaSyD6InaX9MSCEigdalQJRw5g8qmMRllOhBE"; //api key cua vchanh406
  // const API_KEY = "AIzaSyAV0MOQtzTpPHwQqXf4E4YbTJrLV8lT0kg"; //api key cua vanchanh0730

  const [playing, setPlaying] = useState(true);
  const [loading, setLoading] = useState(true);
  const [repeatOnOff, setRepeatOnOff] = useState(true);
  const [playCaption, setPlayCaption] = useState(true);
  const [captions, setCaptions] = useState([]);
  const [selectedCaption, setSelectedCaption] = useState(null);

  useEffect(() => {
    fetchCaptionsMetadata();
  }, [videoId]);

  // Fetch captions metadata when the component mounts
  const fetchCaptionsMetadata = async () => {
    if (!videoId) return;

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
      );
      const result = await response.json();

      if (result.items && result.items.length > 0) {
        // Filter available captions by language or other criteria if needed
        setCaptions(result.items);
      } else {
        console.log("No captions available for this video.");
      }
    } catch (error) {
      console.error("Error fetching captions metadata:", error);
    }
  };

  const handleSelectCaption = (captionId) => {
    setSelectedCaption(captionId);
    // Here, you'd typically fetch the caption text if possible.
    // This would require OAuth and additional API permissions, which isn't covered by the standard API key.
  };

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
          videoId={videoId}
          play={playing}

          // onChangeState={repeatVideo} // You can uncomment this to handle repeating the video
        />
      </View>

      {/* caption */}
      <View style={{ flex: 6, borderBottomWidth: 1 }}>
        {/* {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <ScrollView>
            <View style={{ flex: 1, padding: 20 }}>
              <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
                Available Captions:
              </Text>
              {captions.map((caption) => (
                <View key={caption.id} style={{ marginVertical: 5 }}>
                  <Button
                    title={`Language: ${caption.snippet.language} - ${
                      caption.snippet.name || "Auto-Generated"
                    }`}
                    onPress={() => handleSelectCaption(caption.id)}
                  />
                </View>
              ))}
              {selectedCaption && (
                <Text style={{ color: "#fff", marginTop: 10 }}>
                  Selected Caption ID: {selectedCaption}
                </Text>
              )}
            </View>
          </ScrollView>
        )} */}
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
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
