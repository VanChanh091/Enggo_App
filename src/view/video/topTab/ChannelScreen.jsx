import {
  FlatList,
  Image,
  ScrollView,
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
} from "../../../api/ApiVideo";

const ChannelScreen = ({ navigation }) => {
  const limitedShowOxfordChannel = OxfordChannel.slice(0, 4); //Limit number of video show in screen
  const limitedShowEngVidChannel = EngVidChannel.slice(0, 4);
  const limitedShowEnglishWithLucyChannel = EnglishWithLucyChannel.slice(0, 4);
  const limitedShowVanessaChannel = VanessaChannel.slice(0, 4);
  const limitedShowTedEdChannel = TedEdChannel.slice(0, 4);

  const renderChannel = ({ item }) => (
    <TouchableOpacity
      style={{
        height: "100%",
        width: 250,
      }}
      onPress={() => navigation.navigate("VideoSetting", { data: item })}
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
            fontSize: 15,
            marginHorizontal: 10,
            // textAlign: "justify",
          }}
        >
          {item.text}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Oxford Channel*/}
      <View
        style={{
          width: "100%",
          height: 275,
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 7.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../img/imgVideo/logoChannel/oxford.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              Oxford
            </Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate("ListVideoOfChannel", {
                  data: OxfordChannel,
                })
              }
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowOxfordChannel}
            renderItem={renderChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* engVid Channel */}
      <View
        style={{
          width: "100%",
          height: 275,
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 7.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../img/imgVideo/logoChannel/engVid.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              engVid: Learn English
            </Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate("ListVideoOfChannel", {
                  data: EngVidChannel,
                })
              }
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowEngVidChannel}
            renderItem={renderChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* English With Lucy Channel */}
      <View
        style={{
          width: "100%",
          height: 275,
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 7.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../img/imgVideo/logoChannel/lucy.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              English With Lucy
            </Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate("ListVideoOfChannel", {
                  data: EnglishWithLucyChannel,
                })
              }
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowEnglishWithLucyChannel}
            renderItem={renderChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Vanessa */}
      <View
        style={{
          width: "100%",
          height: 275,
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 7.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../img/imgVideo/logoChannel/vanessa.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 16,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              Speaking English With Vanessa
            </Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate("ListVideoOfChannel", {
                  data: VanessaChannel,
                })
              }
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowVanessaChannel}
            renderItem={renderChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {/* Ted Ed Channel */}
      <View
        style={{
          width: "100%",
          height: 275,
        }}
      >
        <View style={{ flex: 2, flexDirection: "row" }}>
          <View
            style={{
              flex: 7.5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../../img/imgVideo/logoChannel/tedEd.png")}
              style={{
                width: 40,
                height: 40,
                resizeMode: "contain",
                marginLeft: 10,
                marginTop: 5,
              }}
            />
            <Text
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginLeft: 10,
                marginTop: 5,
              }}
            >
              Ted-ed
            </Text>
          </View>
          <View style={{ flex: 2.5, justifyContent: "center" }}>
            {/* see more  */}
            <TouchableOpacity
              style={{
                flex: 2.7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
              }}
              onPress={() =>
                navigation.navigate("ListVideoOfChannel", {
                  data: TedEdChannel,
                })
              }
            >
              <Text style={{ fontSize: 16, color: "gray" }}>Xem thêm</Text>
              <Ionicons name="chevron-forward-outline" size={20} color="gray" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 8 }}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={limitedShowTedEdChannel}
            renderItem={renderChannel}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default ChannelScreen;

const styles = StyleSheet.create({});
