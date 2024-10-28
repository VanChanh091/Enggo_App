import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { PaperProvider } from "react-native-paper";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import HeaderScreen from "../../components/header/HeaderScreen";
import { playVoiceText } from "../../components/translate/PLayTranslateVoice";
import { useTranslate } from "../../components/translate/TranslateLanguage";
import PlayVoice from "../../components/playVoice/PlayVoice";

const DetailOfListening = ({ route }) => {
  const { data } = route.params;
  
  const allText = data.content.map((item) => item.text).join(" ");

  const { translatedText, translateWithDelay } = useTranslate();

  if (typeof allText !== "string") {
    console.log("Not a string");
  } else {
    console.log("Text a string ");
  }

  return (
    <PaperProvider>
      <HeaderScreen title="" />

      <View style={{ flex: 1 }}>
        {/* content */}
        <View style={{ flex: 8.2 }}>
          <ScrollView>
            {/* title */}
            <View
              style={{
                width: "100%",
                height: 150,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  fontWeight: 500,
                  fontSize: 19,
                  marginTop: 15,
                  paddingHorizontal: 10,
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

            {/* image */}
            <View
              style={{
                width: "100%",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                // source={data.image}
                source={{ uri: data.image }}
                style={{ width: "93%", height: "93%", borderRadius: 10 }}
              />
            </View>

            {/* content */}
            <View style={{ flex: 8, marginTop: 10 }}>
              {data.content.map((item, index) => (
                <View key={index}>
                  <Text style={{ fontSize: 16, paddingHorizontal: 10 }}>
                    {translatedText[index] || item.text}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      height: 50,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <TouchableOpacity
                      key={index}
                      onPress={() => translateWithDelay(index, item.text)}
                    >
                      <MaterialIcons
                        name="g-translate"
                        size={28}
                        color="black"
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{ marginLeft: 15 }}
                      onPress={() => playVoiceText(item.text)}
                    >
                      <FontAwesome name="volume-up" size={28} color="black" />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* play voice */}
        <View
          style={{
            flex: 1.8,
            borderTopWidth: 1,
            borderColor: "#d0d0d0",
          }}
        >
          <PlayVoice text={allText} />
        </View>
      </View>
    </PaperProvider>
  );
};

export default DetailOfListening;
