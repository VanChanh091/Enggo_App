import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { apiSongNgu } from "../../api/apiSongNgu";
import HeaderScreen from "../../components/header/HeaderScreen";
import { appInfo } from "../../constants/appInfos";

const SongNgu_S1 = ({ navigation }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [bilingualTopic, setBilingualTopic] = useState([]);

  useEffect(() => {
    fetchBilingualTopics();
  }, []);

  const fetchBilingualTopics = async () => {
    try {
      const res = await fetch(`${appInfo.Host_URL}/api/bilingual-topics`);
      const data = await res.json();
      setBilingualTopic(data.data);
      console.log(bilingualTopic);
    } catch (error) {
      console.error(error);
    }
  };

  const renderTagName = ({ item, index }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 60,
          borderWidth: 1,
          marginTop: 13,
          borderRadius: 12,
          borderColor: "gray",
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("SongNgu_S2", { data: item })}
      >
        <View style={{ flex: 9, alignItems: "center", flexDirection: "row" }}>
          <Text style={{ marginLeft: 15, fontSize: 18 }}>{index + 1}.</Text>
          <Text style={{ marginLeft: 5, fontSize: 18 }}>{item.topic}</Text>
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Ionicons name="chevron-forward-outline" size={25} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <PaperProvider>
      <HeaderScreen title="Truyện Song Ngữ" />

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(index) => index._id}
          renderItem={renderTagName}
          data={bilingualTopic}
        />
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S1;

const styles = StyleSheet.create({});
