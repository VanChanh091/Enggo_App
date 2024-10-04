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
import { PaperProvider } from "react-native-paper";
import { Entertainment, Travel, Education } from "../../api/ApiTinTuc";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import HeaderScreen from "../../components/header/HeaderScreen";

const TinTuc_S1 = ({ navigation }) => {
  const [news, setNews] = useState([]);

  // const fetchNews = async () => {
  //   try {
  //     const response = await fetch('http://localhost:3000/api/news', {
  //       method: 'GET',
  //       headers: {
  //         // 'Authorization': `Bearer ${yourToken}`,
  //         'Content-Type': 'application/json',
  //         'Accept': 'application/json, text/plain, */*',
  //       },
  //     });

  //     if (!response.ok) {
  //       throw new Error(`Error: ${response.status} - ${response.statusText}`);
  //     }

  //     const data = await response.json();
  //     console.log('Fetched data:', data);
  //     // Handle the data as needed
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const fetchNews = async () => {
    try {
      const response = await axios.get("http://192.168.1.3:3000/api/news", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json, text/plain, */*",
        },
        withCredentials: false, // Thêm dòng này để đảm bảo không gửi thông tin chứng thực
      });
      console.log("Fetched data:", response.data);
      setNews(response.data); // Lưu dữ liệu vào state `news`
    } catch (error) {
      console.error("Error fetching news:", error.message); // Hiển thị chi tiết lỗi
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const listTinTuc = ({ item }) => (
    <TouchableOpacity
      style={{
        width: 230,
        height: 200,
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
            width: "90%",
            height: "90%",
            resizeMode: "contain",
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
            marginLeft: 13,
            fontWeight: "500",
          }}
        >
          {item.content}
          {/* {item.information.map((info) => (
            <Text key={info.id}>{info.titleEn}</Text>
          ))} */}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <HeaderScreen title={"Tin Tức"} />

      <ScrollView style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        {/* FlatList Entertainment */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View
              style={{
                flex: 7.3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginLeft: 13, fontSize: 19 }}
              >
                Giải trí
              </Text>
            </View>
            {/* <TouchableOpacity onPress={fetchNews}>
              <Text style={{ fontSize: 15, color: "gray" }}>get</Text>
            </TouchableOpacity> */}
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
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="gray"
                // style={{ marginRight: -30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={Entertainment}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* FlatList Travel */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View
              style={{
                flex: 7.3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginLeft: 13, fontSize: 19 }}
              >
                Du lịch
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, color: "gray" }}>Xem thêm</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="gray"
                // style={{ marginRight: -30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={Travel}
              showsHorizontalScrollIndicator={false}
            />
          </View>
        </View>

        {/* FlatList Education */}
        <View
          style={{
            width: "100%",
            height: 260,
            marginTop: 10,
            borderColor: "#D0D0D0",
            borderBottomWidth: 1,
          }}
        >
          <View style={{ flex: 2, flexDirection: "row" }}>
            <View
              style={{
                flex: 7.3,
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontWeight: "bold", marginLeft: 13, fontSize: 19 }}
              >
                Giáo dục
              </Text>
            </View>
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 15, color: "gray" }}>Xem thêm</Text>
              <Ionicons
                name="chevron-forward-outline"
                size={20}
                color="gray"
                // style={{ marginRight: -30, marginLeft: 10 }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 8 }}>
            <FlatList
              keyExtractor={(item) => item.id}
              horizontal={true}
              renderItem={listTinTuc}
              data={Education}
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
