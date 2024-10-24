import {
  Image,
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
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useTranslate } from "../../../components/translate/TranslateLanguage";

const ListenAndRead = ({ route }) => {
  const { data } = route.params;

  const { translatedText, translateWithDelay } = useTranslate();

  return (
    <PaperProvider>
      <HeaderScreen title={"Nghe và đọc"} />

      <View style={{ flex: 1 }}>
        <View style={{ flex: 8.2, marginTop: 10 }}>
          <ScrollView>
            <View style={{ width: "100%", height: 135 }}>
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 19,
                  paddingHorizontal: 12,
                  paddingTop: 10,
                }}
              >
                {translatedText[`title_${data.id}`] || data.title}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  translateWithDelay(`title_${data.id}`, data.title)
                }
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  paddingVertical: 12,
                }}
              >
                <MaterialIcons name="g-translate" size={30} color="black" />
              </TouchableOpacity>
            </View>

            <View
              style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={data.image}
                style={{ width: "93%", height: "93%", borderRadius: 10 }}
              />
            </View>

            {data.content.map((item, index) => (
              <View key={index} style={{ paddingVertical: 10 }}>
                <Text
                  style={{
                    paddingHorizontal: 12,
                    fontSize: 17,
                  }}
                >
                  {translatedText[index] || item.text}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => translateWithDelay(index, item.text)}
                  >
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
