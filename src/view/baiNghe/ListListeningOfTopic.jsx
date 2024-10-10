import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";

const ListListeningOfTopic = ({ navigation, route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <PaperProvider>
      <HeaderScreen title={data.title} />

      <View style={{ flex: 1 }}>
        <View
          style={{
            flex: 3,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={data.background}
            style={{ width: "92%", height: "100%", resizeMode: "contain" }}
          />
        </View>
        <View
          style={{ flex: 7, justifyContent: "center", alignItems: "center" }}
        >
          <View
            style={{
              width: "92%",
              height: "100%",
              alignItems: "flex-end",
            }}
          >
            {data.list.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: "100%",
                  height: 95,
                  borderRadius: 10,
                  marginVertical: 6,
                  flexDirection: "row",
                  backgroundColor: "#E6E6E6",
                  borderWidth: 1,
                  borderColor: "#B3B7B7",
                }}
                onPress={() =>
                  navigation.navigate("DetailOfListening", {
                    data: item,
                  })
                }
              >
                <View
                  style={{
                    flex: 7,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 15, paddingLeft: 10 }}>
                    {item.title}
                  </Text>
                </View>
                <View
                  style={{
                    flex: 3,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      width: "80%",
                      height: "80%",
                      borderRadius: 6,
                    }}
                  />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListListeningOfTopic;

const styles = StyleSheet.create({});
