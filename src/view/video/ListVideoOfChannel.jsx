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

const ListVideoOfChannel = ({ navigation, route }) => {
  const { data } = route.params;

  const renderVideos = ({ item }) => (
    <TouchableOpacity
      style={{
        width: "100%",
        height: 120,

        flexDirection: "row",
      }}
      onPress={() => navigation.navigate("VideoSetting", { data: item })}
    >
      <View
        style={{
          flex: 4,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={item.image}
          style={{
            width: "95%",
            height: "95%",
            resizeMode: "contain",
            marginLeft: 10,
          }}
        />
      </View>
      <View style={{ flex: 6 }}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 13,
            marginHorizontal: 10,
          }}
        >
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <PaperProvider>
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <View style={{ flex: 1, backgroundColor: "white" }}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          data={data}
          renderItem={renderVideos}
        />
        <View style={{ width: "100%", height: 25 }}></View>
      </View>
    </PaperProvider>
  );
};

export default ListVideoOfChannel;

const styles = StyleSheet.create({});
