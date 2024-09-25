import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  OxfordChannel,
  EngVidChannel,
  EnglishWithLucyChannel,
  VanessaChannel,
  TedEdChannel,
} from "../../api/ApiVideo";

const ChannelScreen = () => {
  const limitedShowOxford = OxfordChannel.slice(0, 4);

  const renderOxfordChannel = ({ item }) => (
    <TouchableOpacity
      style={{
        height: "100%",
        width: 250,
      }}
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
      <View style={{ flex: 3.5 }}>
        <Text
          style={{
            fontWeight: 500,
            fontSize: 16,
            marginHorizontal: 10,
            textAlign: "justify",
            lineHeight: 20,
          }}
        >
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View
        style={{
          width: "100%",
          height: 275,
          borderBottomWidth: 1,
          borderColor: "#d0d0d0",
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View style={{ flex: 7, justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: 600,
                fontSize: 20,
                marginLeft: 10,
                marginTop: 10,
              }}
            >
              Oxford
            </Text>
          </View>
          <View style={{ flex: 3, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
              }}
              //   onPress={() => navigation.navigate("")}
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowOxford}
            renderItem={renderOxfordChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </View>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({});
