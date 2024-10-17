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
import { Audio } from "expo-av";
import HeaderScreen from "../../components/header/HeaderScreen";
import { MaterialIcons } from "@expo/vector-icons";
import TranslateLanguage from "../../components/translate/TranslateLanguage";

const TinTuc_S2 = ({ route }) => {
  const { data } = route.params;

  const [translatedText, setTranslatedText] = useState(null);
  const [isEnglishToVietnamese, setIsEnglishToVietnamese] = useState(true);

  const [soundCurrent, setSoundCurrent] = useState();

  // Play sound function
  const playSound = async () => {
    const uri =
      "https://audio-enggo.s3.ap-southeast-1.amazonaws.com/surprise.mp3";

    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        shouldDuckAndroid: false,
        staysActiveInBackground: false,
      });

      const { sound, status } = await Audio.Sound.createAsync(
        {
          uri: uri,
        },
        {
          shouldPlay: true,
          isLooping: false,
        }
      );
      console.log("sound status :", status);

      setSoundCurrent(sound);
      await sound.playAsync();
    } catch (error) {
      console.log(error);
    }
  };

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
              data={data.title}
              styleText={{
                fontSize: 22,
                fontWeight: 600,
                paddingVertical: 12,
              }}
            />
          </View>

          <View style={{ flex: 8.8 }}>
            {/* content */}
            {data.content.map((item, index) => (
              <View key={index} style={{ width: "100%", height: "auto" }}>
                <View style={{ flex: 2 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: 600,
                      paddingTop: 15,
                      paddingHorizontal: 12,
                    }}
                  >
                    {item.id}. {item.subTitle}
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 4,
                    paddingVertical: 12,
                  }}
                >
                  <Image
                    source={item.image}
                    style={{
                      // width: "94%",
                      // height: "90%",
                      width: 380,
                      height: 230,
                      resizeMode: "contain",
                      borderRadius: 15,
                    }}
                  />
                </View>

                <View style={{ flex: 4 }}>
                  <TranslateLanguage
                    data={item.text}
                    styleText={{
                      fontSize: 16,
                      paddingHorizontal: 12,
                      paddingVertical: 10,
                    }}
                  />
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

const styles = StyleSheet.create({});
