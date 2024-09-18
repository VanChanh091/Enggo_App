import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { TopicAndVocabulary } from "../../api/ApiBoTuVung";

const BoTuVung_S1 = ({ navigation }) => {
  const renderTopicAndVocabulary = ({ item }) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "92%",
          height: 60,
          borderWidth: 1,
          borderRadius: 12,
          borderColor: "gray",
          marginTop: 10,
          flexDirection: "row",
        }}
        onPress={() => navigation.navigate("BoTuVung_S2", { data: item })}
      >
        <View
          style={{
            flex: 1.8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={item.image}
            style={{ width: 45, height: 45, resizeMode: "contain" }}
          />
        </View>
        <View style={{ flex: 8.2, justifyContent: "center", paddingLeft: 7 }}>
          <Text style={{ fontWeight: 500, fontSize: 18 }}>{item.titleEn}</Text>
          <Text style={{ marginTop: 4, fontSize: 17, color: "gray" }}>
            {item.titleVn}
          </Text>
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
        <Appbar.Content title="Bộ Từ Vựng" color="white" />
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: "#F1F1F1" }}>
        <FlatList
          keyExtractor={(item) => item.id}
          renderItem={renderTopicAndVocabulary}
          data={TopicAndVocabulary}
        />
      </View>
    </PaperProvider>
  );
};

export default BoTuVung_S1;

const styles = StyleSheet.create({});
