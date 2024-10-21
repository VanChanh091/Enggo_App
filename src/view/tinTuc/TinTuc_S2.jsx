import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { FontAwesome } from "@expo/vector-icons";
import TranslateLanguage from "../../components/translate/TranslateLanguage";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";

const TinTuc_S2 = ({ route }) => {
  const { data } = route.params;

  return (
    <PaperProvider>
      <HeaderScreen title="" />

      <ScrollView style={{ backgroundColor: "white" }}>
        <View style={{ flex: 1 }}>
          {/* Title */}
          <View
            style={{
              width: "100%",
              height: 130,
              alignItems: "center",
            }}
          >
            <TranslateLanguage
              data={data.content}
              styleText={{
                fontSize: 22,
                fontWeight: 600,
                paddingVertical: 12,
                paddingHorizontal: 10,
              }}
            />
          </View>

          <View style={{ flex: 8.8 }}>
            {/* content */}
            {data.information.map((item, index) => (
              <View key={index} style={{ width: "100%", height: "auto" }}>
                <View style={{ flex: 2 }}>
                  {item.subTitle ? (
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 600,
                        paddingTop: 15,
                        paddingHorizontal: 12,
                      }}
                    >
                      {item.subTitle}
                    </Text>
                  ) : (
                    <View></View>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 4,
                    paddingVertical: 12,
                  }}
                >
                  {item.image ? (
                    <Image
                      source={{ uri: item.image }}
                      style={{
                        width: 380,
                        height: 230,
                        resizeMode: "contain",
                        borderRadius: 15,
                      }}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>

                <View
                  style={{
                    flex: 4,
                  }}
                >
                  {item.text ? (
                    <TranslateLanguage
                      data={item.text}
                      styleText={{
                        fontSize: 16,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                      }}
                    />
                  ) : (
                    <View></View>
                  )}
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    paddingTop: 12,
                  }}
                >
                  <TouchableOpacity
                    style={{ marginLeft: 15 }}
                    onPress={() => playVoiceText(item.text)}
                  >
                    <FontAwesome name="volume-up" size={35} color="black" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
        <View style={{ width: "100%", height: 35 }}></View>
      </ScrollView>
    </PaperProvider>
  );
};

export default TinTuc_S2;
