import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TopicListen } from "../../api/apiListen";
import { Appbar, PaperProvider } from "react-native-paper";

const TopicListening = ({ navigation }) => {
  const renderTopicVideo = ({ item }) => (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{
          width: "92%",
          height: 125,
          marginVertical: 6,
        }}
        onPress={() =>
          navigation.navigate("ListListeningOfTopic", { data: item })
        }
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
                {item.list.length}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
        <Appbar.Content title="Bài Nghe" color="white" />
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: "white", marginTop: 7 }}>
        <View style={{ flex: 9.5 }}>
          <FlatList
            keyExtractor={(item) => item.id}
            data={TopicListen}
            renderItem={renderTopicVideo}
            numColumns={2}
          />
        </View>
        <View style={{ flex: 0.5 }}></View>
      </View>
    </PaperProvider>
  );
};

export default TopicListening;

const styles = StyleSheet.create({});
