import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import { TagName } from "../../api/apiSongNgu";

const SongNgu_S1 = ({ navigation }) => {
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
      >
        <View style={{ flex: 9, alignItems: "center", flexDirection: "row" }}>
          <Text style={{ marginLeft: 15, fontSize: 18 }}>{item.id}.</Text>
          <Text style={{ marginLeft: 5, fontSize: 18 }}>{item.tag}</Text>
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
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction
          color="white"
          onPress={() => navigation.navigate("TabNavigationContainer")}
        />
        <Appbar.Content title="Truyện song ngữ" color="white" />
      </Appbar.Header>

      <View style={{ flex: 1 }}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderTagName}
          data={TagName}
        />
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S1;

const styles = StyleSheet.create({});
