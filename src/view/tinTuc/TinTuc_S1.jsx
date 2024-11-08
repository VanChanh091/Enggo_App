import { Ionicons } from "@expo/vector-icons";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  MD2Colors,
  PaperProvider,
} from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";
import themeContext from "../../theme/themeContext";

const TinTuc_S1 = ({ navigation }) => {
  const theme = useContext(themeContext);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/news`);
      const data = await res.json();
      setNews(data.data);
      // console.log("News:", data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const listTinTuc = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 250,
        height: 220,
      }}
      onPress={() => navigation.navigate("TinTuc_S2", { data: item })}
    >
      <View
        style={{
          flex: 6.5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.image }}
          style={{
            width: "93%",
            height: "90%",
            resizeMode: "contain",
            borderRadius: 10,
          }}
        />
      </View>
      <View
        style={{
          flex: 3.5,
        }}
      >
        <Text
          style={{
            fontSize: 15,
            paddingHorizontal: 10,
            fontWeight: "500",
            color: theme.color,
          }}
        >
          {item.content}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const groupedNewsByCategory = news.reduce((acc, newsItem) => {
    const categoryId = newsItem.category;
    if (!acc[categoryId]) {
      acc[categoryId] = []; // Tạo mảng cho category mới
    }
    acc[categoryId].push(newsItem); // Thêm item có cùng mã category vào mảng
    return acc;
  }, {});

  // console.log("Grouped by Category: ", groupedNewsByCategory);

  const uniqueTitlesByCategory = news.reduce((acc, item) => {
    const categoryId = item.category;

    // Nếu categoryId chưa tồn tại trong acc, thêm nó cùng với title
    if (!acc[categoryId]) {
      acc[categoryId] = item.title;
    }

    return acc;
  }, {});

  console.log("Unique Titles by Category: ", uniqueTitlesByCategory);

  return (
    <PaperProvider>
      <HeaderScreen title={"Tin Tức"} />

      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator animating={true} color={MD2Colors.blue800} />
        </View>
      ) : (
        <ScrollView style={{ flex: 1, backgroundColor: theme.background }}>
          {Object.keys(groupedNewsByCategory).map((categoryId) => (
            <View
              key={categoryId}
              style={{ borderBottomWidth: 1, borderColor: theme.border }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                  paddingVertical: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    color: theme.color,
                  }}
                >
                  {uniqueTitlesByCategory[categoryId]}
                </Text>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  //   onPress={() => navigation.navigate("")}
                >
                  <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
                  <Ionicons
                    name="chevron-forward-outline"
                    size={20}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <FlatList
                keyExtractor={(item) => item._id}
                horizontal={true}
                renderItem={listTinTuc}
                data={groupedNewsByCategory[categoryId]}
                showsHorizontalScrollIndicator={false}
              />
            </View>
          ))}
        </ScrollView>
      )}
    </PaperProvider>
  );
};

export default TinTuc_S1;

const styles = StyleSheet.create({});
