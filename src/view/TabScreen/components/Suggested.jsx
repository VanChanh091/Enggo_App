import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import { appInfo } from "../../../constants/appInfos";
import themeContext from "../../../context/themeContext";
import { useNavigation } from "@react-navigation/native";

const Suggested = () => {
  const theme = useContext(themeContext);
  const navigation = useNavigation();

  const [news, setNews] = useState([]);
  const [videos, setVideos] = useState([]);
  const [listen, setListen] = useState([]);

  const randomNews = Math.floor(Math.random() * news.length);
  const randomVideos = Math.floor(Math.random() * videos.length);
  const randomListen = Math.floor(Math.random() * listen.length);

  const limitedNews = news.slice(randomNews, randomNews + 1);
  const limitedVideos = videos.slice(randomVideos, randomVideos + 1);
  const limitedListen = listen.slice(randomListen, randomListen + 1);

  useEffect(() => {
    fetchNews();
    fetchVideos();
    fetchExercise();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/news`);
      const data = await res.json();
      setNews(data.data);
      //   console.log("News: ", data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchVideos = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/topicVideos`);
      const data = await res.json();
      setVideos(data.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchExercise = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/exercises`);
      const data = await res.json();
      setListen(data.data);
      // console.log("Exercises: ", data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const renderSuggestNews = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 120,
        marginVertical: 7,
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: theme.border,
      }}
      onPress={() => navigation.navigate("TinTuc_S2", { data: item })}
    >
      <View style={{ flex: 6.7 }}>
        <View style={{ flex: 6 }}>
          <Text
            style={{
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 5,
              fontWeight: 500,
              color: theme.color,
            }}
          >
            {item.content}
          </Text>
        </View>
        <View style={{ flex: 4, flexDirection: "row", alignItems: "center" }}>
          <Image
            source={require("../../../img/imgTab/newSmall.png")}
            style={{ paddingHorizontal: 5 }}
          />
          <Text
            style={{ fontSize: 16, paddingHorizontal: 5, color: theme.color }}
          >
            Tin tức
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 3.3,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{ width: 115, height: 90, borderRadius: 5 }}
        />
      </View>
    </TouchableOpacity>
  );

  const renderSuggestVideos = ({ item }) =>
    item.Items.map((video, index) => (
      <TouchableOpacity
        key={index}
        style={{
          width: "100%",
          height: 120,
          marginVertical: 7,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: theme.border,
        }}
        onPress={() =>
          navigation.navigate("WatchVideoWithCaptions", { data: video })
        }
      >
        <View style={{ flex: 6.7 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 500,
                paddingVertical: 12,
                paddingHorizontal: 5,
                color: theme.color,
              }}
            >
              {video.title}
            </Text>
          </View>
          <View style={{ flex: 4, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../img/imgTab/videoSmall.png")}
              style={{ paddingHorizontal: 5 }}
            />
            <Text
              style={{ fontSize: 16, paddingHorizontal: 5, color: theme.color }}
            >
              Videos
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 3.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: video.image }}
            style={{ width: 115, height: 90, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
    ));

  const renderSuggestListen = ({ item }) =>
    item.Items.map((listen, index) => (
      <TouchableOpacity
        key={index}
        style={{
          width: "100%",
          height: 120,
          marginVertical: 7,
          flexDirection: "row",
          borderBottomWidth: 1,
          borderColor: theme.border,
        }}
        onPress={() =>
          navigation.navigate("DetailOfListening", { data: listen })
        }
      >
        <View style={{ flex: 6.7 }}>
          <View style={{ flex: 6 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: 500,
                paddingHorizontal: 5,
                color: theme.color,
              }}
            >
              {listen.title}
            </Text>
          </View>
          <View style={{ flex: 4, flexDirection: "row", alignItems: "center" }}>
            <Image
              source={require("../../../img/imgTab/listenSmall.png")}
              style={{ paddingHorizontal: 5 }}
            />
            <Text
              style={{ fontSize: 16, paddingHorizontal: 5, color: theme.color }}
            >
              Listen
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 3.3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: listen.image }}
            style={{ width: 115, height: 90, borderRadius: 5 }}
          />
        </View>
      </TouchableOpacity>
    ));

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          width: "100%",
          height: 480,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ width: "92%", height: "100%" }}>
          <View
            style={{
              flex: 1.5,
              justifyContent: "center",
            }}
          >
            <View
              style={{
                width: 180,
                height: 38,
                borderRadius: 15,
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#D0D0D0",
              }}
            >
              <View
                style={{
                  flex: 2,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Ionicons name="star-outline" size={25} color="black" />
              </View>
              <View style={{ flex: 7 }}>
                <Text style={{ fontSize: 16 }}>Đề xuất cho bạn</Text>
              </View>
            </View>
          </View>

          <View style={{ flex: 8.5 }}>
            {/* news */}
            <View style={{ flex: 1 }}>
              <FlatList
                key={(index) => index._id}
                renderItem={renderSuggestNews}
                data={limitedNews}
                scrollEnabled={false}
              />
            </View>

            {/* videos */}
            <View style={{ flex: 1 }}>
              <FlatList
                key={(index) => index._id}
                renderItem={renderSuggestVideos}
                data={limitedVideos}
                scrollEnabled={false}
              />
            </View>

            {/* listen */}
            <View style={{ flex: 1 }}>
              <FlatList
                key={(index) => index._id}
                renderItem={renderSuggestListen}
                data={limitedListen}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Suggested;
