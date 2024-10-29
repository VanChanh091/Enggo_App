import React from "react";
import {
  FlatList,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const ListTopic = ({ title, data, navigationScreen }) => {
  const navigation = useNavigation();

  const renderTopic = ({ item }) => (
    <View style={{ flex: 1, alignItems: "center" }}>
      <TouchableOpacity
        style={{ width: "92%", height: 125, marginVertical: 6 }}
        onPress={() => navigation.navigate(navigationScreen, { data: item })}
      >
        <ImageBackground
          source={{ uri: item.background }}
          style={{
            width: "100%",
            height: "100%",
            resizeMode: "contain",
            borderRadius: 8,
          }}
        >
          <View style={{ flex: 4 }}>
            <Text style={{ fontSize: 17, color: "white", margin: 6 }}>
              {title}
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
              <Text style={{ fontWeight: "500", fontSize: 15 }}>
                {item.Items.length}
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, marginBottom: 10 }}>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 10, marginVertical: 5 }}>{title}</Text> */}
      <FlatList
        keyExtractor={(item) => item._id}
        data={data}
        renderItem={renderTopic}
        numColumns={2}
      />
    </View>
  );
};

export default ListTopic;
