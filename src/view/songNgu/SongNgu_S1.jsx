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
  const [bilingual, setBilingual] = useState([]);

  const fetch = async () => {
    const res = await fetch(`${{ base_url }}/api/bilingual-topics`);
  };
  const renderTagName = ({ item }) => (
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
        key={item._id}
      >
        <View style={{ flex: 9, alignItems: "center", flexDirection: "row" }}>
          <Text style={{ marginLeft: 15, fontSize: 18 }}>{item.id}.</Text>
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
          keyExtractor={(item) => item.id}
          renderItem={renderTagName}
          data={apiSongNgu}
        />
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S1;

const styles = StyleSheet.create({});
