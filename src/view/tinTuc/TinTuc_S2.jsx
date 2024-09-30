import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, PaperProvider } from "react-native-paper";
import { Audio } from "expo-av";

const TinTuc_S2 = ({ navigation, route }) => {
  const { data } = route.params;

  // Language toggle states
  const [isTitleEnglish, setIsTitleEnglish] = useState(true);
  const [isSubTitleEnglish, setIsSubtitleEnglish] = useState(true);
  const [isTextEnglish, setIsTextEnglish] = useState(true);

  // Toggle functions for language
  const toggleLanguageTitle = () => setIsTitleEnglish(!isTitleEnglish);
  const toggleLanguageSubTitle = () => setIsSubtitleEnglish(!isSubTitleEnglish);
  const toggleLanguageText = () => setIsTextEnglish(!isTextEnglish);

  const [soundCurrent, setSoundCurrent] = useState();

  // Play sound function
  const playSound = async () => {    
    const uri ='https://audio-enggo.s3.ap-southeast-1.amazonaws.com/surprise.mp3';

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
      <Appbar.Header style={{ backgroundColor: "#2A7BD3" }}>
        <Appbar.BackAction color="white" onPress={() => navigation.goBack()} />
      </Appbar.Header>

      <ScrollView>
        <View style={{ flex: 1 }}>
          {/* Title */}
          <View style={{ flex: 1.2, alignItems: "center" }}>
            <Text style={{ fontSize: 19, fontWeight: "500", marginTop: 13 }}>
              {isTitleEnglish
                ? data.information[0].titleEn
                : data.information[0].titleVn}
            </Text>
            <TouchableOpacity onPress={toggleLanguageTitle}>
              <Image
                source={data.information[0].iconTranslate}
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  marginTop: 12,
                }}
              />
            </TouchableOpacity>
          </View>

          <View style={{ flex: 8.8 }}>
            {/* Subtitle */}
            <View
              style={{
                flexDirection: "row",
                width: "100%",
                height: 45,
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 16, marginLeft: 15, fontWeight: "500" }}>
                1.{" "}
                {isSubTitleEnglish
                  ? data.information[0].subTitleEn_1
                  : data.information[0].subTitleVn_1}
              </Text>
              <TouchableOpacity onPress={toggleLanguageSubTitle}>
                <Image
                  source={require("../../img/imgTinTuc/translate.png")}
                  style={{
                    width: 30,
                    height: 30,
                    resizeMode: "contain",
                    marginLeft: 12,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View
              style={{ width: "100%", height: "100%", alignItems: "center" }}
            >
              <Image
                source={data.information[0].image_1}
                style={{
                  width: "95%",
                  height: 210,
                  resizeMode: "contain",
                  marginTop: 12,
                }}
              />
              <View style={{ width: "95%", height: "100%" }}>
                <Text
                  style={{ marginTop: 15, textAlign: "justify", fontSize: 16 }}
                >
                  {isTextEnglish
                    ? data.information[0].textEn
                    : data.information[0].textVn}
                </Text>
                <TouchableOpacity
                  style={{ justifyContent: "center", alignItems: "center" }}
                  onPress={toggleLanguageText}
                >
                  <Image
                    source={data.information[0].iconTranslate}
                    style={{
                      width: 30,
                      height: 30,
                      resizeMode: "contain",
                      marginTop: 12,
                    }}
                  />
                </TouchableOpacity>

                
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </PaperProvider>
  );
};

export default TinTuc_S2;

const styles = StyleSheet.create({});
