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
import { Education, Entertainment, Travel } from "../../api/ApiTinTuc";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";

const TinTuc_S1 = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [categoryNews, setCategoryNews] = useState([]);


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
          {item.title}
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
        {/* <View
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
        </View> */}

        {/* FlatList Education */}
        {/* <View
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
        </View> */}
      </ScrollView>
    </PaperProvider>
  );
};

export default TinTuc_S1;

const styles = StyleSheet.create({});
