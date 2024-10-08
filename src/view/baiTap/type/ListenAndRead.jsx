import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../../components/header/HeaderScreen";
import PlayVoice from "../../../components/playVoice/PlayVoice";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";

const ListenAndRead = ({ route }) => {
  const { data } = route.params;
  console.log(data);

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và đọc"} />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2, marginTop: 10 }}>
          <ScrollView>
            <View style={{ width: "100%", height: 115 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 20,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                }}
              >
                {data.title}
              </Text>

              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <TouchableOpacity style={{ paddingTop: 12 }}>
                  <MaterialIcons name="g-translate" size={30} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {data.content.map((item, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 17,
                  }}
                >
                  {item.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                  }}
                >
                  <TouchableOpacity>
                    <MaterialIcons name="g-translate" size={30} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity style={{ paddingHorizontal: 15 }}>
                    <Ionicons name="repeat-outline" color="black" size={30} />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Ionicons
                      name="volume-medium-sharp"
                      color="black"
                      size={32}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice />
        </View>
      </View>
    </PaperProvider>
  );
};

export default ListenAndRead;

const styles = StyleSheet.create({});
