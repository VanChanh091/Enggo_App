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
} from "../../api/ApiVideo";

const ChannelScreen = ({ navigation }) => {
  const limitedShowOxfordChannel = OxfordChannel.slice(0, 4);
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
    <ScrollView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Oxford Channel*/}
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
              engVid: Learn English
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
              English With Lucy
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
              Speaking English With Vanessa
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
              Ted-Ed
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
