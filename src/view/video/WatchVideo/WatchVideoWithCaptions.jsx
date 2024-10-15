import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  Button,
  ScrollView,
  Alert,
  Text,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";

const WatchVideoWithCaptions = ({ route }) => {
  const { data } = route.params;
  console.log(data);

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

  const getCaptions = async ({ videoId }) => {
    const apiKey = "AIzaSyAV0MOQtzTpPHwQqXf4E4YbTJrLV8lT0kg"; // YouTube API key
    const url = `https://www.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const captionId = data.items[0].id;
        return fetchCaptionsById(captionId, apiKey);
      } else {
        console.log("No captions available for this video");
        return null; // Không có phụ đề
      }
    } catch (error) {
      console.error("Error fetching captions:", error);
      return null; // Xử lý lỗi
    }
  };

  const fetchCaptionsById = async (captionId, apiKey) => {
    const url = `https://www.googleapis.com/youtube/v3/captions/${captionId}?key=${apiKey}`;
    try {
      const response = await fetch(url);
      const captions = await response.text(); // Sử dụng .text() để lấy nội dung phụ đề
      console.log("Captions:", captions);
      return captions;
    } catch (error) {
      console.error("Error fetching caption text:", error);
      return null; // Xử lý lỗi khi không thể lấy được phụ đề
    }
  };

  const [currentCaption, setCurrentCaption] = useState("");
  const [captions, setCaptions] = useState([]); // List of captions fetched from YouTube

  // Fetch captions once the video starts
  useEffect(() => {
    getCaptions(data.videoId).then((fetchedCaptions) => {
      if (fetchedCaptions) {
        setCaptions(parseCaptions(fetchedCaptions));
      } else {
        // Hiển thị thông báo khi không có phụ đề
        setCurrentCaption("No captions available for this video");
      }
    });
  }, [data.videoId]);

  const onProgress = useCallback(
    (e) => {
      // Find the caption corresponding to the current time
      const currentCaptionData = captions.find(
        (caption) => e >= caption.startTime && e < caption.endTime
      );
      if (currentCaptionData) {
        setCurrentCaption(currentCaptionData.text);
      }
    },
    [captions]
  );

  const parseCaptions = (captionFile) => {
    // Split the file by line breaks to get each caption block
    const captionLines = captionFile.split("\n\n");

    return captionLines.map((line) => {
      const parts = line.split("\n");
      const timeCodes = parts[1].split(" --> ");
      return {
        text: parts.slice(2).join(" "), // Combine all text lines for this caption
        startTime: timeStringToSeconds(timeCodes[0]),
        endTime: timeStringToSeconds(timeCodes[1]),
      };
    });
  };

  const timeStringToSeconds = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(":");
    return (
      parseInt(hours) * 3600 + parseInt(minutes) * 60 + parseFloat(seconds)
    );
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
          height={500}
          play={playing}
          videoId={data.videoId}
          onChangeState={onStateChange}
        />
      </View>
      <View style={{ flex: 6, borderBottomWidth: 1 }}>
        <ScrollView>
          <Text>{currentCaption}</Text>
        </ScrollView>
      </View>
      <View style={{ flex: 1, borderBottomWidth: 1 }}>
        <Button title={playing ? "pause" : "play"} onPress={togglePlaying} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default WatchVideoWithCaptions;
