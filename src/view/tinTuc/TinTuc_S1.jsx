import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { PaperProvider } from "react-native-paper";
import { News } from "../../api/ApiTinTuc";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";

const TinTuc_S1 = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);

  const entertainment = News.filter((item) => item.category === "Giải trí");
  const educationTips = News.filter((item) => item.category === "Mẹo giáo dục");
  const newLiteracyEducation = News.filter(
    (item) => item.category === "Giáo dục về tin tức"
  );
  const scienceAndTechnology = News.filter(
    (item) => item.category === "Khoa học & Công nghệ"
  );
  const wordsAndTheirStories = News.filter(
    (item) => item.category === "Từ ngữ & câu chuyện của chúng"
  );
  const healthAndLifeStyle = News.filter(
    (item) => item.category === "Sức khỏe & Phong cách sống"
  );

  useEffect(() => {
    fetchAllCategoryNews();
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/news`);
      const data = await res.json();
      setNews(data.data);
      console.log("News:", data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllCategoryNews = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/categoryNews`);
      const data = await res.json();
      setCategoryNews(data.data);
      console.log("Category News:", data.data);
    } catch (error) {
      console.log(error);
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
          source={item.image}
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
          }}
        >
          {item.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const TitleOfNews = ({ data }) => (
    <View style={{ flex: 2, flexDirection: "row" }}>
      <View
        style={{
          flex: 7.3,
          justifyContent: "center",
        }}
      >
        <Text style={{ fontWeight: "bold", marginLeft: 13, fontSize: 18 }}>
          {data}
        </Text>
      </View>
      <TouchableOpacity
        style={{
          flex: 2.7,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        //   onPress={() => navigation.navigate("")}
      >
        <Text style={{ fontSize: 15, color: "gray" }}>Xem thêm</Text>
        <Ionicons name="chevron-forward-outline" size={20} color="gray" />
      </TouchableOpacity>
    </View>
  );

  return (
    <PaperProvider>
      <HeaderScreen title={"Tin Tức"} />

      <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        {/* Entertainment */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={entertainment[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={entertainment}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* educationTips */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={educationTips[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={educationTips}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* scienceAndTechnology */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={scienceAndTechnology[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={scienceAndTechnology}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* wordsAndTheirStories */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={wordsAndTheirStories[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={wordsAndTheirStories}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* healthAndLifeStyle */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={healthAndLifeStyle[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={healthAndLifeStyle}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* newLiteracyEducation */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <TitleOfNews data={newLiteracyEducation[0].category} />
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={newLiteracyEducation}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default TinTuc_S1;

const styles = StyleSheet.create({});
