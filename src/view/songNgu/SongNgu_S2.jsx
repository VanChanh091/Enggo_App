import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";

const SongNgu_S2 = ({ navigation, route }) => {
  const { data } = route.params;

  return (
    <PaperProvider>
      <HeaderScreen title={data.topic} />

      <View style={{ flex: 1 }}>
        {data.subTopic.map((subTopic) => (
          <TouchableOpacity
            style={{
              width: "95%",
              height: 80,
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "gray",
              flexDirection: "row",
              marginHorizontal: 10,
              marginTop: 10,
            }}
            key={subTopic._id}
            onPress={() =>
              navigation.navigate("SongNgu_S3", { dataTruyen: subTopic })
            }
          >
            <View
              style={{
                flex: 1.2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                key={subTopic.id}
                style={{ fontWeight: "bold", fontSize: 18 }}
              >
                {subTopic.id}
              </Text>
            </View>
            <View style={{ flex: 8.8, justifyContent: "center" }}>
              <Text style={{ fontWeight: 500, fontSize: 17 }}>
                {subTopic.titleEn}
              </Text>
              <Text
                style={{
                  fontWeight: 600,
                  fontSize: 16,
                  color: "gray",
                  marginTop: 3,
                }}
              >
                {subTopic.titleVn}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </PaperProvider>
  );
};

export default SongNgu_S2;

const styles = StyleSheet.create({});
