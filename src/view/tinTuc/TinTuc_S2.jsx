import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import HeaderScreen from "../../components/header/HeaderScreen";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useTranslate } from "../../components/translate/TranslateLanguage";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";

const TinTuc_S2 = ({ route }) => {
  const { data } = route.params;

  const { translatedText, translateWithDelay } = useTranslate();

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
            <Text
              style={{
                fontSize: 20,
                fontWeight: 600,
                paddingVertical: 12,
                paddingHorizontal: 12,
              }}
            >
              {translatedText[`content_${data._id}`] || data.content}
            </Text>
            <TouchableOpacity
              onPress={() =>
                translateWithDelay(`content_${data._id}`, data.content)
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
                    <View>
                      <Text
                        style={{
                          fontSize: 16,
                          paddingHorizontal: 12,
                          paddingVertical: 10,
                        }}
                      >
                        {translatedText[index] || item.text}
                      </Text>
                    </View>
                  ) : (
                    <View></View>
                  )}

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => translateWithDelay(index, item.text)}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 12,
                      }}
                    >
                      <MaterialIcons
                        name="g-translate"
                        size={30}
                        color="black"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => playVoiceText(item.text, "en")}
                      style={{ paddingHorizontal: 20 }}
                    >
                      <FontAwesome name="volume-up" size={35} color="black" />
                    </TouchableOpacity>
                  </View>
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
