import {
  FlatList,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { topicVideo } from "../../../api/ApiVideo";

const TopicScreen = ({ navigation }) => {
  const renderTopicVideo = ({ item }) => (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "90%",
          height: 100,
          marginVertical: 6,
        }}
        onPress={() => navigation.navigate("")}
      >
        <ImageBackground
          source={item.background}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            borderRadius: 100,
          }}
        >
          <View style={{ flex: 4 }}>
            <Text
              style={{
                fontSize: 17,
                color: "white",
                marginTop: 6,
                marginLeft: 6,
              }}
            >
              {item.title}
            </Text>
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 30,
                backgroundColor: "white",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderColor: "#d0d0d0",
                marginRight: 7,
                marginBottom: 7,
              }}
            >
              <Text style={{ fontWeight: 500, fontSize: 15 }}>
                {item.content.length}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <FlatList
        keyExtractor={(item) => item.id}
        data={topicVideo}
        renderItem={renderTopicVideo}
        numColumns={2}
        // horizontal={false}
      />
    </View>
  );
};

export default TopicScreen;

const styles = StyleSheet.create({});
