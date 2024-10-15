import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { ApiChannel } from "../../../api/ApiVideo";

const ChannelScreen = ({ navigation }) => {
  // const API_KEY = "AIzaSyBbI6fO7DrTmpRYh3NwXGaXLWSr04ysY2g"; //api key cua anh da` :))
  const API_KEY = "AIzaSyD6InaX9MSCEigdalQJRw5g8qmMRllOhBE"; //api key cua vchanh406

  const [videosByChannel, setVideosByChannel] = useState({});
  const [channelInfo, setChannelInfo] = useState(null);

  const videoCache = {}; // Lưu trữ dữ liệu của từng kênh

  const fetchVideos = async (channelId) => {
    const cachedData = videoCache[channelId];
    const now = Date.now();

    if (cachedData && now - cachedData.timestamp < 6000000) {
      // Nếu dữ liệu đã cache tồn tại và còn trong khoảng thời gian 10 phút
      setVideosByChannel((prevState) => ({
        ...prevState,
        [channelId]: cachedData.data,
      }));
      return;
    }

    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${channelId}&part=snippet,id&order=date&maxResults=5`
      );
      const data = await response.json();

      // Cập nhật video cho channel cụ thể
      setVideosByChannel((prevState) => ({
        ...prevState,
        [channelId]: data.items,
      }));

      // Lưu cache
      videoCache[channelId] = {
        data: data.items,
        timestamp: now,
      };
      console.log(
        `Saved data for channelId: ${channelId}`,
        videoCache[channelId]
      );
    } catch (error) {
      console.error("Error fetching YouTube videos:", error);
    }

    // Fetch channel info
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${API_KEY}`
      );
      const data = await response.json();
      if (data.items && data.items.length > 0) {
        setChannelInfo(data.items[0].snippet);
      }
    } catch (error) {
      console.error("Error fetching YouTube channel info:", error);
    }
  };

  useEffect(() => {
    // Ví dụ: gọi API để lấy video cho một kênh
    {
      ApiChannel.map((item) => {
        fetchVideos(item.channelId);
      });
    }
  }, []);

  const renderChannel = ({ item }) => {
    const { title, thumbnails } = item.snippet; // Lấy thumbnails từ snippet
    return (
      <TouchableOpacity
        style={{
          height: "100%",
          width: 250,
        }}
        onPress={() => navigation.navigate("VideoSetting", { data: item })}
      >
        <View
          style={{
            flex: 6.5,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: thumbnails.medium.url }} // Đúng cách truy cập hình thu nhỏ
            style={{
              width: "90%",
              height: "90%",
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flex: 3.5 }}>
          <Text
            style={{
              fontWeight: 500,
              fontSize: 15,
              marginHorizontal: 10,
            }}
          >
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {ApiChannel.map((channel) => (
        <View
          key={channel.channelId}
          style={{
            width: "100%",
            height: 275,
          }}
        >
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View
              style={{
                flex: 7.5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Image
                source={require("../../../img/imgVideo/logoChannel/oxford.png")} // Thay đổi logo theo channel
                style={{
                  width: 40,
                  height: 40,
                  resizeMode: "contain",
                  marginLeft: 10,
                  marginTop: 5,
                }}
              />
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 18,
                  marginLeft: 10,
                  marginTop: 5,
                }}
              >
                {channel.channelId} {/* Hiển thị tên channel */}
              </Text>
            </View>
            <View style={{ flex: 2.5, justifyContent: "center" }}>
              <TouchableOpacity
                style={{
                  flex: 2.7,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 5,
                }}
                onPress={() =>
                  navigation.navigate("ListVideoOfChannel", {
                    data: videosByChannel[channel.channelId],
                  })
                }
              >
                <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="gray"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ flex: 8 }}>
            <FlatList
              data={videosByChannel[channel.channelId]} // Hiển thị video của channel tương ứng
              renderItem={renderChannel}
              keyExtractor={(item) => item.id.videoId}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({
  videoItem: {
    marginBottom: 20,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  thumbnail: {
    width: "100%",
    height: 180,
  },
  videoDescription: {
    fontSize: 14,
    color: "gray",
    marginVertical: 5,
  },
});
